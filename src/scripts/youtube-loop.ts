declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          host?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YtPlayer }) => void;
            onStateChange?: (e: { data: number; target: YtPlayer }) => void;
          };
        }
      ) => YtPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YtPlayer {
  getCurrentTime(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  playVideo(): void;
  pauseVideo(): void;
}

const YT_PLAYING = 1;
const MIN_LOADER_MS = 1800;
const MAX_LOADER_MS = 10000;

let apiReady: Promise<void> | null = null;
const players = new Map<HTMLElement, YtPlayer>();
const loopTimers = new Map<HTMLElement, number>();
const bootTargets: HTMLElement[] = [];
let readyCount = 0;
let launched = false;
let loaderStart = 0;

function loadYouTubeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiReady) return apiReady;

  apiReady = new Promise((resolve) => {
    if (!document.querySelector('link[data-yt-prefetch]')) {
      for (const href of ['https://www.youtube-nocookie.com', 'https://www.youtube.com']) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = href;
        link.setAttribute('data-yt-prefetch', '');
        document.head.appendChild(link);
      }
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.head.appendChild(tag);
  });

  return apiReady;
}

function getLoader() {
  return document.getElementById('site-loader');
}

function setLoaderProgress(pct: number) {
  const loader = getLoader();
  if (!loader) return;
  const bar = loader.querySelector('.site-loader-bar') as HTMLElement | null;
  const track = loader.querySelector('.site-loader-track') as HTMLElement | null;
  if (bar) bar.style.width = `${Math.min(100, pct)}%`;
  if (track) track.setAttribute('aria-valuenow', String(Math.round(pct)));
}

function showLoader() {
  const loader = getLoader();
  if (!loader) return;
  document.body.classList.add('is-loading');
  loader.classList.remove('is-done');
  loader.setAttribute('aria-busy', 'true');
  setLoaderProgress(8);
}

function hideLoader() {
  const loader = getLoader();
  document.body.classList.remove('is-loading');
  document.body.classList.add('site-ready');
  if (!loader) return;
  setLoaderProgress(100);
  loader.classList.add('is-done');
  loader.setAttribute('aria-busy', 'false');
  window.setTimeout(() => loader.remove(), 700);
}

function hideCinematicPoster(el: HTMLElement) {
  const hero = el.closest('.hero--cinematic');
  if (!hero) return;
  hero.classList.add('is-video-playing');
  hero.querySelector('.hero-poster')?.classList.add('is-hidden');
}

function clearLoopTimer(el: HTMLElement) {
  const id = loopTimers.get(el);
  if (id) {
    window.clearInterval(id);
    loopTimers.delete(el);
  }
}

function startLoop(el: HTMLElement, player: YtPlayer, maxSec: number) {
  clearLoopTimer(el);
  loopTimers.set(
    el,
    window.setInterval(() => {
      try {
        if (player.getCurrentTime() >= maxSec) player.seekTo(0, true);
      } catch {
        /* ignore */
      }
    }, 500)
  );
}

function onBootReady() {
  if (launched) return;
  const total = bootTargets.length;
  const elapsed = performance.now() - loaderStart;
  const progress = total ? 12 + (readyCount / total) * 78 : 90;
  setLoaderProgress(progress);

  if (readyCount < total) return;
  if (elapsed < MIN_LOADER_MS) {
    window.setTimeout(tryLaunchAll, MIN_LOADER_MS - elapsed);
    return;
  }
  tryLaunchAll();
}

function tryLaunchAll() {
  if (launched) return;
  if (readyCount < bootTargets.length) return;
  launched = true;

  setLoaderProgress(96);

  for (const el of bootTargets) {
    const player = players.get(el);
    if (!player) continue;
    try {
      player.mute();
      player.seekTo(0, true);
      player.playVideo();
      el.classList.add('is-playing');
      const maxSec = parseInt(el.dataset.ytMax || '30', 10);
      startLoop(el, player, maxSec);
      if (el.closest('.hero--cinematic')) hideCinematicPoster(el);
    } catch {
      /* ignore */
    }
  }

  window.setTimeout(hideLoader, 280);
}

function createPlayer(el: HTMLElement) {
  const id = el.dataset.ytId;
  if (!id || el.dataset.ytReady === 'true') return;

  const maxSec = parseInt(el.dataset.ytMax || '30', 10);
  const container = el.querySelector('.yt-loop-player') as HTMLElement | null;
  if (!container) return;

  el.dataset.ytReady = 'true';

  new window.YT.Player(container, {
    host: 'https://www.youtube-nocookie.com',
    videoId: id,
    playerVars: {
      autoplay: 0,
      mute: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      start: 0,
      end: maxSec,
      fs: 0,
      disablekb: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
      enablejsapi: 1,
      origin: window.location.origin,
      playlist: id,
      loop: 1,
    },
    events: {
      onReady: ({ target }) => {
        players.set(el, target);
        target.mute();
        el.classList.add('is-ready');
        readyCount += 1;
        onBootReady();
      },
      onStateChange: ({ data, target }) => {
        if (data === YT_PLAYING) {
          const max = parseInt(el.dataset.ytMax || '30', 10);
          startLoop(el, target, max);
        }
      },
    },
  });
}

function initScrollPause() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const player = players.get(el);
        if (!player || el.closest('.hero--cinematic')) continue;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          try {
            player.mute();
            player.playVideo();
            el.classList.add('is-playing');
          } catch {
            /* ignore */
          }
        } else {
          try {
            player.pauseVideo();
          } catch {
            /* ignore */
          }
          clearLoopTimer(el);
          el.classList.remove('is-playing');
        }
      }
    },
    { rootMargin: '40px', threshold: [0, 0.15] }
  );

  bootTargets.forEach((el) => {
    if (!el.closest('.hero--cinematic')) observer.observe(el);
  });
}

export async function setupYouTubeLoops() {
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-yt-loop]')];
  if (!nodes.length) {
    hideLoader();
    return;
  }

  bootTargets.push(...nodes);
  loaderStart = performance.now();
  showLoader();
  setLoaderProgress(12);

  const failSafe = window.setTimeout(() => {
    if (!launched) {
      readyCount = bootTargets.length;
      tryLaunchAll();
    }
  }, MAX_LOADER_MS);

  try {
    await loadYouTubeAPI();
    setLoaderProgress(22);

    nodes.forEach((el) => createPlayer(el));

    initScrollPause();
  } catch {
    hideLoader();
  } finally {
    window.clearTimeout(failSafe);
  }
}

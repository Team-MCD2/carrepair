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

let apiReady: Promise<void> | null = null;
const players = new Map<HTMLElement, YtPlayer>();
const loopTimers = new Map<HTMLElement, number>();
let activeEl: HTMLElement | null = null;

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
        if (activeEl !== el) return;
        if (player.getCurrentTime() >= maxSec) player.seekTo(0, true);
      } catch {
        /* détruit */
      }
    }, 500)
  );
}

function pauseOthers(keep: HTMLElement) {
  players.forEach((player, el) => {
    if (el === keep) return;
    try {
      player.pauseVideo();
    } catch {
      /* ignore */
    }
    clearLoopTimer(el);
  });
}

function playOnly(el: HTMLElement) {
  const player = players.get(el);
  if (!player) return;
  activeEl = el;
  pauseOthers(el);
  try {
    player.mute();
    player.playVideo();
    const maxSec = parseInt(el.dataset.ytMax || '30', 10);
    startLoop(el, player, maxSec);
  } catch {
    /* ignore */
  }
}

function createPlayer(el: HTMLElement, delayMs = 0) {
  const id = el.dataset.ytId;
  if (!id || el.dataset.ytReady === 'true') return;

  const maxSec = parseInt(el.dataset.ytMax || '30', 10);
  const container = el.querySelector('.yt-loop-player') as HTMLElement | null;
  if (!container) return;

  el.dataset.ytReady = 'true';
  const isCinematic = Boolean(el.closest('.hero--cinematic'));

  const init = () => {
    const player = new window.YT.Player(container, {
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
      },
      events: {
        onReady: ({ target }) => {
          players.set(el, target);
          target.mute();
          el.classList.add('is-ready');
          if (isCinematic) {
            window.setTimeout(() => {
              playOnly(el);
              el.classList.add('is-playing');
              hideCinematicPoster(el);
            }, 80);
          } else if (activeEl === el || !activeEl) {
            playOnly(el);
            el.classList.add('is-playing');
          }
        },
        onStateChange: ({ data, target }) => {
          if (data === YT_PLAYING && activeEl === el) startLoop(el, target, maxSec);
        },
      },
    });
    void player;
  };

  if (delayMs > 0) window.setTimeout(init, delayMs);
  else init();
}

export async function setupYouTubeLoops() {
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-yt-loop]')];
  if (!nodes.length) return;

  await loadYouTubeAPI();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const isCinematic = Boolean(el.closest('.hero--cinematic'));

        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          if (el.dataset.ytReady !== 'true') {
            createPlayer(el, isCinematic ? 2200 : 0);
          } else {
            playOnly(el);
            el.classList.add('is-playing');
          }
        } else if (el.dataset.ytReady === 'true' && !isCinematic) {
          if (activeEl === el) activeEl = null;
          try {
            players.get(el)?.pauseVideo();
          } catch {
            /* ignore */
          }
          clearLoopTimer(el);
          el.classList.remove('is-playing');
        }
      }
    },
    { rootMargin: '0px', threshold: [0, 0.2, 0.5] }
  );

  const cinematic = nodes.find((el) => el.closest('.hero--cinematic'));
  if (cinematic) {
    createPlayer(cinematic, 2200);
    observer.observe(cinematic);
  }

  for (const el of nodes) {
    if (el === cinematic) continue;
    observer.observe(el);
  }
}

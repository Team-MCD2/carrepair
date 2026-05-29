declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: { onReady?: (e: { target: YtPlayer }) => void };
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

let apiReady: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiReady) return apiReady;

  apiReady = new Promise((resolve) => {
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

function hidePoster(el: HTMLElement) {
  el.querySelector('.yt-loop-poster')?.classList.add('is-hidden');
  const hero = el.closest('.hero--cinematic');
  if (hero) {
    hero.classList.add('is-video-playing');
    hero.querySelector('.hero-poster')?.classList.add('is-hidden');
  }
}

function startLoop(player: YtPlayer, maxSec: number) {
  window.setInterval(() => {
    try {
      if (player.getCurrentTime() >= maxSec) player.seekTo(0, true);
    } catch {
      /* player d�truit */
    }
  }, 400);
}

function createPlayer(el: HTMLElement, delayMs = 0) {
  const id = el.dataset.ytId;
  if (!id || el.dataset.ytReady === 'true') return;

  const maxSec = parseInt(el.dataset.ytMax || '30', 10);
  const container = el.querySelector('.yt-loop-player') as HTMLElement | null;
  if (!container) return;

  el.dataset.ytReady = 'true';

  const init = () => {
    new window.YT.Player(container, {
      videoId: id,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        start: 0,
        fs: 0,
        disablekb: 1,
        iv_load_policy: 3,
        origin: window.location.origin,
      },
      events: {
        onReady: ({ target }) => {
          target.mute();
          target.playVideo();
          el.classList.add('is-playing');
          if (el.classList.contains('hero-yt') || el.closest('.hero--cinematic')) {
            window.setTimeout(() => hidePoster(el), delayMs > 0 ? 0 : 100);
          }
          startLoop(target, maxSec);
        },
      },
    });
  };

  if (delayMs > 0) {
    window.setTimeout(init, delayMs);
  } else {
    init();
  }
}

export async function setupYouTubeLoops() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-yt-loop]');
  if (!nodes.length) return;

  await loadYouTubeAPI();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting) return;

        const isHero = Boolean(el.closest('.hero--cinematic'));
        createPlayer(el, isHero ? 2200 : 0);
        observer.unobserve(el);
      });
    },
    { rootMargin: '60px', threshold: 0.1 }
  );

  nodes.forEach((node) => observer.observe(node));
}

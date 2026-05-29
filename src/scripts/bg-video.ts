function hideCinematicPoster(video: HTMLVideoElement) {
  const hero = video.closest('.hero--cinematic');
  if (!hero) return;
  hero.classList.add('is-video-playing');
  hero.querySelector('.hero-poster')?.classList.add('is-hidden');
}

function playVideo(video: HTMLVideoElement) {
  if (video.dataset.playing === 'true') return;
  video.muted = true;
  video.dataset.playing = 'true';
  void video.play().catch(() => {});
  video.classList.add('is-playing');
  if (video.closest('.hero--cinematic')) hideCinematicPoster(video);
}

function pauseVideo(video: HTMLVideoElement) {
  if (video.closest('.hero--cinematic')) return;
  video.pause();
  video.dataset.playing = '';
  video.classList.remove('is-playing');
}

function initHeroVideo(video: HTMLVideoElement) {
  video.muted = true;
  const start = () => playVideo(video);

  if (video.readyState >= 2) {
    window.setTimeout(start, 400);
  } else {
    video.addEventListener('canplay', start, { once: true });
    video.addEventListener('error', () => hideCinematicPoster(video), { once: true });
  }
}

function initLazyVideos() {
  const lazy = document.querySelectorAll<HTMLVideoElement>(
    '[data-bg-video]:not(.hero-video)'
  );
  if (!lazy.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'metadata';
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      }
    },
    { rootMargin: '80px', threshold: 0.15 }
  );

  lazy.forEach((v) => {
    v.muted = true;
    observer.observe(v);
  });
}

export function setupBackgroundVideos() {
  const hero = document.querySelector<HTMLVideoElement>('.hero--cinematic [data-bg-video]');
  if (hero) initHeroVideo(hero);
  initLazyVideos();
}

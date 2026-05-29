const LOADER_MS = 1100;

function getLoader() {
  return document.getElementById('site-loader');
}

function finishLoading() {
  const loader = getLoader();
  document.body.classList.remove('is-loading');
  document.body.classList.add('site-ready', 'hero-ready');
  if (!loader) return;
  loader.classList.add('is-done');
  window.setTimeout(() => loader.remove(), 500);
}

function showHeroVideo() {
  const hero = document.querySelector('.hero--cinematic');
  if (hero) {
    hero.classList.add('is-video-playing');
    hero.querySelector('.hero-poster')?.classList.add('is-hidden');
  }
}

function playVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.playsInline = true;
  void video.play().catch(() => {});
  video.classList.add('is-playing');
}

function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  video.classList.remove('is-playing');
}

function startVideos(videos: HTMLVideoElement[]) {
  for (const video of videos) {
    playVideo(video);
    if (video.closest('.hero--cinematic')) showHeroVideo();
  }
}

function initScrollVideos(videos: HTMLVideoElement[]) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          playVideo(video);
          if (video.closest('.hero--cinematic')) showHeroVideo();
        } else if (!video.closest('.hero--cinematic')) {
          pauseVideo(video);
        }
      }
    },
    { rootMargin: '80px', threshold: [0, 0.15] }
  );

  videos.forEach((v) => observer.observe(v));
}

export function setupBackgroundVideos() {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('[data-bg-video]')];
  if (!videos.length) {
    getLoader()?.remove();
    document.body.classList.add('site-ready', 'hero-ready');
    return;
  }

  document.body.classList.add('is-loading');

  videos.forEach((v) => {
    v.muted = true;
    v.preload = 'auto';
    v.addEventListener('error', () => v.classList.add('is-error'), { once: true });
  });

  window.setTimeout(() => {
    finishLoading();
    startVideos(videos);
    initScrollVideos(videos);
  }, LOADER_MS);
}

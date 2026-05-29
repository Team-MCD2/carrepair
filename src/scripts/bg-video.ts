const MIN_LOADER_MS = 1400;
const MAX_LOADER_MS = 12000;

let loaderStart = 0;
let readyCount = 0;
let launched = false;
const bootVideos: HTMLVideoElement[] = [];

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
  setLoaderProgress(10);
}

function hideLoader() {
  const loader = getLoader();
  document.body.classList.remove('is-loading');
  document.body.classList.add('site-ready');
  if (!loader) return;
  setLoaderProgress(100);
  loader.classList.add('is-done');
  window.setTimeout(() => loader.remove(), 650);
}

function hideCinematicPoster() {
  const hero = document.querySelector('.hero--cinematic');
  if (!hero) return;
  hero.classList.add('is-video-playing');
  hero.querySelector('.hero-poster')?.classList.add('is-hidden');
}

function onVideoReady() {
  if (launched) return;
  const total = bootVideos.length;
  const elapsed = performance.now() - loaderStart;
  setLoaderProgress(total ? 15 + (readyCount / total) * 75 : 90);

  if (readyCount < total) return;
  if (elapsed < MIN_LOADER_MS) {
    window.setTimeout(tryLaunchAll, MIN_LOADER_MS - elapsed);
    return;
  }
  tryLaunchAll();
}

function tryLaunchAll() {
  if (launched) return;
  if (readyCount < bootVideos.length) return;
  launched = true;
  setLoaderProgress(98);

  for (const video of bootVideos) {
    video.muted = true;
    video.currentTime = 0;
    void video.play().catch(() => {});
    video.closest('.hero--cinematic')?.classList.add('is-video-playing');
    video.classList.add('is-playing');
  }

  hideCinematicPoster();
  window.setTimeout(hideLoader, 200);
}

function markReady(video: HTMLVideoElement) {
  if (video.dataset.bootReady === 'true') return;
  video.dataset.bootReady = 'true';
  readyCount += 1;
  onVideoReady();
}

function prepareBootVideo(video: HTMLVideoElement) {
  bootVideos.push(video);
  video.muted = true;

  const onReady = () => markReady(video);

  if (video.readyState >= 2) onReady();
  else {
    video.addEventListener('loadeddata', onReady, { once: true });
    video.addEventListener('canplay', onReady, { once: true });
  }

  if (video.preload === 'none') video.load();
}

function playVideo(video: HTMLVideoElement) {
  video.muted = true;
  void video.play().catch(() => {});
  video.classList.add('is-playing');
}

function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  video.classList.remove('is-playing');
}

function initScrollVideos() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (bootVideos.includes(video) && !launched) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) playVideo(video);
        else if (!video.closest('.hero--cinematic')) pauseVideo(video);
      }
    },
    { rootMargin: '40px', threshold: [0, 0.2] }
  );

  document.querySelectorAll<HTMLVideoElement>('[data-bg-video]').forEach((v) => observer.observe(v));
}

export function setupBackgroundVideos() {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('[data-bg-video]')];
  if (!videos.length) {
    getLoader()?.remove();
    return;
  }

  loaderStart = performance.now();
  showLoader();

  const failSafe = window.setTimeout(() => {
    if (!launched) {
      readyCount = bootVideos.length;
      tryLaunchAll();
    }
  }, MAX_LOADER_MS);

  videos.forEach(prepareBootVideo);

  window.setTimeout(() => {
    window.clearTimeout(failSafe);
    initScrollVideos();
  }, 100);
}

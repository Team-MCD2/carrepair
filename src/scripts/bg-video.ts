function showHeroVideo() {
  const hero = document.querySelector('.hero--cinematic');
  if (hero) {
    hero.classList.add('is-video-playing');
    hero.querySelector('.hero-poster')?.classList.add('is-hidden');
  }
}

function isHeroVideo(video: HTMLVideoElement): boolean {
  return Boolean(
    video.classList.contains('hero-video') ||
      video.closest('.hero--cinematic, .subpage-hero--video')
  );
}

function loadVideoSource(video: HTMLVideoElement): void {
  const source = video.querySelector<HTMLSourceElement>('source[data-src]');
  if (!source) return;
  const url = source.dataset.src;
  if (!url || source.getAttribute('src')) return;
  source.src = url;
  video.load();
}

function playVideo(video: HTMLVideoElement) {
  loadVideoSource(video);
  video.muted = true;
  video.playsInline = true;
  void video.play().catch(() => {});
  video.classList.add('is-playing');
  if (video.closest('.hero--cinematic')) showHeroVideo();
}

function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  video.classList.remove('is-playing');
}

function initScrollVideos(videos: HTMLVideoElement[]) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          playVideo(video);
        } else if (!video.closest('.hero--cinematic')) {
          pauseVideo(video);
        }
      }
    },
    { rootMargin: '120px 0px', threshold: [0, 0.12] }
  );

  for (const video of videos) {
    observer.observe(video);
  }
}

export function setupBackgroundVideos() {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('[data-bg-video]')];
  if (!videos.length) return;

  for (const video of videos) {
    video.muted = true;
    video.addEventListener('error', () => video.classList.add('is-error'), { once: true });
  }

  videos.filter(isHeroVideo).forEach(playVideo);
  initScrollVideos(videos);
}

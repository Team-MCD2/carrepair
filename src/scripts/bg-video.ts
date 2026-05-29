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

let activeScrollVideo: HTMLVideoElement | null = null;

function playVideo(video: HTMLVideoElement) {
  const isHero = isHeroVideo(video);

  if (!isHero && activeScrollVideo && activeScrollVideo !== video) {
    pauseVideo(activeScrollVideo);
  }

  loadVideoSource(video);
  video.muted = true;
  video.playsInline = true;
  void video.play().catch(() => {});
  video.classList.add('is-playing');

  if (isHero) {
    showHeroVideo();
  } else {
    activeScrollVideo = video;
  }
}

function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  video.classList.remove('is-playing');
  if (activeScrollVideo === video) activeScrollVideo = null;
}

function initScrollVideos(videos: HTMLVideoElement[]) {
  const scrollVideos = videos.filter((v) => !isHeroVideo(v));
  if (!scrollVideos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      }
    },
    { rootMargin: '0px', threshold: [0, 0.35] }
  );

  for (const video of scrollVideos) {
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

  const heroVideos = videos.filter(isHeroVideo);
  if (heroVideos.length) {
    requestAnimationFrame(() => heroVideos.forEach(playVideo));
  }

  initScrollVideos(videos);
}

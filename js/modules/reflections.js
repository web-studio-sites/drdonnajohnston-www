// Client reflections slider on the service pages. The track is a native
// scroll-snap row, so it swipes on phones and works without this script;
// this adds the arrows, the dots and keyboard-free paging.
export function initReflections() {
  document.querySelectorAll('[data-reflections]').forEach((root) => {
    const track = root.querySelector('[data-reflections-track]');
    const prev = root.querySelector('[data-reflections-prev]');
    const next = root.querySelector('[data-reflections-next]');
    const dots = root.querySelector('[data-reflections-dots]');
    if (!track) return;

    const slides = Array.from(track.children);
    const perView = () => {
      const first = slides[0];
      if (!first) return 1;
      return Math.max(1, Math.round(track.clientWidth / first.getBoundingClientRect().width));
    };
    const pages = () => Math.max(1, Math.ceil(slides.length / perView()));
    const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
    const page = () => Math.round(track.scrollLeft / (step() * perView()));

    const drawDots = () => {
      if (!dots) return;
      dots.innerHTML = '';
      for (let i = 0; i < pages(); i += 1) dots.appendChild(document.createElement('span'));
    };

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      if (dots) Array.from(dots.children).forEach((d, i) => d.classList.toggle('is-active', i === page()));
    };

    const go = (dir) => track.scrollBy({ left: dir * step() * perView(), behavior: 'smooth' });
    if (prev) prev.addEventListener('click', () => go(-1));
    if (next) next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', () => { drawDots(); update(); });

    drawDots();
    update();
  });
}

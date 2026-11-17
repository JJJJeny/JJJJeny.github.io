(() => {
  const navigation = document.querySelector('[data-section-nav]');
  if (!navigation) return;
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const targets = links.map(link => document.getElementById(link.hash.slice(1)));
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const offset = (document.querySelector('.site-header')?.getBoundingClientRect().height || 72) + 32;
    let current = -1;
    targets.forEach((target, i) => {
      if (target && target.getBoundingClientRect().top <= offset) current = i;
    });
    links.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  update();
})();

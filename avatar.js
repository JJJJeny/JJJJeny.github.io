(() => {
  const stage = document.querySelector('.avatar-stage');
  const status = document.querySelector('.avatar-status');
  if (!stage || !status) return;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !preference.matches;
  let greetingTimer;
  let frame;

  const setMotion = (value) => {
    enabled = value;
    stage.classList.toggle('motion-enabled', enabled);
    stage.classList.toggle('motion-paused', !enabled);
    stage.style.removeProperty('--gaze-x');
    stage.style.removeProperty('--gaze-y');
  };

  setMotion(enabled);
  preference.addEventListener('change', (event) => setMotion(!event.matches));

  window.addEventListener('pointermove', (event) => {
    if (!enabled || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = stage.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const x = Math.max(-3, Math.min(3, (event.clientX - bounds.left - bounds.width / 2) / 110));
      const y = Math.max(-2, Math.min(2, (event.clientY - bounds.top - bounds.height * .44) / 130));
      stage.style.setProperty('--gaze-x', `${x}px`);
      stage.style.setProperty('--gaze-y', `${y}px`);
    });
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', () => {
    stage.style.removeProperty('--gaze-x');
    stage.style.removeProperty('--gaze-y');
  });

  stage.addEventListener('click', () => {
    clearTimeout(greetingTimer);
    stage.classList.remove('is-waving');
    void stage.offsetWidth;
    stage.classList.add('is-waving');
    status.textContent = 'Hi! Thanks for stopping by.';
    greetingTimer = setTimeout(() => {
      stage.classList.remove('is-waving');
      status.textContent = '';
    }, 1800);
  });
})();

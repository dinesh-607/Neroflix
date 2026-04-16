  // ── Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Active nav link
  const navLinks = document.querySelectorAll('#mainNav .nav-link:not(.dropdown-toggle)');
  const sections = ['home','movies','upcoming','tamil','malayalam','english'];
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop, bottom = top + el.offsetHeight;
      const link = document.querySelector(`#mainNav .nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active-nav', scrollY >= top && scrollY < bottom);
    });
  });

  // ── Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealObserver.observe(r));

  // ── Password toggle
  function togglePassword(id, btn) {
    const input = document.getElementById(id);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.innerHTML = isText
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  }

  // ── Password strength
  document.getElementById('signupPassword').addEventListener('input', function() {
    const val = this.value;
    const bar = document.getElementById('passBar');
    const label = document.getElementById('passLabel');
    const wrap = document.getElementById('passStrength');
    if (val.length === 0) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const levels = [
      { w: '25%', bg: '#e50914', text: 'Weak' },
      { w: '50%', bg: '#ff9800', text: 'Fair' },
      { w: '75%', bg: '#f5c518', text: 'Good' },
      { w: '100%', bg: '#4caf50', text: 'Strong' },
    ];
    const lvl = levels[score - 1] || levels[0];
    bar.style.width = lvl.w;
    bar.style.background = lvl.bg;
    label.textContent = lvl.text;
    label.style.color = lvl.bg;
  });

  // ── Toast helper
  function showToast(title, message) {
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    const t = new bootstrap.Toast(document.getElementById('mainToast'), { delay: 4000 });
    t.show();
  }

  // ── Switch modal
  function switchModal(hideId, showId) {
    const hide = bootstrap.Modal.getInstance(document.getElementById(hideId));
    if (hide) hide.hide();
    setTimeout(() => { new bootstrap.Modal(document.getElementById(showId)).show(); }, 350);
  }

  // ── Login form
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('was-validated');
    if (!this.checkValidity()) return;
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
    this.classList.remove('was-validated');
    this.reset();
    showToast('Welcome back!', 'You have successfully signed in to Neroflix.');
  });

  // ── Signup form
  document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('was-validated');
    if (!this.checkValidity()) return;
    const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    if (modal) modal.hide();
    this.classList.remove('was-validated');
    this.reset();
    document.getElementById('passStrength').style.display = 'none';
    showToast('Account Created!', 'Welcome to Neroflix! Your 30-day free trial has started.');
  });

  // ── Movie card click (demo)
  document.querySelectorAll('.movie-card-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showToast('Neroflix', 'Sign in to start watching this title.');
      setTimeout(() => { new bootstrap.Modal(document.getElementById('loginModal')).show(); }, 800);
    });
  });

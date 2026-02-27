const root = document.documentElement;
const storageKey = 'site-theme';
const themeButtons = document.querySelectorAll('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const getStoredTheme = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
};

const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    // Ignore storage failures in restricted environments.
  }
};

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  themeButtons.forEach((button) => {
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    button.classList.toggle('is-dark', theme === 'dark');
  });
};

const initialTheme = getStoredTheme() || (prefersDark.matches ? 'dark' : 'light');
applyTheme(initialTheme);

const navLinks = document.querySelectorAll('.topbar__nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const actions = link.closest('.topbar__actions');
    const navToggleCheckbox = actions?.querySelector('.nav-toggle-checkbox');

    if (navToggleCheckbox instanceof HTMLInputElement) {
      navToggleCheckbox.checked = false;
    }
  });
});

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setStoredTheme(next);
  });
});

const filterButtons = document.querySelectorAll('.tag');
const projectCards = document.querySelectorAll('.project');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { filter } = button.dataset;

      filterButtons.forEach((item) => item.classList.remove('tag--active'));
      button.classList.add('tag--active');

      projectCards.forEach((project) => {
        const projectCategory = project.dataset.category;
        const shouldShow = filter === 'all' || filter === projectCategory;
        project.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  revealElements.forEach((element) => observer.observe(element));
}

const statValues = document.querySelectorAll('.stats-grid h3');

const animateCounter = (element) => {
  const raw = element.textContent || '';
  const target = Number.parseInt(raw, 10);

  if (Number.isNaN(target)) {
    return;
  }

  const suffix = raw.replace(String(target), '');
  const duration = 900;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if (statValues.length) {
  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  statValues.forEach((value) => statsObserver.observe(value));
}
// Interactive behavior scoped to the resume page: skill tabs, experience accordion, copy email, print.

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-panel');

skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const { skill } = tab.dataset;

    skillTabs.forEach((item) => item.classList.remove('skill-tab--active'));
    tab.classList.add('skill-tab--active');

    skillPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.skill === skill);
    });
  });
});

const expToggles = document.querySelectorAll('.exp-toggle');

expToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const item = toggle.closest('.exp-item');
    const details = item?.querySelector('.exp-details');

    if (!details) {
      return;
    }

    const isOpen = item.classList.toggle('is-open');
    details.hidden = !isOpen;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.exp-toggle-label').textContent = isOpen ? 'Hide Details' : 'View Details';
  });
});

const copyButtons = document.querySelectorAll('.copy-email-btn');

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const email = button.dataset.email;
    const feedback = button.parentElement?.querySelector('.copy-feedback');

    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      return;
    }

    if (feedback) {
      feedback.textContent = 'Copied!';
      feedback.classList.add('is-visible');
      setTimeout(() => feedback.classList.remove('is-visible'), 1800);
    }
  });
});

const printButtons = document.querySelectorAll('.print-resume-btn');

printButtons.forEach((button) => {
  button.addEventListener('click', () => window.print());
});

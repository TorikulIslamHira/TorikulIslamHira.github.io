const filterButtons = document.querySelectorAll('.tag');
const projectCards = document.querySelectorAll('.project');

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
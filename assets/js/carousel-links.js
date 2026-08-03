document.addEventListener('DOMContentLoaded', () => {
  const carouselItems = document.querySelectorAll('#carousel-1 .carousel-item[data-slide-link]');
  carouselItems.forEach((item) => {
    const href = item.dataset.slideLink;
    if (!href) {
      return;
    }

    item.style.cursor = 'pointer';

    item.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        return;
      }
      window.location.href = href;
    });
  });
});
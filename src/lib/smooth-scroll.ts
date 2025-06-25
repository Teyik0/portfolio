// Improved smooth scrolling utility
export const smoothScrollTo = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (!element) {
    return;
  }

  const headerOffset = 100;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Using the modern ScrollToOptions with behavior: 'smooth'
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

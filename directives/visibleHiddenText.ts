const fooHover = (evt: MouseEvent) => {
  const target = evt.target as HTMLElement;

  target.style.transition = `${(target.scrollWidth - target.clientWidth) / 100}s linear`;

  target.style.setProperty('--w', '0');
  target.style.setProperty('--w', -(target.scrollWidth - target.clientWidth) + 'px');
};

const fooHoverReset = (evt: MouseEvent) => {
  const target = evt.target as HTMLElement;
  target.style.transition = '0s linear';
  target.style.setProperty('--w', '0');
};

export default {
  mounted(el: HTMLElement) {
    el.addEventListener('mouseenter', fooHover);
    el.addEventListener('mouseleave', fooHoverReset);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mouseenter', fooHover);
    el.removeEventListener('mouseleave', fooHoverReset);
  },
};

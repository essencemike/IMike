export function scrollTop(el: HTMLElement | Window, from: number = 0, to: number, duration: number = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }

  const difference = Math.abs(from - to);
  const steps = Math.ceil(difference / duration * 50);

  function scroll(start: number, end: number, step: number) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      (el as HTMLElement).scrollTop = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, steps);
}

export function assert(condition: any, msg: string) {
  if (!condition) throw new Error(`[Api] ${msg}`);
}

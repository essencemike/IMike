/**
 * Modify from https://github.com/ElemeFE/element/blob/dev/src/directives/mousewheel.js
 * use typescript
 */
import normalizeWheel from 'normalize-wheel';
import { VNodeDirective } from 'vue';

const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

const mousewheel = function(element: HTMLElement, callback: (...args: any[]) => void) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function(event) {
      const normalized = normalizeWheel(event);
      if (callback) {
        // 跟 src/utils/dom.ts 中的 once 写法同理
        callback.apply(element, [event, normalized]);
      }
    });
  }
};

export default {
  bind(el: HTMLElement, binding: VNodeDirective) {
    mousewheel(el, binding.value);
  },
};

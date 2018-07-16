import hljs from 'highlight.js';
import { VNodeDirective } from 'vue';

export default {
  bind(el: HTMLElement, binding: VNodeDirective) {
    const targets = el.querySelectorAll('code');
    Array.from(targets).forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },

  componentUpdated(el: HTMLElement, binding: VNodeDirective) {
    const targets = el.querySelectorAll('code');
    Array.from(targets).forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  },
};

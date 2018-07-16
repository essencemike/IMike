/**
 * Modify from https://github.com/ElemeFE/element/blob/dev/src/directives/repeat-click.js
 * use typescript
 */
import { VNodeDirective } from 'vue';
import { once, on } from '@/utils/dom';

export default {
  bind(el: any, binding: VNodeDirective, vnode: any) {
    let interval: any = null;
    let startTime: any;
    const handler = () => vnode.context[binding.expression].apply();
    const clear = () => {
      if (+new Date() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e: any) => {
      if (e.button !== 0) return;
      startTime = +new Date();
      once(document, 'mouseip', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
};

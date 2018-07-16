/**
 * Modify from https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js
 * use typescript
 */
import Vue, { VNodeDirective, VNode } from 'vue';
import { on } from '@/utils/dom';

const nodeList: any[] = [];
const ctx = '@@clickoutsideContext';

let startClick: any;
let seed: number = 0;

if (!Vue.prototype.$isServer) {
  on(document, 'mousedown', (e: Event) => (startClick = e));
}

if (!Vue.prototype.$isServer) {
  on(document, 'mouseup', (e: Event) => nodeList.forEach((node) => node[ctx].documentHandler(e, startClick)));
}

function createDocumentHandler(el: any, binding: VNodeDirective, vnode: any) {
  return function(mouseup: any = {}, mousedown: any = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
      (vnode.context.popperElm.contains(mouseup.target) ||
      vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else if (el[ctx].bindingFn) {
      el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el: any, binding: VNodeDirective, vnode: VNode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    };
  },

  update(el: any, binding: VNodeDirective, vnode: VNode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el: any) {
    for (let i = 0, len = nodeList.length; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }

    delete el[ctx];
  },
};

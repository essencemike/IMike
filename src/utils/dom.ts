/**
 * Modify from https://github.com/ElemeFE/element/blob/dev/src/utils/dom.js
 * edit use typescript
 */
import Vue from 'vue';
import { hasOwn } from './util';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const trim = (str: string) => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

const camelCase = (name: string) => {
  return name.replace(SPECIAL_CHARS_REGEXP, (_: string, separator: string, letter: string, offset: number) => {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: HTMLElement | Document | Window, event: string, handler: (e: Event) => void) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }

  return function(element: HTMLElement | Document | Window, event: string, handler: (e: Event) => void) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element: HTMLElement | Document | Window, event: string, handler: (e: Event) => void) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }

  return function(element: HTMLElement | Document | Window, event: string, handler: (e: Event) => void) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();

export const once = function(el: HTMLElement | Document | Window, event: string, fn: (e: Event) => void) {
  const listener = function() {
    if (fn) {
      /**
       * 本来的写法
       * fn.apply(this, arguments)
       * 然 ts 报错 显示 this 没有类型推导，经测试 this 指向 el
       * 所以修改为如下， 如有好的方案，请告知
       */
      fn.apply(el, arguments);
    }
    off(el, event, listener);
  };

  on(el, event, listener);
};

export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return false;
  if (cls.includes(' ')) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }

  return `' '${el.className}' '`.includes(`' '${cls}' '`);
}

export function addClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return;
  let curClass = el.className;
  const classes = cls.split(' ');

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += `' '${clsName}`;
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = `' '${el.className}' '`;

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(`' '${clsName}' '`, ' ');
    }
  }

  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const getStyle = ieVersion < 9 ? function(element: HTMLElement, styleName: any) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);

  if (styleName === 'float') {
    styleName = 'styleFloat';
  }

  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element: HTMLElement, styleName: any) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }

  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

export function setStyle(element: HTMLElement, styleName: any, value: any) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (hasOwn(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : `alpha(opacity=${value * 100})`;
    } else {
      element.style[styleName] = value;
    }
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {}

export function hasOwn(obj: any, key: any) {
  return hasOwnProperty.call(obj, key);
}

function extend(to: any, from: any) {
  for (const key in from) {
    if (hasOwn(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}

export function toObject(arr: any[]) {
  const res = {};

  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}

export function getValueByPath(object: any, prop: string) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, len = paths.length; i < len; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === len - 1) {
      result = current[path];
      break;
    }

    current = current[path];
  }

  return result;
}

import { computed } from '../vendor/vue.esm-browser.js';

export function useModelProxy(props, { emit }, propName = 'modelValue') {
  return computed({
    get() {
      return props[propName];
    },

    set(newValue) {
      emit(`update:${propName}`, newValue);
    },
  });
}

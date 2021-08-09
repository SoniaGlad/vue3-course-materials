let handler;

export const selectOnFocus = {
  // created

  beforeMount(el, { instance, value, oldValue, arg, modifiers, dir }, vnode, prevVnode) {
    if (value !== undefined && !Array.isArray(value)) {
      throw new TypeError('Directive value must be an Array if any');
    }

    const [start, end] = value ?? [0, -1];

    handler = ($event) => {
      $event.currentTarget.setSelectionRange(start, end);
    };

    el.addEventListener('focus', handler);
  },

  // mounted

  // beforeUpdate

  // updated

  unmounted(el) {
    el.removeEventListener('focus', handler);
  },
};

import { defineComponent } from './vendor/vue.esm-browser.js';
import { useModelProxy } from './composables/useModelProxy.js';

export default defineComponent({
  name: 'UiInput',

  props: ['modelValue'],

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    return {
      modelValueProxy: useModelProxy(props, { emit }, 'modelValue'),
    };
  },

  template: `<input v-model="modelValueProxy" />`,
});

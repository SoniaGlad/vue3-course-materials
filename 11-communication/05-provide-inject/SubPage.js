import { defineComponent } from './vendor/vue.esm-browser.js';
import TheToaster from './TheToaster.js';

export default defineComponent({
  name: 'SubPage',

  components: { TheToaster },

  // inject: ['toaster', 'config'],
  inject: {
    config: {
      from: 'config',
      default: () => ({
        API_URL: '/api',
      }),
    },

    toaster: {
      from: 'toaster',
      default: () => ({
        toast: (message) => alert(message),
      }),
    },
  },

  methods: {
    localToast() {
      this.$refs['localToaster'].toast('Toast');
    },

    injectToast() {
      this.toaster.toast('Toast');
    },
  },

  template: `
    <div class="sub-page">
      <the-toaster ref="localToaster" />
      <button @click="localToast">Local Toast</button>
      <button @click="injectToast">Inject Toast</button>
    </div>`,
});

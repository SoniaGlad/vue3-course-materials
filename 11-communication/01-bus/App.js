import IndexPage from './IndexPage.js';
import TheToaster from './TheToaster.js';
import { defineComponent } from './vendor/vue.esm-browser.js';
import { EventBus } from './EventBus.js';

export default defineComponent({
  name: 'App',

  components: {
    IndexPage,
    TheToaster,
  },

  mounted() {
    EventBus.on('toaster:toast', (message) => {
      this.$refs['toaster'].toast(message);
    });
  },

  template: `
    <div class="container">
      <index-page />
    </div>
    <the-toaster ref="toaster" />
  `,
});

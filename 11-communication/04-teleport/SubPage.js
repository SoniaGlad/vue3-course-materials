import { defineComponent } from './vendor/vue.esm-browser.js';
import TheToaster from './TheToaster.js';

export default defineComponent({
  name: 'SubPage',

  components: { TheToaster },

  methods: {
    localToast() {
      this.$refs['localToaster'].toast('Toast');
    },

    teleportToast() {
      this.$refs['teleportToaster'].toast('Toast');
    },
  },

  template: `
    <div class="sub-page">
      <the-toaster ref="localToaster" />
      <teleport to="#toaster">
        <the-toaster ref="teleportToaster" />
      </teleport>
      <button @click="localToast">Local Toast</button>
      <button @click="teleportToast">Teleport Toast</button>
    </div>`,
});

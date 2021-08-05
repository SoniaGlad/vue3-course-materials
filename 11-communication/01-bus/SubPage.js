import { defineComponent } from './vendor/vue.esm-browser.js';
import TheToaster from './TheToaster.js';
import { EventBus } from './EventBus.js';

export default defineComponent({
  name: 'SubPage',

  components: { TheToaster },

  methods: {
    localToast() {
      this.$refs['localToaster'].toast('Toast');
    },

    busToast() {
      EventBus.emit('toaster:toast', 'Toast');
    },
  },

  template: `
    <div style="position: relative;
        border: 1px solid;
        background: #efefef;
        padding: 15px;
        width: 500px;
        height: 500px;"
    >
      <the-toaster ref="localToaster" />
      <button @click="localToast">Local Toast</button>
      <button @click="busToast">Event Bus Toast</button>
    </div>`,
});

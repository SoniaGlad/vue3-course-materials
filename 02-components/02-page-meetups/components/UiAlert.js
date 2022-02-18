import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiAlert',

  props: {
    text: {
      type: String,
    },
  },

  template: `
    <div class='alert'>
    <!--  Внутри слота дефолтное значение, если мы в него ничего не передали  -->
    <!-- <slot>{{ text }}</slot> -->
    <slot>Alert!</slot>
    <slot>Alert!</slot>
    <slot>Alert!</slot>
    </div>
  `,
});

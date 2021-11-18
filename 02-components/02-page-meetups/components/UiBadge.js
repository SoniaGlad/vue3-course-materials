import { defineComponent } from '../vendor/vue.esm-browser.js';

const badgeClasses = {
  primary: 'badge_primary',
  success: 'badge_success',
};

export default defineComponent({
  name: 'UiBadge',

  props: {
    type: {
      type: String,
      required: false,
      validator: (value) => Object.keys(badgeClasses).includes(value),
    },
  },

  computed: {
    badgeClass() {
      return badgeClasses[this.type];
    },
  },

  template: `
    <span class="badge" :class="badgeClass"><slot /></span>
  `,
});

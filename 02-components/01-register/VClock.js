import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'VClock',

  data() {
    return {
      time: '',
      intervalId: null,
    };
  },

  created() {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  methods: {
    updateTime() {
      this.time = new Date().toLocaleTimeString();
    },
  },

  template: `<div>{{ time }}</div>`,
});

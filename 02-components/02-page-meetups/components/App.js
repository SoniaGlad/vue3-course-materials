import { defineComponent } from '../vendor/vue.esm-browser.js';
import PageMeetups from './PageMeetups.js';

export default defineComponent({
  name: 'App',

  components: {
    PageMeetups,
  },

  template: `<page-meetups />`,
});

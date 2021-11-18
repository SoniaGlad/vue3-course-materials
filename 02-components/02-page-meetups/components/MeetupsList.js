import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupsListItem from './MeetupsListItem.js';

export default defineComponent({
  name: 'MeetupsList',

  components: {
    MeetupsListItem,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="meetups-list">
      <li v-for="meetup in meetups" :key="meetup.id" class="meetups-list__item">
        <a :href="\`/meetups/\${meetup.id}\`" class="meetups-list__item-link" tabindex="0">
          <meetups-list-item :meetup="meetup" />
        </a>
      </li>
    </ul>
  `,
});

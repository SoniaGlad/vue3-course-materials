import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiBadge from './UiBadge.js';
import UiCard from './UiCard.js';

export default defineComponent({
  name: 'MeetupsListItem',

  components: {
    UiBadge,
    UiCard,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  // Здесь вместо методов также можно сделать вычисляемые свойства
  // Это в некоторых случаях (при очень частом ререндеринге) может быть оптимальнее
  // Но в большинстве случаев Vue итак будет ререндерить оптимально,
  // а памяти на вычисляемые свойства потратится больше

  // computed: {
  //   isoDate() {
  //     return new Date(this.meetup.date).toISOString().split('T')[0];
  //   },
  //
  //   localDate() {
  //     return new Date(this.meetup.date).toLocaleString(navigator.language, {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     });
  //   },
  // },

  methods: {
    formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString().split('T')[0];
    },
  },

  template: `
    <ui-card :cover="meetup.image" class="meetup-card">
      <template #header>
        {{ meetup.title }}
      </template>

      <template #default>
        <ui-badge v-if="meetup.organizing" type="success" class="meetup-card__badge">Организую</ui-badge>
        <ui-badge v-if="meetup.attending" type="primary" class="meetup-card__badge">Участвую</ui-badge>
        <ul class="meetup-info">
          <li class="meetup-info__item">
            <img class="meetup-info__icon icon" src="/assets/icons/icon-user.svg" alt="user" />
            {{ meetup.organizer }}
          </li>
          <li class="meetup-info__item">
            <img class="meetup-info__icon icon" src="/assets/icons/icon-map.svg" alt="map" />
            {{ meetup.place }}
          </li>
          <li class="meetup-info__item">
            <img class="meetup-info__icon icon" src="/assets/icons/icon-cal-lg.svg" alt="cal-lg" />
            <time :datetime="formatAsIsoDate(meetup.date)">{{ formatAsLocalDate(meetup.date) }}</time>
          </li>
        </ul>
      </template>
    </ui-card>
  `,
});

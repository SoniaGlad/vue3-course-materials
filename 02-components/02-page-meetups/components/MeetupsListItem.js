import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';
import UiCard from './UiCard.js';

export default defineComponent({
  name: 'MeetupsListItem',

  components: {
    UiCard,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

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
    <!-- <ui-card :cover='meetup.image' :header='meetup.title'> -->
    <ui-card class='meetup-card' data-test='S' :cover='meetup.image'>

    <template #header>
      {{ meetup.title }}
    </template>

    <!-- #default = v-slot:default -->
    <template #default>
      <span v-if='meetup.organizing' class='meetup-card__badge badge badge_success'>Организую</span>
      <span v-if='meetup.attending' class='meetup-card__badge badge badge_primary'>Участвую</span>
      <ul class='meetup-info'>
        <li class='meetup-info__item'>
          <img class='meetup-info__icon icon' src='/assets/icons/icon-user.svg' alt='user' />
          {{ meetup.organizer }}
        </li>
        <li class='meetup-info__item'>
          <img class='meetup-info__icon icon' src='/assets/icons/icon-map.svg' alt='map' />
          {{ meetup.place }}
        </li>
        <li class='meetup-info__item'>
          <img class='meetup-info__icon icon' src='/assets/icons/icon-cal-lg.svg' alt='cal-lg' />
          <time :datetime='formatAsIsoDate(meetup.date)'>{{ formatAsLocalDate(meetup.date) }}</time>
        </li>
      </ul>
    </template>
    </ui-card>

    <!-- Было раньше -->
    <!--    <article class='meetup-card card'>
        <div class='card__col'>
          <div class='card__cover' :style="meetup.image && { '&#45;&#45;bg-url': \`url(\${meetup.image})\` }">
            &lt;!&ndash; Текстовая интерполяция позволяет выводить значения выражения строкой (безопасно, с экранированием) &ndash;&gt;
            <header>{{ meetup.title }}</header>
          </div>
        </div>
        <div class='card__col'>
          <div class='card__content'>
            <span v-if='meetup.organizing' class='meetup-card__badge badge badge_success'>Организую</span>
            <span v-if='meetup.attending' class='meetup-card__badge badge badge_primary'>Участвую</span>
            <ul class='meetup-info'>
              <li class='meetup-info__item'>
                <img class='meetup-info__icon icon' src='/assets/icons/icon-user.svg' alt='user' />
                {{ meetup.organizer }}
              </li>
              <li class='meetup-info__item'>
                <img class='meetup-info__icon icon' src='/assets/icons/icon-map.svg' alt='map' />
                {{ meetup.place }}
              </li>
              <li class='meetup-info__item'>
                <img class='meetup-info__icon icon' src='/assets/icons/icon-cal-lg.svg' alt='cal-lg' />
                <time :datetime='formatAsIsoDate(meetup.date)'>{{ formatAsLocalDate(meetup.date) }}</time>
              </li>
            </ul>
          </div>
        </div>
        </article>-->

  `,
});

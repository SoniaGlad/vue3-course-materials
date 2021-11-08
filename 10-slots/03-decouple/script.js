import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const MeetupsFilters = defineComponent({
  name: 'MeetupsFilters',

  props: {
    filter: {
      type: String,
      required: true,
    },
  },

  emits: {
    'update:filter': null,
  },

  template: `
    <div class="filters">
      <input :value="filter" @input="$emit('update:filter', $event.target.value)">
    </div>`,
});

const MeetupsView = defineComponent({
  name: 'MeetupsFilters',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="meetups-view">
      <ul>
        <li v-for="meetup in meetups" :key="meetup.id">{{ meetup.title }}</li>
      </ul>
    </div>`,
});

const MeetupsPage = defineComponent({
  name: 'MeetupsPage',

  data() {
    return {
      filter: '',
      meetups: null,
    };
  },

  computed: {
    filteredMeetups() {
      return this.meetups?.filter((meetup) => meetup.title.includes(this.filter));
    },
  },

  mounted() {
    fetch(`${API_URL}/meetups`)
      .then((res) => res.json())
      .then((meetups) => {
        this.meetups = meetups;
      });
  },

  template: `
    <div>
      <slot :filter="filter" :update-filter="(value) => filter = value" :meetups="filteredMeetups" />
    </div>`,
});

const App = defineComponent({
  name: 'App',

  components: { MeetupsPage, MeetupsView, MeetupsFilters },

  template: `
    <div class="container">
      <meetups-page v-slot="{ filter, updateFilter, meetups }">
        <meetups-filters :filter="filter" @update:filter="updateFilter" />
        <meetups-view v-if="meetups" :meetups="meetups"/>
      </meetups-page>
    </div>`,
});

createApp(App).mount('#app');

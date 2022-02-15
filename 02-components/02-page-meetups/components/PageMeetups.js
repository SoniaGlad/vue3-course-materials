import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupsList from './MeetupsList.js';
import MeetupsCalendar from './MeetupsCalendar.js';
import UiButtonGroup from './UiButtonGroup.js';
import UiRadioGroup from './UiRadioGroup.js';

const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

export default defineComponent({
  name: 'PageMeetups',

  components: {
    MeetupsList,
    MeetupsCalendar,
    UiButtonGroup,
    UiRadioGroup,
  },

  data() {
    return {
      meetups: null,
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },

      view: 'list',
    };
  },

  computed: {
    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.filter.date === 'all' ||
        (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === 'future' && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === 'all' ||
        (this.filter.participation === 'organizing' && meetup.organizing) ||
        (this.filter.participation === 'attending' && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup));
    },
  },

  mounted() {
    fetchMeetups().then((meetups) => {
      this.meetups = meetups;
    });
  },

  template: `
    <div class='container'>
    <div class='filters-panel'>
      <div class='filters-panel__col'>
        <ui-radio-group
          v-model:value='filter.date'
        />
      </div>

      <div class='filters-panel__col'>
        <div class='form-group form-group_inline'>
          <div class='input-group input-group_icon input-group_icon-left'>
            <div class='input-group__icon'>
              <img class='icon' src='/assets/icons/icon-search.svg' alt='search' />
            </div>

            <input
              class='form-control form-control_rounded form-control_sm'
              placeholder='Поиск'
              type='search'
              v-model.trim='filter.search'
            />
          </div>
        </div>
        <div class='form-group form-group_inline'>
          <ui-button-group
            v-model:view='view' />
          <!-- выше было 1:
            :view='view'
            @select='view = $event'
               затем стало 2:
            :view='view'
            @update:view='view = $event'
               затем 2 объединилось и поменяло на:
            v-model:view='view'
          -->
        </div>
      </div>
    </div>

    <template v-if='meetups'>
      <template v-if='filteredMeetups.length'>
        <meetups-list v-if='view === "list"' :meetups='filteredMeetups' />
        <meetups-calendar v-else-if="view === 'calendar'" :meetups='filteredMeetups' />
      </template>
      <div v-else class='alert'>Митапов по заданным условиям не найдено...</div>
    </template>
    <div v-else class='alert'>Загрузка...</div>
    </div>`,
});

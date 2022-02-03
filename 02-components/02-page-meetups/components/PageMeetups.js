import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupsList from './MeetupsList.js';
import MeetupsCalendar from './MeetupsCalendar.js';
import UiButtonGroup from './UiButtonGroup.js';

const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

export default defineComponent({
  name: 'PageMeetups',

  components: {
    MeetupsList,
    MeetupsCalendar,
    UiButtonGroup,
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
        <div class='radio-group'>
          <div class='radio-group__button'>
            <input
              id='radio-buttons_date_all'
              class='radio-group__input'
              type='radio'
              name='date'
              value='all'
              v-model='filter.date'
            />
            <label for='radio-buttons_date_all' class='radio-group__label'>Все</label>
          </div>
          <div class='radio-group__button'>
            <input
              id='radio-buttons_date_future'
              class='radio-group__input'
              type='radio'
              name='date'
              value='past'
              v-model='filter.date'
            />
            <label for='radio-buttons_date_future' class='radio-group__label'>Прошедшие</label>
          </div>
          <div class='radio-group__button'>
            <input
              id='radio-buttons_date_past'
              class='radio-group__input'
              type='radio'
              name='date'
              value='future'
              v-model='filter.date'
            />
            <label for='radio-buttons_date_past' class='radio-group__label'>Ожидаемые</label>
          </div>
        </div>
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
          <ui-button-group :view='view' @select='view = $event' />
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
    </div>
    <script>
    import MeetupsCalendar from './MeetupsCalendar';

    export default {
      components: { MeetupsCalendar },
    };
    </script>`,
});

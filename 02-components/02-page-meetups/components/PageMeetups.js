import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupsList from './MeetupsList.js';

const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

export default defineComponent({
  name: 'PageMeetups',

  components: {
    MeetupsList,
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
          <div class='button-group' role='group'>
            <button
              type='button'
              class='button-group__button'
              :class="{ 'button-group__button_active': view === 'list' }"
              aria-label='Список'
              :aria-selected="view === 'list'"
              @click="view = 'list'"
            >
              <svg fill='none' height='28' viewBox='0 0 28 28' width='28' xmlns='http://www.w3.org/2000/svg'>
                <path
                  clip-rule='evenodd'
                  d='m5 7c-.55228 0-1 .44772-1 1s.44772 1 1 1h.01c.55228 0 1-.44772 1-1s-.44772-1-1-1zm5 0c-.55228 0-1 .44772-1 1s.44772 1 1 1h13c.5523 0 1-.44772 1-1s-.4477-1-1-1zm0 6c-.55228 0-1 .4477-1 1s.44772 1 1 1h13c.5523 0 1-.4477 1-1s-.4477-1-1-1zm-1 7c0-.5523.44772-1 1-1h13c.5523 0 1 .4477 1 1s-.4477 1-1 1h-13c-.55228 0-1-.4477-1-1zm-5-6c0-.5523.44772-1 1-1h.01c.55228 0 1 .4477 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.4477-1-1zm1 5c-.55228 0-1 .4477-1 1s.44772 1 1 1h.01c.55228 0 1-.4477 1-1s-.44772-1-1-1z'
                  fill-rule='evenodd'
                ></path>
              </svg>
            </button>
            <button
              type='button'
              class='button-group__button'
              :class="{ 'button-group__button_active': view === 'calendar' }"
              aria-label='Календарь'
              :aria-selected="view === 'calendar'"
              @click="view = 'calendar'"
            >
              <svg height='22' viewBox='0 0 20 22' width='20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  clip-rule='evenodd'
                  d='m15 1c0-.552285-.4477-1-1-1s-1 .447715-1 1v1h-6v-1c0-.552285-.44772-1-1-1s-1 .447715-1 1v1h-2c-1.65685 0-3 1.34315-3 3v14c0 1.6569 1.34315 3 3 3h14c1.6569 0 3-1.3431 3-3v-14c0-1.65685-1.3431-3-3-3h-2zm3 7v-3c0-.55228-.4477-1-1-1h-2v1c0 .55228-.4477 1-1 1s-1-.44772-1-1v-1h-6v1c0 .55228-.44772 1-1 1s-1-.44772-1-1v-1h-2c-.55228 0-1 .44772-1 1v3zm-16 2h16v9c0 .5523-.4477 1-1 1h-14c-.55228 0-1-.4477-1-1z'
                  fill-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <template v-if='meetups'>
      <template v-if='filteredMeetups.length'>
        <meetups-list v-if='view === "list"' :meetups='filteredMeetups' />
        <div v-else-if="view === 'calendar'" class='meetups-calendar'>Календарь</div>
      </template>
      <div v-else class='alert'>Митапов по заданным условиям не найдено...</div>
    </template>
    <div v-else class='alert'>Загрузка...</div>
    </div>
  `,
});

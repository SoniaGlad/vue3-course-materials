import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupsList from './MeetupsList.js';
import MeetupsCalendar from './MeetupsCalendar.js';
import UiButtonGroup from './UiButtonGroup.js';
import UiRadioGroup from './UiRadioGroup.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

export default defineComponent({
  name: 'PageMeetups',

  // объявили custom свойство компонента, которое не является его данными, т.е. это статические свойства; в шаблоне ниже мы к нему обращаемся через $options, т.е. получается $options.dateFilterOptions
  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    UiButtonGroup,
    UiRadioGroup,
    UiAlert,
    UiContainer,
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
    <!-- Все, что внтури ui-container - это содержимое для слота в компоненте UiContainer -->
    <ui-container>
    <div class='filters-panel'>
      <div class='filters-panel__col'>
        <!-- Ниже было:
        v-model:value='filter.date'
        затем:
        v-model:modal-value='filter.date'
        -->
        <ui-radio-group v-model:modal-value='filter.date'
                        :name='"date"'
                        :options='$options.dateFilterOptions'
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
          <!-- ниже было 1:
            :view='view'
            @select='view = $event'
               затем стало 2:
            :view='view'
            @update:view='view = $event'
               затем 2 объединилось и поменяло на:
            v-model:view='view'
          -->
          <ui-button-group
            v-model:view='view' />
        </div>
      </div>
    </div>

    <template v-if='meetups'>
      <template v-if='filteredMeetups.length'>
        <meetups-list v-if='view === "list"' :meetups='filteredMeetups' />
        <meetups-calendar v-else-if="view === 'calendar'" :meetups='filteredMeetups' />
      </template>
      <!-- Ниже выведется дефолтное значение, см. внутри слота в компоненте   -->
      <!-- <ui-alert v-else></ui-alert>   -->
      <!-- Если внутри слота передан параметр, например {{ text }}, то его также можно передать как параметр и содержимое одновременно -->
      <!--      <ui-alert v-else :text='"Error!"'></ui-alert>-->
      <ui-alert v-else>
        <h1>Error!</h1>
        Митапов по заданным условиям не найдено...
      </ui-alert>
    </template>
    <ui-alert v-else>Загрузка...</ui-alert>
    </ui-container>`,
});


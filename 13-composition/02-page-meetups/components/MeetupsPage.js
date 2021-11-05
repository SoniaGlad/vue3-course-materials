import { defineComponent, ref, computed, onMounted } from '../vendor/vue.esm-browser.js';
import UiRadioGroup from './UiRadioGroup.js';
import MeetupsList from './MeetupsList.js';
import UiContainer from './UiContainer.js';
import MeetupsCalendar from './MeetupsCalendar.js';
import UiAlert from './UiAlert.js';
import UiButtonGroup from './UiButtonGroup.js';
import { useMeetupsFetch } from '../composables/useMeetupsFetch.js';
import { useMeetupsFilter } from '../composables/useMeetupsFilter.js';

export default defineComponent({
  name: 'MeetupsPage',

  components: {
    MeetupsList,
    MeetupsCalendar,
    UiRadioGroup,
    UiButtonGroup,
    UiContainer,
    UiAlert,
  },

  setup() {
    const { meetups } = useMeetupsFetch();
    const { filter, filteredMeetups, dateFilterOptions } = useMeetupsFilter(meetups);

    const view = ref('list');

    const formatDate = (date) =>
      new Date(date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    return {
      // data
      filter,
      view,
      dateFilterOptions,
      // computed
      filteredMeetups,
      // methods
      formatDate,
    };
  },

  template: `
    <ui-container>
      <div class="filters-panel">
        <div class="filters-panel__col">
          <ui-radio-group v-model="filter.date" :options="dateFilterOptions" name="date" />
        </div>

        <div class="filters-panel__col">
          <div class="form-group form-group_inline">
            <div class="input-group input-group_icon input-group_icon-left">
              <div class="input-group__icon">
                <img class="icon" src="/assets/icons/icon-search.svg" alt="search" />
              </div>

              <input
                class="form-control form-control_rounded form-control_sm"
                placeholder="Поиск"
                type="search"
                v-model.trim="filter.search"
              />
            </div>
          </div>
          <div class="form-group form-group_inline">
            <ui-button-group v-model:view="view" />
          </div>
        </div>
      </div>

      <template v-if="filteredMeetups">
        <template v-if="filteredMeetups.length">
          <meetups-list v-if="view === 'list'" :meetups="filteredMeetups" />
          <meetups-calendar v-else-if="view === 'calendar'" :meetups="filteredMeetups" />
        </template>
        <ui-alert v-else >Митапов по заданным условиям не найдено...</ui-alert>
      </template>
      <ui-alert v-else >Загрузка...</ui-alert>
    </ui-container>
  `,
});

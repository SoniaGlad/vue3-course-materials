import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

// массив с данными (см. в data) - *удалили, когда добавили fetch

// fetch для получения данных из json файла в директории api и дальнейший их парсинг в json
const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

// ОПИСАНИЕ КОРНЕВОГО КОМПОНЕНТА

/*
функция defineComponent(), которая ничего не делает, но необходима, когда работаем без сборщиков,
чтобы различные инструменты, например, среда разработки, понимали,
что объект внутри - это именно компонент vue */
const Root = defineComponent({
  name: 'Root',
  /*
  функция, которая возвращает объект с начальным состоянием данных,
  при создании экземпляра компонента vue будет использовать эту функцию,
  чтобы инициализировать данные приложения;
  */
  data() {
    // данные - это всегда объект
    return {
      hello: 'world',
      meetups: null, // массив с данными (см. переменную выше *ДО добавления fetch!)
      // filteredMeetups: [], // отфильтрованный массив с данными (это связка с watch)
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      
      view: 'list', // list | calendar
    };
  },

  /* watch:
  immediate: true - инициализация filteredMeetups (отфильтрованного массива) при инициализации, а не только при  изменениях
  */
  // глубокое отслеживание, т.е. то, что внутри свойства filter, тоже будет отслеживаться
  // watch: {
  //   filter: {
  //     immediate: true,
  //     deep: true,
  //     handler() {
  //       this.filteredMeetups = this.filterMeetups();
  //     },
  //   },
  //
  //   meetups: {
  //     deep: true,
  //     handler() {
  //       this.filteredMeetups = this.filterMeetups();
  //     },
  //   },
  // },

  // функции в computed должны только вычислять и возвращать то, что вычислили!!!
  computed: {
    // ВАЖНО! Вычисляемые СВОЙСТВА (здесь: filteredMeetups()) мы сами НЕ вызываем! Ее вызывает vue
    // СВОЙСТВА также НЕ имеют параметров: filteredMeetups(здесь НЕ МОЖЕТ БЫТЬ параметров!)
    filteredMeetups() {
      // return this.filterMeetups();
      if (!this.meetups) {
        return null;
      }

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

  // при монтаже компонента ->
  mounted() {
    // -> мы запросили данные, которые получили выше в fetch ->
    fetchMeetups().then((meetups) => {
      // -> и сохранили эти данные в свойстве meetups (который в data())
      this.meetups = meetups;
    });
  },

  methods: {
    // filterMeetups() {
    // На самом деле эта проверка не нужна, если мы не обращаемся к списку митапов, пока их нет
    //   if (!this.meetups) {
    //     return null;
    //   }
    //
    //   const dateFilter = (meetup) =>
    //     this.filter.date === 'all' ||
    //     (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
    //     (this.filter.date === 'future' && new Date(meetup.date) > new Date());
    //
    //   const participationFilter = (meetup) =>
    //     this.filter.participation === 'all' ||
    //     (this.filter.participation === 'organizing' && meetup.organizing) ||
    //     (this.filter.participation === 'attending' && meetup.attending);
    //
    //   const searchFilter = (meetup) =>
    //     [meetup.title, meetup.description, meetup.place, meetup.organizer]
    //       .join(' ')
    //       .toLowerCase()
    //       .includes(this.filter.search.toLowerCase());
    //
    //   return this.meetups.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup));
    // },

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
});

// СОЗДАНИЕ ПРИЛОЖЕНИЯ:

/*
функция возвращает обертку над компонентом;
эта обертка называется приложение;
нужно для конфигурации приложения
*/
const app = createApp(Root);

// МОНТАЖ ПРИЛОЖЕНИЯ НА СТРАНИЦУ И ПОЛУЧЕНИЕ ЭКЗЕМПЛЯРА КОМПОНЕНТА:

// метод mount возвращает экземпляр компонента
const vm = app.mount('#app');

// экзепляр положили в глобальную переменную (временное решение!)
window.vm = vm;

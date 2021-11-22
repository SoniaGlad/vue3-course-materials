import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Имитируем простое API, запрашиваем данные с JSON файла
const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

// Описываем корневой компонент - всё наше приложение
// Функция defineComponent здесь ничего не делает и просто возвращает объект, как есть.
// Она позволяет определять компонент функцией для Composition API,
// а также помогает инструментам разработки понять, что здесь описан компонент.
// Компонент - это объект с ОПЦИЯМИ
const Root = defineComponent({
  name: 'Root',
  // Реактивные данные приложения, его локальное состояние
  data() {
    return {
      hello: '<h1><b>world</b></h1>',
      meetups: null,

      // filteredMeetups: null,
      // Вместо хранения отдельно начального списка и отдельно отфильтрованного
      // будем вычислять отфильтрованный на основе начального

      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },

      view: 'list',
    };
  },

  // Вычисляемые свойства позволяют получать свойства, значение которых автоматически вычисляется на основе других реактивных свойств
  computed: {
    // Вычислим отфильтрованный список митапов
    filteredMeetups() {
      // На самом деле эта проверка не нужна, если мы не обращаемся к списку митапов, пока их нет
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

  // Можно вручную отслеживать изменение реактивных данных
  watch: {
    // hello(newValue, oldValue) {
    //   console.log(newValue, oldValue);
    // },
    // filter: {
    //   deep: true,
    //   handler() {
    //     this.filterMeetups();
    //   },
    // },
    // meetups: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.filterMeetups();
    //   },
    // },
  },

  // Как только приложение будет смонтировано - запрашиванием данные
  mounted() {
    fetchMeetups().then((meetups) => {
      this.meetups = meetups;
    });
  },

  methods: {
    // Обработчики событий обычно лучше описывать отдельными методами, если они не совсем примитивные
    // handleInput(event) {
    //   this.filter.search = event.target.value;
    // },

    // Для форматирования - нормально использовать методы в шаблоне
    // Для больших вычислений - не оптимально и не декларативно
    // Для вычислений с побочными эффектами - запрещено
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

  // Можно писать шаблон прямо здесь строкой, а можно взять его из DOM
  // Если брать из DOM, но не из того же элемента, куда мы потом смонтируем приложение
  // template: `<div> ...`,
  // template: `#template`,
});

// Создаём новое приложение по корневому компоненту
const app = createApp(Root);

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const vm = app.mount('#app');

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
window.vm = vm;
// Альтернатива - открыть vue-devtools, выбрать приложение, кликнуть на корневой узел и обращаться в консоли к
// $vm.proxy
// или $vm0.proxy

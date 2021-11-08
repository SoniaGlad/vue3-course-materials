import { createApp, defineAsyncComponent, defineComponent } from './vendor/vue.esm-browser.js';

const AsyncGeneratedMeetupsList = defineAsyncComponent(async () => {
  const meetups = await fetch('https://course-vue.javascript.ru/api/meetups').then((res) => res.json());
  console.log('Загружен массив митапов в AsyncGeneratedMeetupsList');
  return defineComponent({
    name: 'AsyncGeneratedMeetupsList',
    meetups,
    template: `
      <ul>
        <li v-for="meetup in $options.meetups">{{ meetup.title }}</li>
      </ul>`,
  });
});

// Composition API
// Пока не знакомы
// Работает ТОЛЬКО с Suspense
const AsyncMeetup = defineAsyncComponent(async () => {
  return defineComponent({
    name: 'AsyncMeetup',

    props: {
      meetupId: {
        type: Number,
        required: true,
      },
    },

    async setup(props) {
      // Загружаем данные
      const meetup = await fetch(`https://course-vue.javascript.ru/api/meetups/${props.meetupId}`).then((res) =>
        res.json(),
      );
      console.log('Загружен митап в AsyncMeetup');
      return {
        meetup,
      };
    },

    template: `
      <h2>{{ meetup.title }}</h2>`,
  });
});

const ThePage = defineComponent({
  components: {
    AsyncComponent: defineAsyncComponent(async () => {
      // Задержка для демонстрации
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Асинхронно загружаем компонент
      return await import('./AsyncComponent.js');
    }),

    AsyncGeneratedMeetupsList,
    AsyncMeetup,
  },

  template: `
    <table border="0">
      <tr>
        <td>Асинхронно загруженный компонент:</td>
        <td>
          <async-component />
        </td>
      </tr>
      <tr>
        <td>Асинхронно сгенерированный компонент после получения данных для него:</td>
        <td>
          <async-generated-meetups-list />
        </td>
      </tr>
      <tr>
        <td>Асинхронно инициализирующийся компонент:</td>
        <td>
          <async-meetup :meetup-id="1" />
        </td>
      </tr>
    </table>`,
});

const App = defineComponent({
  components: {
    ThePage,
  },

  template: `<div>
    <h1>App</h1>

    <suspense>
      <template #default>
        <the-page />
      </template>

      <template #fallback>
        Ещё не все асинхронные потомки готовы...
      </template>
    </suspense>
  </div>`,
});

createApp(App).mount('#app');

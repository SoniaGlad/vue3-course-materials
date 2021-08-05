import { createApp } from './vendor/vue.esm-browser.js';
import App from './App.js';

createApp(App)
  .provide('config', {
    API_URL: 'https://course-vue.javascript.ru/api',
  })
  .mount('#app');

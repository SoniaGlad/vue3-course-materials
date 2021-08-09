import { createApp } from './vendor/vue.esm-browser.js';
import { createToaster } from './plugins/toaster/index.js';
import App from './App.js';

const toaster = createToaster({
  container: '#toaster',
});

createApp(App).use(toaster).mount('#app');

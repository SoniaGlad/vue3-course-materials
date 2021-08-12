import { createApp, defineComponent, h } from './vendor/vue.esm-browser.js';
import App from './App.js';
import { useAuthProvider } from './composables/auth.js';

const Root = defineComponent(() => {
  useAuthProvider();
  return () => h(App);
});

createApp(Root).mount('#app');

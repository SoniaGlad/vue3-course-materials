import { defineComponent, ref } from './vendor/vue.esm-browser.js';
import LoginPage from './LoginPage.js';
import { useAuth } from './composables/useAuth.js';

export default defineComponent({
  name: 'App',

  components: {
    LoginPage,
  },

  setup() {
    const { isAuthenticated, user } = useAuth();

    return {
      isAuthenticated,
      user,
    };
  },

  template: `
    <div class="page-auth container">
      <login-page v-if="!isAuthenticated"/>
      <div v-else>{{ user }}</div>
    </div>`,
});

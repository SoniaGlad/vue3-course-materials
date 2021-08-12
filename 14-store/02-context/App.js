import { defineComponent } from './vendor/vue.esm-browser.js';
import LoginPage from './LoginPage.js';
import { useAuthContext } from './composables/auth.js';

export default defineComponent({
  name: 'App',

  components: {
    LoginPage,
  },

  setup() {
    const { isAuthenticated, user } = useAuthContext();

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

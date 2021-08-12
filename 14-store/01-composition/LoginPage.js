import { defineComponent, ref } from './vendor/vue.esm-browser.js';
import { useAuth } from './composables/useAuth.js';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const email = ref('demo@email');
    const password = ref('password');

    const { login } = useAuth();

    const handleSubmit = () => {
      login(email.value, password.value).catch((error) => alert(error.message));
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },

  template: `
    <form class="form" @submit.prevent="handleSubmit">
      <h2 class="page-auth__title">Вход</h2>

      <div class="form-group">
        <label class="form-group__label">Email</label>
        <div class="input-group">
          <input class="form-control" type="email" placeholder="demo@email" v-model="email" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label">Password</label>
        <div class="input-group">
          <input class="form-control" type="password" placeholder="password" v-model="password" />
        </div>
      </div>

      <div class="form__buttons">
        <button class="button button_primary">Login</button>
      </div>
    </form>`,
});

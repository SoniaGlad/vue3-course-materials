<template>
  <ui-alert v-if="state === 'loading'">Loading...</ui-alert>
  <form v-else class="form" @submit.prevent="handleSubmit">
    <h2 class="page-auth__title">Вход</h2>

    <ui-alert v-if="state === 'error'">{{ error }}</ui-alert>

    <div class="form-group">
      <label class="form-group__label">Email</label>
      <div class="input-group">
        <input v-model="email" class="form-control" type="email" placeholder="demo@email" />
      </div>
    </div>

    <div class="form-group">
      <label class="form-group__label">Password</label>
      <div class="input-group">
        <input v-model="password" class="form-control" type="password" placeholder="password" />
      </div>
    </div>

    <div class="form__buttons">
      <button class="button button_primary">Login</button>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import UiAlert from './UiAlert';

export default {
  name: 'LoginPage',

  components: {
    UiAlert,
  },

  setup() {
    const store = useStore();

    const email = ref('demo@email');
    const password = ref('password');
    const handleSubmit = () => store.dispatch('auth/LOGIN', { email: email.value, password: password.value });

    const store = useStore();

    const handleSubmit = () => {
      store.dispatch('auth/LOGIN', { email: email.value, password: password.value });
    };

    return {
      state: computed(() => store.state.auth.state),
      error: computed(() => store.state.auth.error),
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style></style>

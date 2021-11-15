<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="page-auth__title">Вход</h2>

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
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore.js';

export default {
  name: 'LoginPage',

  setup() {
    const authStore = useAuthStore();
    const email = ref('demo@email');
    const password = ref('password');
    const handleSubmit = () => {
      authStore.login(email.value, password.value).catch((err) => alert(err.message));
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style></style>

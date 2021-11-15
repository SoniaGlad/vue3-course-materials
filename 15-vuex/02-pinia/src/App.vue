<template>
  <div class="page-auth container">
    <login-page v-if="!isAuthenticated" />
    <div v-else>{{ user }}</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import LoginPage from './components/LoginPage';
import { useAuthStore } from './stores/useAuthStore';
import { storeToRefs } from 'pinia';

export default {
  name: 'App',

  components: {
    LoginPage,
  },

  setup() {
    const authStore = useAuthStore();
    const { user, isAuthenticated } = storeToRefs(authStore);

    return {
      user,
      isAuthenticated,
    };
  },
};
</script>

<style></style>

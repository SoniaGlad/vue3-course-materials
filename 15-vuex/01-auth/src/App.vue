<template>
  <div class="page-auth container">
    <login-page v-if="!isAuthenticated" />
    <div v-else>{{ user }}</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginPage from './components/LoginPage';

export default {
  name: 'App',

  components: {
    LoginPage,
  },

  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.auth.user),
      isAuthenticated: computed(() => store.getters['auth/IS_AUTHENTICATED']),
    };
  },
};
</script>

<style></style>

<template>
  <div class="wrapper">
    <meetups-header />
    <main class="main">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </template>
        <ui-container v-else>
          <ui-alert>Страница загружается...</ui-alert>
        </ui-container>
      </router-view>
    </main>
    <meetups-footer />
  </div>
</template>

<script>
import MeetupsHeader from './components/MeetupsHeader';
import MeetupsFooter from './components/MeetupsFooter';
import UiAlert from './components/UiAlert.vue';
import UiContainer from './components/UiContainer.vue';

export default {
  name: 'App',

  components: {
    UiContainer,
    UiAlert,
    MeetupsHeader,
    MeetupsFooter,
  },
};
</script>

<style>
@import './assets/styles/_fonts.css';
@import './assets/styles/_variables.css';
@import './assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>

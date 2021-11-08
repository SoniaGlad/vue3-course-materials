import { defineComponent } from './vendor/vue.esm-browser.js';
import RenderlessListView from './RenderlessListView.js';

export default defineComponent({
  name: 'App',

  components: {
    RenderlessListView,
  },

  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },

  template: `
    <renderless-list-view v-model:items="list" v-slot="{ items, newItem, updateNewItem, add, remove }">
      <p>
        <button v-for="(item, index) in items" :key="item" @click="remove(index)">{{ item }}</button>
      </p>

      <form @submit.prevent="add">
        <input :value="newItem" @change="updateNewItem($event.target.value)" />
      </form>
    </renderless-list-view>`,
});

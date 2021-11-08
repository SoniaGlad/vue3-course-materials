import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'ListView',

  props: {
    items: Array,
  },

  emits: {
    'update:items': null,
  },

  data() {
    return {
      localItems: [],
      newItem: '',
    };
  },

  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(newItem) {
        this.localItems = [...newItem];
      },
    },
  },

  methods: {
    add() {
      this.localItems.push(this.newItem);
      this.newItem = '';
      this.$emit('update:items', [...this.localItems]);
    },

    remove(index) {
      this.localItems.splice(index, 1);
      this.$emit('update:items', [...this.localItems]);
    },
  },

  template: `
    <div>
      <slot name="form" :add="add" :new-item="newItem" :update-new-item="(value) => newItem = value">
        <form @submit.prevent="handleSubmit">
          <input v-model="newItem" />
        </form>
      </slot>
      <ul>
        <li v-for="(item, index) in localItems">
          <slot name="item" :item="item" :index="index" :remove="() => remove(index)">
            <span>{{ item }}</span>
            <button @click="remove(index)">x</button>
          </slot>
        </li>
      </ul>
    </div>`,
});

import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'RenderlessListView',

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

  render() {
    return this.$slots.default({
      items: this.localItems,
      newItem: this.newItem,
      updateNewItem: (value) => {
        this.newItem = value;
      },
      add: this.add,
      remove: this.remove,
    });
  },
});

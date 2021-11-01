import { reactive, computed, watchEffect, watch, ref, toRefs, toRef, toRaw } from './vendor/vue.esm-browser.js';

const originalState = {
  user: 'Alice',
  items: ['a', 'b', 'c'],
  set: new Set(),
  map: new Map(),
  // date: new Date() -- не реактивно (если использовать мутирующие методы)
};

const state = reactive(originalState);

const currentItemIndex = ref(0);

const currentItem = computed(() => state.items[currentItemIndex.value]);

// НЕ РЕАКТИВНО!
const { user: user1 } = state;
// Реактивно, но "сложно"
const user2 = computed(() => state.user);
// Реактивно (тоже самое)
const user3 = toRef(state, 'user');
const { user: user4 } = toRefs(state);

watch(user1, (newValue) => console.log('New user1 value:', newValue));
watch(user2, (newValue) => console.log('New user2 value:', newValue));
watch(user3, (newValue) => console.log('New user3 value:', newValue));
watch(user4, (newValue) => console.log('New user4 value:', newValue));

// user.value.name = 'Bob';

watch(currentItem, (newValue, oldValue) => {
  console.log('Watch on currentItem -----------------------');
  console.log(newValue, oldValue);
  console.log('--------------------------------------------');
});

watchEffect(() => {
  console.log('Watch Effect -------------------------------');
  console.log('State Keys:', Object.keys(state));
  console.log('Items (as is):', state.items);
  console.log('Items (toRaw):', toRaw(state.items));
  console.log('Current Item Index:', currentItemIndex.value);
  console.log('Current Item:', currentItem.value);
  console.log('Set:', Array.from(state.set));
  console.log('--------------------------------------------');
});

// Try:
// state.items.push("d");
// currentItemIndex.value = 1;
// state.items[currentItemIndex.value] = 'New';
// state.newKey = 'New Value';
// state.set.add('New Value');
// user.name = 'Bob';

window.state = state;
window.originalState = originalState;
window.currentItemIndex = currentItemIndex;
window.currentItem = currentItem;
window.user1 = user1;
window.user2 = user2;
window.user3 = user3;
window.user4 = user4;

import { watch, ref } from '../vendor/vue.esm-browser.js';

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export function useLocalProp(props, { emit }, propName) {
  const localProp = ref(null);

  watch(
    props[propName],
    (newValue) => {
      if (!deepEqual(props[propName], localProp.value)) {
        localProp.value = deepClone(newValue);
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    localProp,
    (newValue) => {
      emit(`update:${propName}`, deepClone(newValue));
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return localProp;
}

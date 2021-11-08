<!--<template>
  <fieldset>
    <slot />
  </fieldset>
</template>-->

<script>
import { h } from 'vue';

export default {
  name: 'FieldsetComponent',

  render() {
    return h('fieldset', this.$slots.default());
  },
};
</script>

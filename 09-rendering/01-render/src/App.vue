<template>
  <fieldset-component>
    <text-div />
    <counter-button v-model:count="count" />
  </fieldset-component>
</template>

<script>
import { h } from 'vue';
import FieldsetComponent from '@/FieldsetComponent';
import TextDiv from '@/TextDiv';
import CounterButton from '@/CounterButton';

export default {
  name: 'App',

  data() {
    return {
      count: 0,
    };
  },

  render() {
    const counterButton = h(CounterButton, {
      count: this.count,
      'onUpdate:count': ($event) => {
        this.count = $event;
      },
    });

    const content = [h(TextDiv), counterButton];

    // return h(FieldsetComponent, null, () => content);
    return h(FieldsetComponent, null, { default: () => content });
  },
};
</script>

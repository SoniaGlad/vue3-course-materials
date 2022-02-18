import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiRadioGroup',

  props: {
    // value:
    modalValue: {
      type: String,
    },

    options: {
      type: Array,
    },

    name: {
      type: String,
    },
  },

  emits: ['update:modalValue'],

  template: `
    <div v-for='option in options' class='radio-group'>
    <div class='radio-group__button'>
      <input
        :id='\`radio-buttons_\${name}_\${option.value}\`'
        class='radio-group__input'
        type='radio'
        :name='name'
        :value='option.value'
        :checked='modalValue === option.value'
        @change='$emit("update:modalValue", $event.target.value)'
      />
      <label :for='\`radio-buttons_\${name}_\${option.value}\`' class='radio-group__label'>{{ option.text }}</label>
    </div>
    </div>
  `,
})
;

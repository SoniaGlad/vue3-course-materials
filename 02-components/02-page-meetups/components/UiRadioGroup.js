import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiRadioGroup',

  props: {
    options: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: String,
    },

    name: {
      type: String,
      default: () => `radio-group`,
    },
  },

  template: `
    <div class="radio-group">
      <div v-for="option in options" class="radio-group__button">
        <input
          :id="\`radio-buttons_\${name}_\${option.value}\`"
          class="radio-group__input"
          type="radio"
          :name="name"
          :value="options.value"
          :checked="option.value === modelValue"
          @input="$emit('update:modelValue', option.value)"
        />
        <label :for="\`radio-buttons_\${name}_\${option.value}\`" class="radio-group__label">{{ option.text }}</label>
      </div>
    </div>
  `,
});

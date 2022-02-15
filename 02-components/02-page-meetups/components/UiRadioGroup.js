import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiRadioGroup',

  props: {
    value: {
      type: String,
    },
  },

  emits: ['update:value'],

  template: `
    <div class='radio-group'>
    <div class='radio-group__button'>
      <input
        id='radio-buttons_date_all'
        class='radio-group__input'
        type='radio'
        name='date'
        value='all'
        :checked='value === "all"'
        @change='$emit("update:value", $event.target.value)'
      />
      <label for='radio-buttons_date_all' class='radio-group__label'>Все</label>
    </div>
    <div class='radio-group__button'>
      <input
        id='radio-buttons_date_future'
        class='radio-group__input'
        type='radio'
        name='date'
        value='past'
        :checked='value === "past"'
        @change='$emit("update:value", $event.target.value)'
      />
      <label for='radio-buttons_date_future' class='radio-group__label'>Прошедшие</label>
    </div>
    <div class='radio-group__button'>
      <input
        id='radio-buttons_date_past'
        class='radio-group__input'
        type='radio'
        name='date'
        value='future'
        :checked='value === "future"'
        @change='$emit("update:value", $event.target.value)'
      />
      <label for='radio-buttons_date_past' class='radio-group__label'>Ожидаемые</label>
    </div>
    </div>
  `,
});

import { createApp, defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiCard',

  props: {
    cover: {
      type: String,
    },
    header: {
      type: String,
    },
  },

  template: `
    <article class='card'>
    <div class='card__col'>
      <div class='card__cover' :style="cover && { '--bg-url': \`url(\${cover})\` }">
        <!-- Текстовая интерполяция позволяет выводить значения выражения строкой (безопасно, с экранированием) -->
        <header>
          <slot name='header'>{{ header }}</slot>
        </header>
      </div>
    </div>
    <div class='card__col'>
      <div class='card__content'>
        <slot></slot>
      </div>
    </div>
    </article>
  `,
});

import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiCard',

  props: {
    cover: {
      type: String,
    },

    badge: {
      type: String,
      required: false,
    },
  },

  template: `
    <article class="card">
      <div class="card__col">
        <div class="card__cover" :style="cover && \`--bg-url: url('\${cover}')\`">
          <header>
            <slot name="header"/>
          </header>
        </div>
      </div>
      <div class="card__col">
        <div class="card__content">
          <slot />
        </div>
      </div>
    </article>
  `,
});

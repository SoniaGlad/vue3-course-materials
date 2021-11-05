import { defineComponent, ref } from './vendor/vue.esm-browser.js';
import UserForm from './UserForm.js';
import { useDateFormatters } from './composables/useDateFormatters.js';
import { useToaster } from './composables/useToaster.js';

export default defineComponent({
  name: 'App',

  components: { UserForm },

  setup() {
    const date = ref(new Date().getTime());
    const user = ref({
      firstName: 'firstName',
      lastName: 'lastName',
    });
    
    // Это просто обычные функции. Они не привязаны ни к экземпляру собираемого компонента, ни даже реактивности.
    // Выделять в composables в целом бессмысленно, за исключением "консистентности".
    const { formatAsLocalDate, formatAsIsoDate } = useDateFormatters();
    
    // В useToaster спрятано его внедрение и импорт ключа
    const { toast } = useToaster();

    const handleSubmit = () => toast(user.value);

    return {
      date,
      user,
      formatAsLocalDate,
      formatAsIsoDate,
      handleSubmit,
    };
  },

  template: `
    <div>
      <p>Current time: <time :datetime="formatAsIsoDate(date)">{{ formatAsLocalDate(date) }}</time></p>
      <hr>
      <user-form v-model:user="user" @submit.prevent="handleSubmit" />
      <hr>
      <pre>{{ user }}</pre>
    </div>`,
});

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Autocomplete from './Autocomplete.vue';

storiesOf('Autocomplete', module).add('displays title', () => ({
  components: { Autocomplete },
  methods: {
    handleClick: action('clicked'),
  },
  data() {
    return {
      value: 'basdf',
    };
  },
  template: `
    <Autocomplete v-model="value" :items="[]">
      <span slot="title">Demo list <button @click="handleClick">Demo</button></span>
    </Autocomplete>
  `,
}));

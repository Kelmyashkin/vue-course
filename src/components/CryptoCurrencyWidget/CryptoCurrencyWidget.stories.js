/* eslint-disable */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import CryptoCurrencyWidget from './CryptoCurrencyWidget.vue';

storiesOf('Autocomplete', module).add(
  'Simple string example no templates',
  () => ({
    components: { CryptoCurrencyWidget },
    template: `
    <div>
      <CryptoCurrencyWidget name="BTC">
      </CryptoCurrencyWidget>
    </div>
    `,
  }),
);

/* eslint-disable */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import CryptoCurrencyWidget from './CryptoCurrencyWidget.vue';

storiesOf('CryptoCurrencyWidget', module).add('BTC example', () => ({
  components: { CryptoCurrencyWidget },
  template: `
    <div>
      <CryptoCurrencyWidget name="BTC">
      </CryptoCurrencyWidget>
    </div>
    `,
}));

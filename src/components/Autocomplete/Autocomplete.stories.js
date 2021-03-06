/* eslint-disable */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Autocomplete from './Autocomplete.vue';

const testArray = [
  { name: 'BTC', value: 12.33 },
  { name: 'ETH', value: 14.33 },
  { name: 'XRP', value: 16.33 },
  { name: 'BCH', value: 15.33 },
  { name: 'LTC', value: 188.33 },
  { name: 'XLM', value: 11.33 },
  { name: 'EOS', value: 1333.33 },
];
const getPromise = () => {
  // let abort;
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => resolve(testArray), 1000);
  });
  return promise;
};

/* 
Funcs
1) Simple string example no templates
2) Simple string expamle with templates
3) Object example with template
4) Cancelable promise example
*/

storiesOf('Autocomplete', module).add(
  'Simple string example no templates',
  () => ({
    components: { Autocomplete },
    methods: {
      getItems(text) {
        if (!text) return Promise.resolve([]);

        return getPromise().then(currency =>
          currency
            .filter(c => c.name.toLowerCase().startsWith(text.toLowerCase()))
            .map(c => c.name),
        );
      },
    },
    data() {
      return {
        value: '',
      };
    },
    template: `
  <div>
    <p>Value is '{{value}}'</p>
    <Autocomplete v-model="value" :getItems="getItems">
    </Autocomplete>
  </div>
  `,
  }),
);

storiesOf('Autocomplete', module).add(
  'Simple string expamle with templates',
  () => ({
    components: { Autocomplete },
    methods: {
      getItems(text) {
        if (!text) return Promise.resolve([]);

        return getPromise().then(currency =>
          currency
            .filter(c => c.name.toLowerCase().startsWith(text.toLowerCase()))
            .map(c => c.name),
        );
      },
    },
    data() {
      return {
        value: '',
      };
    },
    template: `
  <div>
    <p>Value is '{{value}}'</p>
    <Autocomplete v-model="value" :getItems="getItems">
      <template slot="item" slot-scope="props">
        <p style="color: red;">{{props.item}} {{props.item.length}}</p>
      </template>
    </Autocomplete>
  </div>
  `,
  }),
);

storiesOf('Autocomplete', module).add('Object example with template', () => ({
  components: { Autocomplete },
  methods: {
    getItems(text) {
      if (!text) return Promise.resolve([]);

      return getPromise().then(currency =>
        currency.filter(c =>
          c.name.toLowerCase().startsWith(text.toLowerCase()),
        ),
      );
    },
    getTextFromItem(item) {
      return item.name;
    },
  },
  data() {
    return {
      value: '',
    };
  },
  template: `
  <div>
    <p>Value is '{{value}}'</p>
    <Autocomplete v-model="value" :getItems="getItems" :getTextFromItem="getTextFromItem">
      <template slot="item" slot-scope="props">
        <p>{{props.item.name}} <b>({{props.item.value}})</b></p>
      </template>
    </Autocomplete>
  </div>
  `,
}));

class AbortablePromise {
  constructor(promise) {
    this._promise = promise;
  }

  then() {
    return this._promise.then;
  }

  abort() {
    console.log('aborted');
  }
}

storiesOf('Autocomplete', module).add('Example with abortable promise', () => ({
  components: { Autocomplete },
  methods: {
    getItems(text) {
      if (!text) return Promise.resolve([]);
      console.log(text);
      const p = getPromise().then(currency =>
        currency
          .filter(c => c.name.toLowerCase().startsWith(text.toLowerCase()))
          .map(c => c.name),
      );

      return {
        abort() {
          this.aborted = true;
          console.log('abort');
        },
        then(...args) {
          return p.then(...args);
        },
      };
    },
  },
  data() {
    return {
      value: '',
    };
  },
  template: `
  <div>
    <p>Value is '{{value}}'</p>
    <Autocomplete v-model="value" :getItems="getItems">
    </Autocomplete>
  </div>
  `,
}));

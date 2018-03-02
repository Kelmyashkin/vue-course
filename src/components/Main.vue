<template>
  <div class="hello">
    <p>{{value}}</p>
    <!-- <Autocomplete v-model="value" :getItems="getItems">
      <template slot="item" slot-scope="props">
        <p>{{props.item.name}} <b>({{props.item.value}})</b></p>
      </template>
    </Autocomplete> -->
    <div class="list">
      <crypto-currency-widget :name="c" v-for="c in list" :key="c" />
    </div>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete/Autocomplete.vue';
import CryptoCurrencyWidget from './CryptoCurrencyWidget/CryptoCurrencyWidget.vue';

export default {
  name: 'Main',
  components: { Autocomplete, CryptoCurrencyWidget },
  data() {
    return {
      value: '',
      list: ['BTC', 'ETH', 'LTC', 'TRX', 'NEO', 'BCH', 'XRP', 'ETC', 'BNB'],
    };
  },
  methods: {
    getItems(text) {
      // todo cancelable
      if (!text) return Promise.resolve([]);
      return new Promise(resolve => {
        setTimeout(() => {
          const array = [
            { name: 'Aaaabb', value: 111.11 },
            { name: 'BlaBlaBla', value: 122.11 },
            { name: 'bbbbbbbb', value: 13.11 },
            { name: 'Dadadada', value: 44.11 },
          ];
          resolve(
            array.filter(item =>
              item.value.toLowerCase().startsWith(text.toLowerCase()),
            ),
          );
        }, 100);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

<template>
  <div class="widget"> 
    <div class="loading" v-if="isLoading">
        <img src="./../../assets/ajax-loader.gif" alt="Loading...">
    </div>
    <div class="container" v-else>
        <h2>{{name}} - USD</h2>

        <p>
            <currency-value :value="value" />
            <currency-delta :value="value" />
        </p>
        
        <currency-graph :value="value" :width="300" :height="150" :listSize="20" />
    </div>
  </div>
</template>

<script>
import CurrencyValue from '../CurrencyValue/CurrencyValue.vue';
import CurrencyDelta from '../CurrencyDelta/CurrencyDelta.vue';
import CurrencyGraph from '../CurrencyGraph/CurrencyGraph.vue';

import api from './../../api/currencyWebsocketAPI';

export default {
  name: 'CryptoCurrencyWidget',
  components: { CurrencyValue, CurrencyDelta, CurrencyGraph },
  props: {
    name: String,
  },
  data() {
    return {
      isLoading: true,
      value: 0,
    };
  },
  mounted() {
    api.subscribe(this.name, this.addNewValue);
  },
  beforeDestroy() {
    api.unsubscribe(this.name, this.addNewValue);
  },
  methods: {
    addNewValue(value) {
      this.isLoading = false;
      this.value = value;
    },
  },
};
</script>

<style scoped>
.widget {
  width: 320px;
  height: 250px;
  margin: 2px;
  border: 3px solid #e0e6ef;
  border-radius: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
h2 {
  margin: 0;
}
/* .current {
  font-size: 20px;
  font-weight: 600;
  color: #3ade07;
}
.delta {
  color: #3ade07;
}
.down {
  color: #a11a09;
} */
</style>

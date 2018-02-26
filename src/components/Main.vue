<template>
  <div class="hello">
    <p>{{value}}</p>
    <Autocomplete v-model="value" :getItems="getItems">
      <template slot="item" slot-scope="props">
        <p>{{props.item.value}} <b>({{props.item.number}})</b></p>
      </template>
    </Autocomplete>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete/Autocomplete.vue';

export default {
  name: 'Main',
  components: { Autocomplete },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    getItems(text) {
      // todo cancelable
      if (!text) return Promise.resolve([]);
      return new Promise(resolve => {
        setTimeout(() => {
          const array = [
            { value: 'Aaaabb', number: 111.11 },
            { value: 'BlaBlaBla', number: 122.11 },
            { value: 'bbbbbbbb', number: 13.11 },
            { value: 'Dadadada', number: 44.11 },
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

</style>

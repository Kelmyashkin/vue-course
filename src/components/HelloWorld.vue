<template>
  <div class="hello">
    <autocomplete v-model="value" :getItems="getItems">
      
    </autocomplete>
  </div>
</template>

<script>
import autocomplete from './Autocomplete';

export default {
  name: 'HelloWorld',
  components: { autocomplete },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    value(newValue, oldValue) {
      console.log('newValue, oldValue: ', newValue, oldValue);
    },
  },
  methods: {
    getItems(text) {
      if (!text) return Promise.resolve([]);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('timeout');
          let array = [
            { value: 'Aaaabb' },
            { value: 'BlaBlaBla' },
            { value: 'bbbbbbbb' },
            { value: 'Dadadada' },
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

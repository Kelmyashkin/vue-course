<template>
    <div class="root">
        <input class="field" type="text" v-model="text" @input="input(text)" @blur="clear" />
        <div class="result" v-show="result.length">
          <div v-for="item in result" :key="item.value" @click="choose(item)">
            <slot name="item" :item="item">
              <p>
                {{item.value}}
              </p>
            </slot>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'autocomplete',
  props: {
    value: String,
    getItems: Function,
  },
  data() {
    return {
      text: '',
      result: [],
    };
  },
  methods: {
    clear() {
      console.log('clear: ');
      this.text = '';
    },
    input(text) {
      // eslint-disable-next-line arrow-parens
      this.getItems(text).then(list => {
        console.log('list: ', list);

        this.result = list;
      });
    },
    choose(item) {
      this.text = item.value;
      this.result = [];
      console.log('choosed item: ', item);
      this.$emit('input', item.value);
    },
  },
};
</script>

<style scoped>
.field {
  border: 1px solid silver;
  outline: none;
  margin: 0;
  background: #fff;
}

.result {
  border: 1px solid silver;
  border-top: 0;
  position: absolute;
  overflow: auto;
  max-height: 93px;
  background: #fff;
}

.field,
.result {
  width: 200px;
  box-sizing: border-box;
}

.field,
.result p {
  padding: 4px;
  margin: 0;
  color: #000;
}

.result p:nth-child(2n + 1) {
  background: #f6f6f6;
}

.result p:hover {
  background: #e5e5e5;
}
</style>

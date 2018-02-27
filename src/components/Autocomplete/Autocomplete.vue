<template>
    <div class="root">
        <p>currentText is '{{currentText}}'</p>
        <p>isChoosed is '{{isChoosed}}'</p>
        <input class="field" type="text" v-model="currentText" @input="edit" @blur="clear" />
        <div class="result" v-show="result.length">
          <div v-for="item in result" :key="item.value" @click="choose(item)">
            <slot name="item" :item="item">
              <p>
                {{item}}
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
    value: [Object, String],
    getItems: Function,
  },
  data() {
    return {
      currentText: '',
      isChoosed: false,
      result: [],
    };
  },
  methods: {
    clear() {
      if (!this.isChoosed) {
        this.currentText = '';
      }
    },
    edit(event) {
      this.isChoosed = false;
      // eslint-disable-next-line arrow-parens

      this.getItems(event.data).then(list => {
        this.result = list;
      });
    },
    choose(item) {
      // todo ask what to show in input on choose
      this.currentText =
        typeof item === 'string' ? item : item.value || item.name;
      this.result = [];
      this.isChoosed = true;
      this.$emit('input', item);
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
.result > * {
  padding: 4px;
  margin: 0;
  color: #000;
}

.result > *:nth-child(2n + 1) {
  background: #f6f6f6;
}

.result > *:hover {
  background: #e5e5e5;
}
</style>

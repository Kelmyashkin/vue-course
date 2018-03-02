<template>
    <span :class="{ decreased: value < forCompare }"> 
      ${{format(value)}}
    </span>
</template>

<script>
import formatValueMixin from '../../mixins/formatValueMixin';

export default {
  name: 'CurrencyValue',
  mixins: [formatValueMixin],
  props: {
    value: Number,
  },
  data() {
    return {
      forCompare: 0,
    };
  },
  mount() {
    this.forCompare = this.value;
  },
  watch: {
    value(newValue, oldValue) {
      this.forCompare = oldValue;
    },
  },
};
</script>

<style scoped>
span {
  color: #3ade07;
}
.decreased {
  color: #a11a09;
}
</style>

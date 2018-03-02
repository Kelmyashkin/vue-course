<template>
    <span :class="{ decreased: value < forCompare }"> 
      ({{format(delta)}}%)
    </span>
</template>

<script>
import formatValueMixin from '../../mixins/formatValueMixin';

export default {
  name: 'CurrencyDelta',
  mixins: [formatValueMixin],
  props: {
    value: Number,
  },
  data() {
    return {
      forCompare: 0,
    };
  },
  mounted() {
    this.forCompare = this.value;
  },
  computed: {
    delta() {
      const delta = (this.value - this.forCompare) / this.forCompare;

      return Number.isFinite(delta) && !Number.isNaN(delta) ? delta * 100 : 0;
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

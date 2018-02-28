<template>
    <span :class="{ decreased: value < forCompare }"> 
      ({{format}}%)
    </span>
</template>

<script>
import compareValueMixin from '../../mixins/compareValueMixin';
import formatValueMixin from '../../mixins/formatValueMixin';

export default {
  name: 'CurrencyDelta',
  mixins: [compareValueMixin, formatValueMixin],
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

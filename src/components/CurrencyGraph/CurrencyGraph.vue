<template>
  <div>
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
      <path :d="line" stroke="#a11a09" stroke-width="3" fill="none" />
      <path :d="polygon" stroke="none" fill="#daa49d" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CurrencyGraph',
  props: {
    value: Number,
    listSize: { type: Number, default: 20 },
    width: {
      type: Number,
      default: 300,
    },
    height: { type: Number, default: 150 },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    value(val) {
      this.list.push(val);
    },
  },
  computed: {
    linePoints() {
      if (this.list.length > 1) {
        const min = Math.min(...this.list);
        const max = Math.max(...this.list);
        const xStep = this.width / (this.listSize - 1);
        const xFirst = (this.listSize - this.list.length) * xStep;
        const yFactor = this.height / (max - min);
        const ys = this.list.map(point => yFactor * (point - min));

        return ys.map((y, i) => ({
          x: xStep * i + xFirst,
          y: this.height - y,
        }));
      }
      return [];
    },
    line() {
      return this.linePoints
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`,
        )
        .join(' ');
    },
    polygon() {
      let result = '';
      const polygon = this.linePoints;

      polygon.push({ x: this.width, y: this.height });
      polygon.push({ x: Math.min(...polygon.map(p => p.x)), y: this.height });

      result = polygon
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`,
        )
        .join(' ');
      result += ' Z';
      return result;
    },
  },
};
</script>

<style scoped>

</style>

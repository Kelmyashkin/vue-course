export default {
  props: {
    value: Number,
  },
  computed: {
    format() {
      return this.value.toFixed(2);
    },
  },
};

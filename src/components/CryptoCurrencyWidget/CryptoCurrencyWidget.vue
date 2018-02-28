<template>
  <div class="widget"> 
    <div class="loading" v-if="isLoading">
        <img src="./../../assets/ajax-loader.gif" alt="Loading...">
    </div>
    <div class="container" v-else>
        <h2>{{name}} - USD</h2>
        <p>
            <span :class="{ current: true, down: isDecreasedLast }">{{formatPrice(current)}}</span> 
            <span :class="{ delta: true, down: isDecreasedAll }">({{formatPrice(delta)}})</span>
        </p>

        <svg ref="graph" width="300" height="150" xmlns="http://www.w3.org/2000/svg">
            <path :d="path" stroke="#a11a09" stroke-width="3" fill="none" />
            <path :d="pathDown" stroke="none" fill="#daa49d" />
            <path d="M0 150 L300 150" stroke="#215221" stroke-width="2" />
        </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CryptoCurrencyWidget',
  props: {
    name: String,
    listSize: { type: Number, default: 20 },
  },
  data() {
    return {
      isLoading: true,
      isDecreasedLast: false,
      first: 0,
      list: [],
    };
  },
  beforeCreate() {
    console.log('beforeCreate: ', this.$refs.graph);
  },
  created() {
    console.log('created: ', this.$refs.graph);
  },
  beforeMount() {
    console.log('beforeMount: ', this.$refs.graph);
  },
  mounted() {
    console.log('mounted', this.$refs.graph);
    setTimeout(() => {
      this.isLoading = false;
      this.addNewValue(10000);
      this.interval = setInterval(() => {
        this.addNewValue(this.current + Math.random() * 1000 - 500);
      }, 2000);
    }, 0);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    current() {
      return this.list[this.list.length - 1] || 0;
    },
    delta() {
      return (this.current - this.first) / this.first;
    },
    isDecreasedAll() {
      return this.current < this.first;
    },
    line() {
      console.log('line', this.$refs.graph);
      if (this.list.length) {
        const svg = this.$refs.graph;
        // this.$refs.graph;
        const width = svg ? svg.getBBox().width : 300;
        const height = svg ? svg.getBBox().height : 150;
        const xStep = width / (this.listSize - 1);
        const yHeight = height;
        const min = Math.min(...this.list);
        const max = Math.max(...this.list);
        const yFactor = yHeight / (max - min);
        const xFirst = (this.listSize - this.list.length) * xStep;
        const ys = this.list.map(point => yFactor * (point - min));

        return ys.map((y, i) => ({
          x: xStep * i + xFirst,
          y: height - y,
        }));
      }
      return [];
    },
    path() {
      console.log('path', this.$refs.graph);
      return this.line
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`,
        )
        .join(' ');
    },
    pathDown() {
      console.log('pathDown', this.$refs.graph);
      const polygon = this.line;
      const svg = this.$refs.graph;
      let result = '';
      if (svg) {
        const { width, height } = svg.getBBox();
        polygon.push({ x: width, y: height });
        polygon.push({ x: Math.min(...polygon.map(p => p.x)), y: height });

        result = polygon
          .map(
            (point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`,
          )
          .join(' ');
        result += ' Z';
      }
      return result;
    },
  },
  methods: {
    addNewValue(value) {
      if (!this.first) this.first = value;

      this.isDecreasedLast = this.current > value;

      if (this.list.length >= this.listSize) {
        this.list.shift();
      }
      this.list.push(value);
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
.current {
  font-size: 20px;
  font-weight: 600;
  color: #3ade07;
}
.delta {
  color: #3ade07;
}
.down {
  color: #a11a09;
}
</style>

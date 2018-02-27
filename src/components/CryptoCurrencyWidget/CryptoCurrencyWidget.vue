<template>
  <div class="widget"> 
    <div v-if="!isLoading">
        <h2>{{name}} - USD</h2>
        <p><span class="current">{{current}}</span> <span class="delta">({{delta}})</span></p>

        <p>{{list}}</p>
        <!-- <svg></svg> -->
    </div>
 
  </div>
</template>

<script>
export default {
  name: 'CryptoCurrencyWidget',
  props: {
    name: String,
    lastX: { type: Number, default: 10 },
  },

  data() {
    return {
      isLoading: true,
      current: 0,
      first: 0,
      delta: 0,
      list: [],
    };
  },
  mounted() {
    setTimeout(() => {}, 2000);
  },
  computed: {
    path() {},
  },
  method: {
    addNewValue(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.widget {
  width: 300px;
}
h2 {
}
</style>

<template>
  <svg ref="graph" width="300" height="150" xmlns="http://www.w3.org/2000/svg">
    <path :d="path" stroke="#a11a09" stroke-width="3" fill="none" />
    <path :d="pathDown" stroke="none" fill="#daa49d" />
    <path d="M0 150 L300 150" stroke="#215221" stroke-width="2" />
  </svg>
</template>

<script>
export default {
  name: 'CurrencyGraph',
};
</script>

<style scoped>

</style>

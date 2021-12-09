<template>
  <section class="dashboard">
    <cards-chart :board="board" />
    <cards-chart :board="board" />
    <cards-chart :board="board" />
    <cards-chart :board="board" />
  </section>
</template>

<script>
import cardsChart from './cards-chart.cmp.vue';
export default {
  props: {
    board: {
      type: Object,
    },
  },
  components: {
    cardsChart,
  },
  computed: {
    getAllActivities() {
      debugger;
      const statistics = this.$store.getters.statistics;
      var a = statistic.data.reduce(acc, (dt) => (acc += dt));
      return a;
    },
  },
};
</script>

<style>
.dashboard {
  position: fixed;
  display: flex;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-wrap: wrap;
  width: 600px;
  z-index: 100;
  background-color: cadetblue;
}

.dashboard > * {
  width: 300px;
}
</style>

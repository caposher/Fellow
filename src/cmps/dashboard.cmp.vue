<template>
  <section v-if="showDashboard" class="dashboard">
    <span @click="$emit('close')" class="icon-md icon-close"></span>
    <h2>Dashboard</h2>
    <section class="chart-wrapper">
      <activities-chart :stat="allActivities" :colors="colorSet" :title="'All activities'" :fillArea="true" />
      <activities-chart :stat="activitiesStat" :colors="colorSet" :title="'Activities types'" />
      <users-chart :title="'Cards per user'" />
      <cards-chart :stat="cardsStat" :colors="colorSet" :title="'Cards per list'" />
    </section>
  </section>
</template>

<script>
import cardsChart from './cards-chart.cmp.vue';
import activitiesChart from './activities-chart.cmp';
import usersChart from './users-chart.cmp';
export default {
  props: {
    board: { type: Object },
    showDashboard: {
      type: Boolean,
    },
  },
  data() {
    return {
      colorSet: [
        '#548EEB',
        '#3E67AB',
        '#27416B',
        '#4B7FC5',
        '#4D49AB',
        '#302E6B',
        '#6965EB',
        '#5996F7',
        '#6F6AF7',
        '#5E59D1',
      ],
      intervalId1: null,
      intervalId2: null,
      statistics: [],
    };
  },
  created() {
    let times = 0;
    this.intervalId1 = setInterval(() => {
      times += 5;
      this.getStat(times);
    }, 5000);

    //create demo data
    this.intervalId2 = setInterval(() => {
      this.$store.dispatch({ type: 'updateStat' });
    }, 1000);
  },
  destroyed() {
    clearInterval(this.intervalId1);
    clearInterval(this.intervalId2);
  },
  methods: {
    getStat(times) {
      let stat = { snapShot: [], status: [] };
      stat.snapShot = times;
      stat.status = this.$store.getters.getStatistics;
      this.statistics.push(stat);
      if (this.statistics.length > 20) this.statistics.shift();
    },
  },
  computed: {
    cardsStat() {
      let params = { labels: [], data: [] };
      params.labels = this.board.lists.map((list) => list.title);
      params.data = this.board.lists.map((list) => list.cards.length);
      return params;
    },
    activitiesStat() {
      let params = { labels: [], data: [] };
      // params.labels = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
      // params.data = [
      //   {
      //     label: 'Deletes',
      //     data: [100, 20, 15, 50, 67, 43, 100, 156, 312, 12],
      //   },
      //   {
      //     label: 'Additions',
      //     data: [200, 120, 115, 150, 167, 143, 110, 116, 112, 112],
      //   },
      //   {
      //     label: 'Updates',
      //     data: [10, 2, 5, 5, 67, 43, 100, 15, 32, 12],
      //   },
      // ];
      params.labels = this.statistics.map((snap) => snap.snapShot);
      params.data[0] = { label: 'Removed', data: this.statistics.map((snap) => snap.status.removed) };
      params.data[1] = { label: 'Created', data: this.statistics.map((snap) => snap.status.created) };
      params.data[2] = { label: 'Refresh', data: this.statistics.map((snap) => snap.status.refresh) };
      params.data[3] = { label: 'Updated', data: this.statistics.map((snap) => snap.status.updated) };
      return params;
    },
    allActivities() {
      let params = { labels: [], data: [] };
      params.labels = this.statistics.map((snap) => snap.snapShot);
      params.data = [{ label: 'activity', data: this.statistics.map((snap) => snap.status.total) }];
      return params;
    },
  },
  components: {
    cardsChart,
    activitiesChart,
    usersChart,
  },
};
</script>

<style></style>

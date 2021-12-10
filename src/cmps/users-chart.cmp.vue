<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['Osher Cappelli', 'Oshra Hartuv', 'Adam Bercovich', 'Jojo Gonzalis', 'Shuki Ben David'],
        datasets: [
          {
            label: 'Cards per user',
            backgroundColor: ['#548EEB', '#738AAE', '#39609E', '#9BB9EB', '#27416B'],
            data: [23, 15, 22, 43, 4],
          },
        ],
      },
      {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: this.title,
        },
        title: {
          display: true,
          text: this.title,
        },
        responsive: true,
      }
    );
  },
  props: {
    board: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  methods: {
    prepareLabels() {
      return this.board.lists.map((list) => list.title);
    },
    prepareData() {
      return this.board.lists.map((list) => list.cards.length);
    },
  },
};
</script>

<style></style>

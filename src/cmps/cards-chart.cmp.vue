<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.prepareLabels(),
      datasets: [
        {
          label: 'Cards per List',
          backgroundColor: '#f87979',
          data: this.prepareData(),
        },
      ],
    });
  },
  props: {
    board: {
      type: Object,
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

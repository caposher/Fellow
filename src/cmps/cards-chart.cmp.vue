<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  mounted() {
    // Overwriting base render method with actual data.
    this.reRenderChart();
  },
  props: {
    stat: {
      type: Object,
    },
    colors: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  methods: {
    reRenderChart() {
      this.renderChart(
        {
          labels: this.stat.labels,
          datasets: [
            {
              backgroundColor: this.setColors,
              label: 'Cards per List',
              borderAlign: 'center',
              borderColor: '#fff5',

              color: 'white',
              // backgroundColor: '#f87979',
              data: this.stat.data,
            },
          ],
        },
        {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: this.title,
          },
          responsive: true,
        }
      );
    },
  },
  computed: {
    setColors() {
      const colorLength = this.colors.length;
      return this.stat.data.map((data, idx) => this.colors[idx % colorLength]);
    },
  },
  watch: {
    stat: function () {
      this.reRenderChart();
    },
  },
};
</script>

<style></style>

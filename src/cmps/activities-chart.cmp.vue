<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  mounted() {
    // Overwriting base render method with actual data.
    this.reRenderChart();
  },
  props: {
    colors: {
      type: Array,
    },
    stat: {
      type: Object,
    },
    fillArea: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  computed: {
    setColorLine() {
      const data = JSON.parse(JSON.stringify(this.stat.data));
      const colorCount = this.colors.length;
      data.forEach((dt, idx) => {
        dt.borderColor = this.colors[idx % colorCount];
        dt.backgroundColor = this.fillArea ? dt.borderColor + 99 : 'rgb(0,0,0,0)';
      });
      return data;
    },
  },
  methods: {
    reRenderChart() {
      this.renderChart(
        {
          labels: this.stat.labels,
          datasets: this.setColorLine,
        },
        {
          legend: { position: 'bottom', labels: { defaultFontSize: 8 } },
          title: {
            display: true,
            text: this.title,
          },
          responsive: true,
        }
      );
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

<template>
  <section class="card-labels">
    <h4>Labels</h4>
    <button>X</button>
    <hr />
    <input type="text" placeholder="Search labels..." />
    <p>Labels</p>
    <label v-for="label in allLabels" :key="label.id" :class="label.colorClass">
      <span>{{ label.txt }}</span>
      <input type="checkbox" :checked="checkLabel(label.id)" @change="toggleCheck(label.id)" />
    </label>

    <label class="label-purple"> </label>
    <button>Create a new label</button>
    <hr />
    <pre v-for="label in allLabels" :key="label.id">{{ label }} {{ selected }}</pre>
  </section>
</template>

<script>
export default {
  props: {
    cardLabel: {
      type: Array,
    },
  },
  data() {
    return {
      selected: JSON.parse(JSON.stringify(this.cardLabel)),
      allLabels: this.$store.getters.labels,
    };
  },
  methods: {
    checkLabel(labelId) {
      var a = 0 <= this.selected.findIndex((label) => label.id === labelId);
      console.log('label', a);
      return a;
    },
    toggleCheck(labelId) {
      debugger;
      const idx = this.selected.findIndex((label) => label.id === labelId);
      0 <= idx ? this.selected.splice(idx, 1) : this.selected.push(labelId);
    },
  },
};
</script>

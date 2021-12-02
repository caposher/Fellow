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
    <pre v-for="label in allLabels" :key="label.id">{{ label }} {{ selectedIds }}</pre>
  </section>
</template>

<script>
export default {
  props: {
    cardLabels: {
      type: Array,
    },
  },
  data() {
    return {
      selectedIds: JSON.parse(JSON.stringify(this.cardLabels)),
      allLabels: this.$store.getters.labels,
    };
  },
  methods: {
    checkLabel(labelId) {
      var a = 0 <= this.selectedIds.findIndex((lId) => lId === labelId);
      console.log('label', a);
      return a;
    },
    toggleCheck(labelId) {
      const idx = this.selectedIds.findIndex((lId) => lId === labelId);
      0 <= idx ? this.selectedIds.splice(idx, 1) : this.selectedIds.push(labelId);
      this.$emit('update', JSON.parse(JSON.stringify(this.selectedIds)));
    },
  },
};
</script>

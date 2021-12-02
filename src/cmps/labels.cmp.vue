<template>
  <section class="labels-popup">
    <h4>Labels</h4>
    <button @click="$emit('close')">X</button>
    <hr />
    <input type="text" placeholder="Search labels..." />
    <p>Labels</p>
    <label v-for="(label, idx) in allLabels" :key="label.id" :class="label.colorClass">
      <span>{{ label.txt }}</span>
      <input type="checkbox" :checked="checkLabel(label.id)" @change="toggleCheck(label.id, idx)" />
    </label>

    <label class="label-purple"> </label>
    <button>Create a new label</button>
    <hr />
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
      return 0 <= this.selectedIds.findIndex((lId) => lId === labelId);
    },
    toggleCheck(labelId, posIdx) {
      const idx = this.selectedIds.findIndex((lId) => lId === labelId);
      0 <= idx ? this.selectedIds.splice(idx, 1) : this.selectedIds.splice(posIdx, 0, labelId);
      this.$emit('update', JSON.parse(JSON.stringify(this.selectedIds)));
    },
  },
};
</script>

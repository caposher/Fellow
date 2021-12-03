<template>
  <section class="card-popup label-popup">
    <header class="popup-header">
      <h4>Labels</h4>
      <div @click="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
      <!-- <button class="close-label-popup" @click="$emit('close')">X</button> -->
    </header>
    <input type="text" placeholder="Search labels..." />
    <form @submit.prevent="addCheckList">
      <h5>Labels</h5>

      <section
        class="label-picker"
        v-for="(label, idx) in allLabels"
        :key="label.id"
        @change="toggleCheck(label.id, idx)"
      >
        <div :class="setColor(label.colorClass)">
          <span>{{ label.txt }}</span>
          <input type="checkbox" :checked="checkLabel(label.id)" />
          <span v-show="checkLabel(label.id)" class="close-popup icon-sm icon-check"></span>
        </div>
        <span class="close-popup icon-sm icon-edit"></span>
      </section>
      <button class="action-btn">Create a new label</button>
    </form>
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
    setColor(colorClass) {
      return `${colorClass} ${colorClass}-lg`;
    },
  },
};
</script>

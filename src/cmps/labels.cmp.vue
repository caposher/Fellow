<template>
  <section class="card-popup label-popup">
    <section v-show="!isEditLabel">
      <header class="popup-header">
        <h4>Labels</h4>
        <div @click="$emit('close')">
          <span class="close-popup icon-md icon-close"></span>
        </div>
      </header>
      <input type="text" placeholder="Search labels..." />
      <form @submit.prevent="addLabel">
        <h5>Labels</h5>

        <section v-for="(label, idx) in allLabels" :key="label.id" @change="toggleCheck(label.id, idx)">
          <label class="label-picker">
            <div :class="setColor(label.colorClass)">
              <span class="label-name">{{ label.txt }}</span>
              <input type="checkbox" :checked="checkLabel(label.id)" />
              <span v-show="checkLabel(label.id)" class="close-popup icon-sm icon-check"></span>
            </div>
            <span class="edit-btn icon-sm icon-edit" @click="editLabel(label)"></span>
          </label>
        </section>

        <button class="action-btn">Create a new label</button>
      </form>
    </section>

    <section v-show="isEditLabel">
      <header class="popup-header">
        <h4>Change label</h4>
        <div @click="$emit('close')">
          <span class="close-popup icon-md icon-close"></span>
        </div>
      </header>
      <h5>Name</h5>
      <input type="text" />
      <h5>Select a color</h5>
      <section v-for="color in colorSet" :key="color" :style="{ backgroundColor: color }">
        <label class="label-picker">
          <input type="radio" :value="color" v-model="colorSelect" />
          {{ colorSelect }}
          {{ labelOnEdit }}
        </label>
      </section>
      <button class="action-btn" @click="updateLabel">Save</button>
      <button class="action-btn" @click="deleteLabel">Delete</button>
    </section>
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
      isEditLabel: false,
      labelOnEdit: '',
      colorSelect: '#61bd4f',
      colorSet: [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
      ],
    };
  },
  methods: {
    updateLabel() {},
    checkLabel(labelId) {
      return 0 <= this.selectedIds.findIndex((lId) => lId === labelId);
    },
    deleteLabel() {},
    toggleCheck(labelId, posIdx) {
      const idx = this.selectedIds.findIndex((lId) => lId === labelId);
      0 <= idx ? this.selectedIds.splice(idx, 1) : this.selectedIds.splice(posIdx, 0, labelId);
      this.$emit('update', JSON.parse(JSON.stringify(this.selectedIds)));
    },
    setColor(colorClass) {
      return `${colorClass} ${colorClass}-lg`;
    },
    editLabel(labelId) {
      debugger;
      isEditLabel = true;
      this.labelOnEdit = labelId;
    },
  },
};
</script>

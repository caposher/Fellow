<template>
  <card-preview :card="card" :list="list" :labelsState="$store.getters.labelsState"></card-preview>
</template>

<script>
import cardPreview from './card-preview.cmp.vue';
import { Draggable } from 'vue-smooth-dnd';
export default {
  props: {
    card: {
      type: Object,
    },
    list: {
      type: Object,
    },
  },
  components: {
    cardPreview,
    Draggable,
  },
};
</script>

<style></style>

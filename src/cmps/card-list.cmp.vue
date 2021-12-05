<template>
  <li>
    <!-- card preview gats card and mini-list-->
    <card-preview :card="card" :list="list" :labelsState="$store.getters.labelsState"></card-preview>
  </li>
</template>

<script>
import cardPreview from './card-preview.cmp.vue';

export default {
  props: {
    card: {
      type: Object,
    },
    list: {
      type: Object,
    },
    doDrag: {
      type: Boolean,
    },
  },
  components: {
    cardPreview,
  },
};
</script>

<style></style>

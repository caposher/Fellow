<template>
  <li>
    <!-- card preview gats card and mini-list-->
    <card-preview :card="card" :list="list"></card-preview>
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
  },
  methods: {},
  // props- card
  // props mini-list
  components: {
    cardPreview,
  },
};
</script>

<style></style>

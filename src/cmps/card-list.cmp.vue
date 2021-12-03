<template>
  <li>
    <!-- card preview gats card and mini-list-->
    <card-preview :card="card" :list="list"></card-preview>
    <!-- <card-preview class="card-drag" v-if="doDrag" :card="card" :list="list" @mousemove="dragCard"></card-preview> -->
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
  methods: {
    dragCard(ev) {
      // debugger;
    },
  },
  // props- card
  // props mini-list
  components: {
    cardPreview,
  },
};
</script>

<style></style>

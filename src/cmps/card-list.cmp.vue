<template>
  <li>
      <!-- card preview gats card and mini-list-->
    <card-preview></card-preview>
  </li>
</template>

<script>
import cardPreview from "./card-preview.cmp.vue";
// props- card
// props mini-list
export default {
  components: {
    cardPreview
  }
};
</script>

<style>
</style>
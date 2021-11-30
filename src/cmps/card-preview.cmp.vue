<template>
  <section @click="showDetails=true">
    <img class="card-cover" />
    <div>
      <!-- v-for labels -->
      <small>labels</small>
      <h4>Title</h4>
      <button>Quick edit</button>
    </div>
    <div class="card-icons"></div>
    <div class="card-members"></div>
    <!-- gets :card="card" +mini-list-->
    <card-details v-if="showDetails"></card-details>
  </section>
</template>

<script>
import cardDetails from "./card-details.cmp.vue";

// props: card
// props: mini-list
export default {
  data() {
    return {
      showDetails: false
    };
  },
  components: {
    cardDetails
  }
};
</script>

<style>
</style>
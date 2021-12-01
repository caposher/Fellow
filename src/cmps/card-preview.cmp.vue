<template>
  <section class="card" @click="showDetails">
    <!-- <img :url="" class="card-cover" /> -->
    <div>
      <!-- v-for labels -->
      <small>labels</small>
      <h4>{{ card.title }}</h4>
      <button>Quick edit</button>
    </div>
    <div class="card-icons"></div>
    <div class="card-members"></div>
    <!-- gets :card="card" +mini-list-->
    <!-- <card-details v-if="showDetails"></card-details> -->
  </section>
</template>

<script>
import cardDetails from './card-details.cmp.vue';
export default {
  props: {
    card: {
      type: Object,
    },
    list: {
      type: Object,
    },
  },
  // props: card
  // props: mini-list
  data() {
    return {
      // showDetails: false
    };
  },
  methods: {
    showDetails() {
      this.$router.push(this.$route.path + '/c/' + this.card.id);
      console.log(this.$route.path);
    },
  },
  components: {
    cardDetails,
  },
};
</script>

<style></style>

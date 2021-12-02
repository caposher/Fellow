<template>
  <section class="card" @click="showDetails">
    <!-- <img :url="" class="card-cover" /> -->
    <div>
      <!-- v-for labels -->
      <section>
        <span v-for="label in getLabels" :key="label.id" :class="label.colorClass" class="preview-label">
          {{ label.txt }}
        </span>
      </section>
      <p>{{ card.title }}</p>
      <button>Quick edit</button>
    </div>
    <div class="card-icons"></div>
    <div class="card-members"></div>
  </section>
</template>

<script>
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
  computed: {
    getLabels() {
      const allLabels = this.$store.getters.labels;
      const labelIds = this.card.labelIds;
      return labelIds.map((lId) => allLabels.find((label) => label.id === lId));
    },
  },
  components: {},
};
</script>

<style></style>

<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header.cmp.vue";

export default {
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
  },
  components: {
    appHeader,
  },
};
</script>

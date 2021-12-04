<template>
  <header class="board-header" v-if="board">
    <section>
      <span class="board-title">{{ board.title }}</span>
      <span><i class="icon-sm icon-star"></i></span>
      <span>Members</span>
      <button>Invite</button><button @click="deleteBoard">Delete Board</button>
    </section>
    <section>
      <button>Filter</button>
      <button>Show menu</button>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    deleteBoard() {
      this.$emit("deleteBoard");
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  computed: {
    board() {
      // console.log(this.$store.getters.board);
      return this.$store.getters.board;
    },
  },
};
</script>

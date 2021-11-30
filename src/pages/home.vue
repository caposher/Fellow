<template>
  <section class="home">
    <ul>
      <li v-for="board in boards" :key="board._id" @click="setBoard(board._id)">{{board.title}}</li>
      <li @click="createBoard">Add board</li>
    </ul>
  </section>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      user: null
    };
  },
  async created() {
    // get userId
    await this.$store.dispatch({ type: "loadBoards" });
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    }
  },
  methods: {
    async createBoard() {
      const title = prompt("add title");
       if(!title) return

      try {
        const board = await this.$store.dispatch({
          type: "createBoard",
          title
        });
        this.$router.push("/b/" + board._id);
      } catch (err) {
        console.log("cant get new board", err);
      }
    },
    async setBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
        this.$router.push("/b/" + boardId);
      } catch (err) {
        console.log("cant get board" + boardId, err);
      }
    }
  },
  components: {}
};
</script>

<template>
  <section>
    <board-header />
    <ul>
      <!-- v- for lists -->
      <!-- board-list gets list -->
      <li v-for="list in board.lists" :key="list.id">
        <board-list></board-list>
      </li>
    </ul>
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.cmp.vue";
import mainMenu from "../cmps/main-menu.cmp.vue";
import boardMenu from "../cmps/board-menu.cmp.vue";
import boardList from "../cmps/board-list.cmp.vue";
// gets board from store (by params) - loadBoard
// gets lists from board (board.lists)
export default {
  data() {
    return {
      board: null
    };
  },
  async created() {
    const { boardId } = this.$route.params;
    try {
      const board = await this.$store.dispatch({type: 'loadAndWatchBoard', boardId});
      this.board = board;
    } catch (err) {
      console.log("problem with getting toy in detailed", err);
    }
  },
  components: {
    boardHeader,
    boardMenu,
    mainMenu,
    boardList
  }
};
</script>

<style>
</style>
<template>
  <section v-if="board">
    <board-header />
    <ul>
      <li v-for="list in board.lists" :key="list.id">
        <board-list :list="list"></board-list>
      </li>
      <li @click="addList">Add list</li>
    </ul>
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.cmp.vue";
import mainMenu from "../cmps/main-menu.cmp.vue";
import boardMenu from "../cmps/board-menu.cmp.vue";
import boardList from "../cmps/board-list.cmp.vue";

export default {
  data() {
    return {
      // board: null
    };
  },
  async created() {
    const { boardId } = this.$route.params;
    console.log();
    try {
      await this.$store.dispatch({type: 'loadBoard',boardId});
      // console.log('board', board);
      // this.board = this.$store.getters.board
    } catch (err) {
      console.log("problem with getting board", err);
    }
  },
  computed: {
    board(){
      return this.$store.getters.board
    }
  },
  methods: {
    async addList() {
      const title = prompt("list title");
      if (!title) return;
      try {
        const board = await this.$store.dispatch({
          type: "addList",
          title,
          boardId: this.board._id
        })
        // this.board = board
      } catch (err) {
        console.log("cant add list", err);
      }
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
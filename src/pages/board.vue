<template>
  <section>
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
    return {};
  },
  computed: {
    board() {
      console.log(this.$store.getters.board);
      return this.$store.getters.board;
    }
  },
  methods: {
    async addList() {
      const title = prompt('list title')
      try{
        this.$store.dispatch({type:'addList', title, boardId:this.board._id})
      }
      catch(err){
        console.log('cant add list', err);
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
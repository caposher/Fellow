<template>
  <section>
    <board-header />
    <ul>
    <!-- v- for lists -->
    <!-- board-list gets list -->
    <board-list></board-list>
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
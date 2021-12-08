<template>
  <div id="app" :class="{ 'on-board': onBoard }" :style="appStyle">
    <!-- <app-header :class="{ 'blue-header': !onBoard }" /> -->
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header.cmp.vue";

export default {
  data() {
    return {
      onBoard: false
    };
  },
  created() {
    this.$store.dispatch({ type: "setUser" });
    this.$store.dispatch({ type: "loadUsers" });
  },
  watch: {
    "$route.params.boardId": {
      async handler() {
        const { boardId } = this.$route.params;
        if (boardId) {
          try {
            await this.$store.dispatch({ type: "loadBoard", boardId });
            this.onBoard = true;
          } catch (err) {
            console.log("problem with getting board", err);
          }
        } else {
          try {
            await this.$store.dispatch({ type: "loadBoard", boardId: "" });
            this.onBoard = false;
          } catch (err) {
            console.log("problem with getting board", err);
          }
        }
        // console.log(this.onBoard);
      },
      immediate: true
    }
  },
  methods: {},
  computed: {
    board() {
      var board = this.$store.getters.board;
      // if (board) {
      //   board.imgUrl = "/img/background1.jpg";
      // }
      return board;
    },
    appStyle() {
      if (!this.board) return;
      if (this.board.style.imgUrl)
        return {
          backgroundImage: `url("${this.board.style.imgUrl}")`
        };
      return {
          backgroundColor: this.board.style.bgColor
        };
    }
  },
  components: {}
};
</script>

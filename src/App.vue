<template>
  <div id="app" :class="{ 'on-board': onBoard }" :style="bgImage">
    <app-header :class="{ 'blue-header': !onBoard }" />
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
        console.log(this.onBoard);
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
      console.log("board", board);
      return board;
    },
    bgImage() {
      console.log("board", this.board);
      if (this.board) {
        let bgImage = require("@/assets" + this.board.style.imgUrl);
        // let bgImage = require("@/assets" + this.board.imgUrl);
        console.log("bgImage", bgImage);
        return {
          backgroundImage: `url("${bgImage}")`
        };
      }
    }
  },
  components: {
    appHeader
  }
};
</script>

<template>
  <header class="board-header" v-if="board">
    <section>
      <span class="board-title">{{ board.title }}</span>
      <span class="board-star"><i class="icon-sm icon-star"></i></span>
      <!-- <p> -->
      <Container
        tag="P"
        group-name="card-list"
        @drop="onDrop"
        @onDragStart="onDragStart()"
        :should-animate-drop="shouldAnimateDrop"
        behaviour="copy"
      >
        <Draggable v-for="(member, index) in membersToShow" :key="member.id">
          <avatar
            :style="{ 'z-index': board.members.length - index }"
            :username="member.fullname"
            :size="32"
            :lighten="200"
            :src="member.imgUrl"
            :title="member.fullname"
            class="draggable-item"
          />
        </Draggable>
        <button>Invite</button
        ><button @click="deleteBoard">Delete Board</button>
      </Container>
      <!-- </p> -->
    </section>
    <section>
      <button>Filter</button>
      <button @click="showMainMenu = true">Show menu</button>
      <main-menu v-show="showMainMenu" @close="showMainMenu = false" />
    </section>
  </header>
</template>

<script>
import Avatar from "vue-avatar";
import mainMenu from "@/cmps/main-menu.cmp.vue";
import { Container, Draggable } from "vue-smooth-dnd";
// import { applyDrag, generateItems } from "./utils";
export default {
  data() {
    return {
      showMainMenu: false,
    };
  },
  methods: {
    deleteBoard() {
      if (confirm("This action will delete the board! continue?"))
        this.$emit("deleteBoard");
    },
    onDragStart(dragResult) {
      // console.log("start", isSource, payload, willAcceptDrop);
      // const { isSource, payload, willAcceptDrop } = dragResult;
    },
    onDrop(dropResult) {
      // console.log("dropResult", dropResult);
      // this.items = applyDrag(this.items, dropResult);
    },
    shouldAnimateDrop(sourceContainerOptions, payload) {
      // console.log("shouldAnimateDrop");
      // console.log("sourceContainerOptions", sourceContainerOptions);
      // console.log("payload", payload);
      return false;
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    membersToShow() {
      return this.board.members.reverse();
    },
  },

  components: {
    mainMenu,
    Avatar,
    Container,
    Draggable,
  },
};
</script>

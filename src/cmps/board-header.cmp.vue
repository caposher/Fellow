<template>
  <header class="board-header" :class="{ 'main-menu-spacing': showMainMenu }" v-if="board">
    <section class="right header">
      <router-link to="/home" class="back-home" v-if="!editTitle">
        <span class="icon-md icon-back"></span>
      </router-link>
      <!--   -->
      <button
        class="close-small"
        v-if="editTitle"
        @click="closeEditTitle"
        :class="{'edit': this.editTitle}"
      >
        <span class="icon-close"></span>
      </button>
      <div
        @focus="editTitle = true"
        @blur="updateTitle"
        @keydown.enter="removeBr"
        contenteditable="true"
        ref="editBoardTitle"
        class="title"
      >{{ board.title }}</div>

      <div class="title-small-cont">
        <!-- @focus="saveLastTitle" -->
        <!-- @blur="updateTitle" -->
        <!-- @keydown.enter="removeBr" -->
        <!-- @blur="closeEditTitle" -->
        <div
          @click="openEditTitle"
          contenteditable="true"
          ref="smallEdit"
          class="title-small"
        >{{ board.title }}</div>
      </div>

      <span class="board-star bh-btn">
        <i class="icon-sm icon-star"></i>
      </span>
      <Container
        tag="P"
        group-name="card-list"
        @drop="onDrop"
        @onDragStart="onDragStart()"
        :should-animate-drop="shouldAnimateDrop"
        behaviour="copy"
        class="members"
      >
        <Draggable v-for="(member, index) in membersToShow" :key="member.id">
          <avatar
            :style="{ 'z-index': board.members.length - index }"
            :username="member.fullname"
            :size="28"
            :lighten="200"
            :src="member.imgUrl"
            :title="member.fullname"
            class="draggable-item"
          />
        </Draggable>
        <button @click="inviteMembers" class="bh-btn">Invite</button>
        <!-- <button @click="deleteBoard" class="bh-btn">Delete Board</button> -->
      </Container>
      <!-- </p> -->
    </section>
    <section>
      <!-- <button class="bh-btn">Filter</button> -->
      <button class="bh-btn show" v-if="!showMainMenu" @click="showMainMenu = true">Show menu</button>
      <button
        class="show-small"
        v-if="!showMainMenu && !editTitle"
        @click.stop.prevent="showMainMenu = true"
      >
        <span class="icon-sm icon-dots"></span>
      </button>
      <!--  -->
      <button
        class="title-small-check"
        @click="updateTitle"
        v-if="editTitle"
        :class="{'edit': this.editTitle}"
      >
        <span class="icon-check"></span>
      </button>
      <main-menu :class="mainMenuToggle" @deleteBoard="deleteBoard" @close="showMainMenu = false" />
    </section>
  </header>
</template>

<script>
import Avatar from "vue-avatar";
import mainMenu from "@/cmps/main-menu.cmp.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { focus } from "vue-focus";

// import { applyDrag, generateItems } from "./utils";
export default {
  directives: { focus },
  data() {
    return {
      showMainMenu: false,
      editTitle: false,
      lastTitle: "",
      isSmall: false
    };
  },
  mounted() {
    // this.$refs.editBoardTitle.innerText = this.board.title;
  },
  methods: {
    closeEditTitle() {
      this.board.title = this.lastTitle;
      this.$refs.smallEdit.innerText = this.board.title;
      this.editTitle = false;
      this.isSmall = false;
      this.$refs.smallEdit.blur();
    },
    openEditTitle() {
      this.lastTitle = this.board.title;
      this.editTitle = true;
      this.isSmall = true;
      this.$refs.smallEdit.focus();
    },
    removeBr() {
      this.$refs.editBoardTitle.blur();
    },
    updateTitle() {
      console.log(this.lastTitle);
      // if (!this.$refs.editBoardTitle.innerText) return;
      this.board.title = this.isSmall
        ? this.$refs.smallEdit.innerText
        : this.$refs.editBoardTitle.innerText;
      // console.log(this.$refs.editBoardTitle.innerText);
      // this.$refs.editBoardTitle.innerText;
      this.$emit("updateBoard", this.board);
      // this.$refs.smallEdit.innerText = this.$refs.editBoardTitle.innerText
      this.editTitle = false;
      this.isSmall = false
      // this.showMainMenu = false
    },
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
    inviteMembers() {
      const users = this.$store.getters.users;
      // console.log("users = ", users);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    membersToShow() {
      // return this.board.members.reverse();
      return this.board.members;
    },
    mainMenuToggle() {
      return this.showMainMenu ? "show-main-menu" : "hide-main-menu";
    }
  },

  components: {
    mainMenu,
    Avatar,
    Container,
    Draggable
  }
};
</script>

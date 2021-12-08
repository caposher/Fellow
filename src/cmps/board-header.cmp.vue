<template>
  <header class="board-header" :class="{ 'main-menu-spacing': showMainMenu }" v-if="board">
    <section>
      <!-- <span
        class="board-title"
        v-if="!editTitle"
        :style="{width: this.width ? this.width +'px': ''}"
        ref="boardTitle"
        @click="openEditTitle"
      >{{ board.title }}</span>-->
      <!-- 'display': editTitle ? 'block' : 'none' -->
      <!-- <textarea
        ref="editBoardTitle"
        @click="changeWidth"
        v-model="board.title"
        v-focus="editTitle"
      />-->
      <!-- @focus="$event.target.innerText.select()" -->
      <!-- @focus="$event.target.select()" -->
      <!-- v-focus="editTitle" -->
      <!-- v-else -->
      <div
        @focus="editTitle = true"
        @blur="updateTitle"
        @keydown.enter="removeBr"
        contenteditable="true"
        ref="editBoardTitle"
        class="title"
      ></div>

      <span class="board-star">
        <i class="icon-sm icon-star"></i>
      </span>
      <!-- <p>  -->
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
            :size="28"
            :lighten="200"
            :src="member.imgUrl"
            :title="member.fullname"
            class="draggable-item"
          />
        </Draggable>
        <button @click="inviteMembers">Invite</button><button @click="deleteBoard">Delete Board</button>
      </Container>
      <!-- </p> -->
    </section>
    <section>
      <button>Filter</button>
      <button v-if="!showMainMenu" @click="showMainMenu = true">Show menu</button>
      <main-menu :class="mainMenuToggle" @close="showMainMenu = false" />
    </section>
  </header>
</template>

<script>
import Avatar from 'vue-avatar';
import mainMenu from '@/cmps/main-menu.cmp.vue';
import { Container, Draggable } from 'vue-smooth-dnd';
import { focus } from 'vue-focus';

// import { applyDrag, generateItems } from "./utils";
export default {
  directives: { focus },
  data() {
    return {
      showMainMenu: false,
      editTitle: false,
    };
  },
  mounted() {
    this.$refs.editBoardTitle.innerText = this.board.title;
  },
  methods: {
    removeBr() {
      this.$refs.editBoardTitle.blur();
    },
    updateTitle() {
      if (!this.$refs.editBoardTitle.innerText) return
      console.log(this.$refs.editBoardTitle.innerText);
      this.board.title = this.$refs.editBoardTitle.innerText;
      this.$emit('updateBoard', this.board);
      this.editTitle = false;
    },
    deleteBoard() {
      if (confirm('This action will delete the board! continue?')) this.$emit('deleteBoard');
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
      console.log('users = ', users);
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    membersToShow() {
      return this.board.members.reverse();
    },
    mainMenuToggle() {
      return this.showMainMenu ? 'show-main-menu' : 'hide-main-menu';
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

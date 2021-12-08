<template>
  <header class="board-header" v-if="board">
    <section>
      <span
        class="board-title"
        @click="openEditTitle"
        ref="boardTitle"
      >{{ board.title }}
      </span>
        <!-- v-if="!editTitle" -->
        <!-- v-else -->
         <!-- 'display': editTitle ? 'block' : 'none'
      <textarea
        ref="editBoardTitle"
        @input="changeWidth"
        :style="{width: this.width +'px'}"
        v-model="board.title"
        v-focus="editTitle"
        @focus="$event.target.select()"
        @blur="updateBoard"
        @keydown.enter="updateBoard"
      /> -->
      <span class="board-star">
        <i class="icon-sm icon-star"></i>
      </span>
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
        <button @click="inviteMembers">Invite</button>
        <button @click="deleteBoard">Delete Board</button>
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
import { focus } from "vue-focus";

// import { applyDrag, generateItems } from "./utils";
export default {
  directives: { focus },
  data() {
    return {
      showMainMenu: false,
      editTitle: false,
      width: 0,
      scroll: 0
    };
  },
  mounted() {
    // this.width = this.$refs.boardTitle.clientWidth + "px";
  },
  methods: {
//     openEditTitle() {
//       this.width = this.$refs.boardTitle.clientWidth+1;
//       this.editTitle = true;
//       // this.scroll = this.$refs.editBoardTitle.scrollHeight
//       // console.log('myScroll',this.scroll);
//     },
//     changeWidth() {
//       const scroll = this.$refs.editBoardTitle.scrollHeight
// console.log('title', this.$refs.boardTitle.clientWidth);
//       console.log('scroll',scroll);
//       console.log('width', this.width);
//       if (!this.scroll) this.scroll = scroll
//       if (this.scroll === scroll) return 
//       this.scroll = scroll
//       // this.width = this.$refs.boardTitle.clientWidth+30
//       this.width = this.width +scroll
//     },
    updateBoard() {
      // console.log("update");
      this.editTitle = false;
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
      console.log("users = ", users);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    membersToShow() {
      return this.board.members.reverse();
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

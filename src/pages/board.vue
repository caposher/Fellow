<template>
  <section v-if="board" :class="{ 'display-modal': selectedCardId }" class="board-app">
    <app-header />
    <workspace-nav :boards="boards" @openBar="onOpenBar" />
    <!-- <container
      group-name="members"
          :get-child-payload="getChildPayload(JSON.parse(JSON.stringify(card)))"

    >-->
    <board-header
      @deleteBoard="deleteBoard"
      :class="{ 'nav-open': openBar, 'dark':board.style.isDark, 'light': !board.style.isDark
  }"
    />
    <div class="board-container" @mouseenter="scroll" ref="board">
      <Container
        :tag="'ul'"
        class="board smooth-dnd-container"
        orientation="horizontal"
        @drop="onColumnDrop($event)"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        drag-handle-selector=".drag-handle"
        :class="{ 'nav-open': openBar }"
      >
        <Draggable
          :tag="'li'"
          v-for="(list, idx) in board.lists"
          :key="list.id"
          class="list-wrapper"
        >
          <!--  -->
          <board-list
            :list="list"
            :idx="idx"
            @update="updateList"
            @updateBoard="updateBoard"
            @deleteList="deleteList"
            @unscroll="unscroll"
            @scroll="scroll"
          ></board-list>
        </Draggable>

        <div class="add-list-wrapper">
          <li
            class="new-list"
            @click="setAddList"
            :class="{ 'height-0': isAddList, 'dark':board.style.isDark, 'light': !board.style.isDark}
 "
          >
            <p>
              <span>
                <i class="icon-sm icon-plus"></i>
              </span>
              {{ addListText }}
            </p>
          </li>
          <li :class="{ 'height-0': !isAddList, 'add-list': isAddList }" class="list-add">
            <input
              type="text"
              ref="input"
              v-focus="isAddList"
              v-model="newListTitle"
              @keydown.enter="addList"
            />
            <div class="list-add-controls">
              <button class="submit-btn add-list-btn" @click="addList">Add List</button>
              <button>
                <span @click="isAddList = false" class="icon-close icon-lg close-add-btn"></span>
              </button>
            </div>
          </li>
        </div>
      </Container>
    </div>
    <router-view v-if="selectedCardId"></router-view>
  </section>
</template>

<script>
import appHeader from "../cmps/app-header.cmp.vue";
import boardHeader from "../cmps/board-header.cmp.vue";
import mainMenu from "../cmps/main-menu.cmp.vue";
import boardMenu from "../cmps/board-menu.cmp.vue";
import boardList from "../cmps/board-list.cmp.vue";
import workspaceNav from "../cmps/workspace-nav.cmp.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { focus } from "vue-focus";

export default {
  directives: { focus: focus },
  data() {
    return {
      selectedCardId: null,
      slider: null,
      isAddList: false,
      newListTitle: "",
      openBar: false,
      dragging: false
    };
  },
  watch: {
    "$route.params.cardId": {
      async handler() {
        const { cardId } = this.$route.params;
        const { boardId } = this.$route.params;
        if (cardId) {
          try {
            await this.$store.dispatch({
              type: "setListAndCard",
              boardId,
              cardId
            });
            this.selectedCardId = cardId;
          } catch (err) {
            console.log("problem with getting board", err);
          }
        } else {
          try {
            await this.$store.dispatch({
              type: "setListAndCard",
              boardId: "",
              cardId: ""
            });
            this.selectedCardId = null;
          } catch (err) {
            console.log("problem with getting board", err);
          }
        }
      },
      immediate: true
    },
    "$route.params.boardId": {
      async handler() {
        const { boardId } = this.$route.params;
        try {
          await this.$store.dispatch({
            type: "loadBoard",
            boardId
          });
        } catch (err) {
          console.log("problem with getting board", err);
        }
      },
      immediate: true
    }
  },
  async created() {
    const { boardId } = this.$route.params;
    try {
      await this.$store.dispatch({ type: "loadBoard", boardId });
      await this.$store.dispatch({ type: "loadBoards" });
      // console.log(this.$store.getters.boards);
    } catch (err) {
      console.log("problem with getting board", err);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    addListText() {
      return this.board.lists && this.board.lists.length
        ? "Add another list"
        : "Add a list";
    },
    boards() {
      return this.$store.getters.boards;
    }
  },
  methods: {
    setAddList() {
      this.isAddList = true;
      console.log("board", this.board);

      // this.$refs.titleInput.focus()
    },
    async addList() {
      const title = this.newListTitle;
      if (!title) return;
      try {
        await this.$store.dispatch({
          type: "addList",
          title,
          board: this.board
        });
        this.isAddList = false;
        this.newListTitle = "";
      } catch (err) {
        console.log("cant add list", err);
      }
    },

    async updateList(list) {
      try {
        await this.$store.dispatch({
          type: "updateList",
          list,
          board: this.board
        });
      } catch (err) {
        console.log("cant update list", err);
      }
    },
    async deleteList(list) {
      try {
        await this.$store.dispatch({
          type: "deleteList",
          list,
          board: this.board
        });
      } catch (err) {
        console.log("cant delete list", err);
      }
    },
    async updateBoard(board) {
      try {
        this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log("cant update board", err);
      }
    },
    async deleteBoard() {
      try {
        await this.$store.dispatch({
          type: "deleteBoard",
          boardId: this.board._id
        });
        this.$router.push("/home");
      } catch (err) {
        console.log("cant delete board", err);
      }
    },
    scroll(ev) {
      // if (this.dragging) return;
      const slider = this.$refs.board.firstChild;
      this.slider = slider;
      let isDown = false;
      let startX;
      let scrollLeft;
      this.dragging = false;

      slider.addEventListener("mousedown", e => {
        if (this.dragging) return;

        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    },

    onColumnDrop(dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult;
      const newBoard = this.$store.getters.board;
      if (removedIndex === null && addedIndex === null) return newBoard.lists;

      const newLists = [...this.board.lists];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = newBoard.lists.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        newBoard.lists.splice(addedIndex, 0, itemToAdd);
      }
      this.updateBoard(newBoard);
      return newBoard.lists;
    },

    applyDrag(arr, dragResult) {},

    unscroll() {
      if (!this.slider) return;
      this.dragging = true;
      this.slider.classList.remove("active");
    },
    onOpenBar(val) {
      this.openBar = val;
    }
  },
  components: {
    boardHeader,
    boardMenu,
    mainMenu,
    boardList,
    workspaceNav,
    focus,
    Container,
    Draggable,
    appHeader
  }
};
</script>

<style></style>

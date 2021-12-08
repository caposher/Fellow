<template>
  <section class="home" v-if="boards">
    <app-header class="blue-header" />

    <div class="menu">
      <nav>
        <div class="top-menu">
          <button class="action-btn">
            <span class="icon-wrapper">
              <span class="icon-sm icon-board"></span>
            </span>
            <span class="text">Boards</span>
          </button>
          <button class="action-btn">
            <span class="icon-wrapper">
              <span class="icon-sm icon-template-board"></span>
            </span>
            <span class="text">Templates</span>
          </button>
          <button class="action-btn">
            <span class="icon-wrapper">
              <span class="icon-sm icon-home"></span>
            </span>
            <span class="text">Home</span>
          </button>
        </div>
        <div class="bottom-menu">
          <div class="workspaces action-btn">
            <div class="add">
              <span class="text">Workspaces</span>
              <span class="icon-wrapper">
                <span class="icon-sm icon-plus"></span>
              </span>
            </div>
          </div>
          <div class="fellow">
            <div class="action-btn">
              <div>
                <span class="F-wrapper">
                  <span class="F">F</span>
                  <span>Fellow Workspaces</span>
                </span>
              </div>
              <span class="arrow icon-wrapper">
                <span class="fas fa-chevron-down"></span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="boards">
      <!-- <div class="templates">
        <ul class="templates-boards">
          <li
            v-for="board in boards"
            :key="board._id"
            @click="setBoard(board._id)"
          >{{ board.title }}</li>
          <li @click="createBoard">Add board</li>
        </ul>
      </div>
      <div class="recent">
        <ul class="recent-boards">
          <li
            v-for="board in boards"
            :key="board._id"
            @click="setBoard(board._id)"
          >{{ board.title }}</li>
          <li @click="createBoard">Add board</li>
        </ul>
      </div>-->
      <div class="workspaces">
        <header>
          <span>YOUR WORKSPACES</span>
        </header>
        <div class="main">
          <div class="nav">
            <span class="F-wrapper">
              <span class="F">F</span>
            </span>
            <div class="btns">
              <button class="action-btn">
                <span class="icon-wrapper">
                  <span class="icon-sm icon-board"></span>
                </span>
                <span class="text">Boards</span>
              </button>
              <button class="action-btn">
                <span class="icon-wrapper">
                  <span class="icon-sm icon-member"></span>
                </span>
                <span class="text">Members</span>
              </button>
              <button class="action-btn">
                <span class="icon-wrapper">
                  <span class="icon-sm icon-gear"></span>
                </span>
                <span class="text">Settings</span>
              </button>
            </div>
          </div>
          <ul class="workspaces-boards">
            <li
              v-for="board in boards"
              :key="board._id"
              :style="bgImage(board)"
              @click="setBoard(board._id)"
            >
              <span>{{ board.title }}</span>
            </li>
            <div class="add" @click.stop="onAddBoard = true">
              <div>Create new board</div>
              <div>{{ 10 - boards.length }} remaining</div>
            </div>
          </ul>
          <div
            class="add-board-screen"
            v-show="onAddBoard"
            @click.stop="onAddBoard = false"
          >
            <section class="add-board" @click.stop="">
              <div
                class="add-title"
                style="
                  background-color: rgb(0, 121, 191);
                  background-image: url('https://images.unsplash.com/photo-1632042704576-7ae3ef405c78?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjM4OTUxODI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=400');
                "
              >
                <input
                  v-focus="onAddBoard"
                  @focus="$event.target.select()"
                  spellcheck="false"
                  type="text"
                  class="_2C8dwcFUoIOCYP"
                  placeholder="Add board title"
                  value=""
                  ref="title"
                  @input="checkTitle"
                />
              </div>
              <button
                class="close _3eEh_cvwCUDPos MojEVyztONxhst"
                aria-label="Close"
                @click.stop="onAddBoard = false"
              >
                <span class="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa"
                  ><span
                    class="sc-bdVaJa kBFJig"
                    role="img"
                    aria-label="CloseIcon"
                    ><svg
                      width="24"
                      height="24"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                        fill="currentColor"
                      ></path></svg></span
                ></span>
              </button>
              <div>
                <button
                  class="submit"
                  type="button"
                  :class="{ disable: emptyTitle }"
                  @click="createBoard"
                >
                  Create board
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "@/cmps/app-header.cmp.vue";
import { focus } from "vue-focus";

export default {
  directives: { focus },

  name: "Home",
  data() {
    return {
      user: null,
      onAddBoard: false,
      emptyTitle: true,
    };
  },
  async created() {
    // get userId
    await this.$store.dispatch({ type: "loadBoards" });
  },
  computed: {
    boards() {
      var boards = this.$store.getters.boards;
      return boards;
    },
  },
  methods: {
    bgImage(board) {
      // console.log('board', board);
      if (board && board.style.imgUrl.includes("http")) {
        return {
          backgroundImage: `url("${board.style.imgUrl}")`,
        };
      }
    },
    checkTitle(ev) {
      if (ev.target.value) this.emptyTitle = false;
      else this.emptyTitle = true;
    },

    async createBoard() {
      if (this.emptyTitle) return;
      this.onAddBoard = false;
      const title = this.$refs.title.value;
      console.log("title", title);
      if (this.boards.length === 10) return;
      // // const title = prompt("add title");
      // if (!title) return;

      try {
        const board = await this.$store.dispatch({
          type: "createBoard",
          title,
        });
        this.$router.push("/b/" + board._id);
      } catch (err) {
        console.log("cant get new board", err);
      }
    },
    async setBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
        this.$router.push("/b/" + boardId);
      } catch (err) {
        console.log("cant get board" + boardId, err);
      }
    },
  },
  components: {
    appHeader,
  },
};
</script>

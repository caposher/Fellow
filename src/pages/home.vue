<template>
  <section class="home" v-if="boards">
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
            <div class="add" @click="createBoard">
              <div>Create new board</div>
              <div>{{ 10 - boards.length }} remaining</div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: null
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
    }
  },
  methods: {
    bgImage(board) {
      console.log("board", board);
      if (board) {
        let bgImage = require("@/assets" + board.style.imgUrl);
        console.log("bgImage", bgImage);
        return {
          backgroundImage: `url("${bgImage}")`
        };
      }
    },
    async createBoard() {
      if (this.boards.length === 10) return;
      const title = prompt("add title");
      if (!title) return;

      try {
        const board = await this.$store.dispatch({
          type: "createBoard",
          title
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
    }
  },
  components: {}
};
</script>

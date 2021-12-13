<template>
  <section>
    <!-- <div class="add" @click.stop="onAddBoard = true">
      <div>Create new board</div>
      <div>{{ 10 - boards.length }} remaining</div>
    </div>-->

    <div class="add-board-screen" @click.stop="close">
      <section class="add-board" @click.stop>
        <div
          class="add-title"
          style="
                    background-color: rgb(0, 121, 191);
                 
                    background-image: url('https://images.unsplash.com/photo-1599940824219-e6aa9be5fba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODA4Mzl8MHwxfHNlYXJjaHwyMXx8d29vZHN8ZW58MHx8fHwxNjM5NDA1OTYw&ixlib=rb-1.2.1&q=80&w=1080');
                  "
        >
          <input
            v-focus="onAddBoard"
            @focus="$event.target.select()"
            spellcheck="false"
            type="text"
            class="_2C8dwcFUoIOCYP"
            placeholder="Add board title"
            value
            ref="title"
            @input="checkTitle"
            @keydown.enter="createBoard"
          />
        </div>
        <button class="close _3eEh_cvwCUDPos MojEVyztONxhst" aria-label="Close" @click.stop="close">
          <span class="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa">
            <span class="sc-bdVaJa kBFJig" role="img" aria-label="CloseIcon">
              <svg
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
                />
              </svg>
            </span>
          </span>
        </button>
        <div>
          <button
            class="submit"
            type="button"
            :class="{ disable: emptyTitle }"
            @click="createBoard"
          >Create board</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { focus } from "vue-focus";

export default {
  directives: { focus },

  name: "Home",
  props: {
    onAddBoard: {
      type: Boolean
    }
  },
  data() {
    return {
      // onAddBoard: false,
      emptyTitle: true
    };
  },
  async created() {
    // this.onAddBoard = true;
  },
  computed: {
    boards() {
      var boards = this.$store.getters.boards;
      return boards;
    }
  },
  methods: {
    checkTitle(ev) {
      if (ev.target.value) this.emptyTitle = false;
      else this.emptyTitle = true;
    },
    close() {
      // this.onAddBoard = false;
      this.$emit("close");
    },

    async createBoard() {
      if (this.emptyTitle) return;
      // this.onAddBoard = false;
      const title = this.$refs.title.value;
      if (this.boards.length === 10) return;
      try {
        const board = await this.$store.dispatch({
          type: "createBoard",
          title
        });
        this.$emit("close");
        this.$router.push("/b/" + board._id);
      } catch (err) {
        console.log("cant get new board", err);
      }
    },
    async setBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "loadBoard", boardId });
        this.$router.push("/b/" + boardId);
      } catch (err) {
        console.log("cant get board" + boardId, err);
      }
    }
  },
  components: {}
};
</script>

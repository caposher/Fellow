<template>
  <section v-if="board" :class="{ 'display-modal': selectedCardId }" class="board-app">
    <board-header @deleteBoard="deleteBoard" />
    <ul class="board" @mouseenter="scroll">
      <li class="list-wrapper" v-for="(list, idx) in board.lists" :key="list.id" @mousedown.stop="unscroll">
        <board-list :list="list" :idx="idx" @update="updateList" @deleteList="deleteList"></board-list>
      </li>
      <!--  @click="addList" -->
      <!-- v-if="!isAddList" -->
      <div class="add-list-wrapper">
        <li class="list-wrapper new-list" @click="setAddList" :class="{ 'height-0': isAddList }">
          <p>
            <span>
              <i class="icon-sm icon-plus"></i>
            </span>
            {{ addListText }}
          </p>
        </li>
        <li :class="{ 'height-0': !isAddList, 'add-list': isAddList }" class="list-add list-wrapper">
          <input type="text" ref="input" v-focus="isAddList" @blur="addList" v-model="newListTitle" />
          <div class="list-add-controls">
            <button class="submit-btn add-list-btn" @click="addList">Add List</button>
            <button>
              <span @click="isAddList = false" class="icon-close icon-lg close-add-btn"></span>
            </button>
          </div>
        </li>
      </div>
    </ul>
    <router-view v-if="selectedCardId"></router-view>
  </section>
</template>

<script>
import boardHeader from '../cmps/board-header.cmp.vue';
import mainMenu from '../cmps/main-menu.cmp.vue';
import boardMenu from '../cmps/board-menu.cmp.vue';
import boardList from '../cmps/board-list.cmp.vue';
import { focus } from 'vue-focus';

export default {
  directives: { focus: focus },
  data() {
    return {
      selectedCardId: null,
      slider: null,
      isAddList: false,
      newListTitle: '',
    };
  },
  watch: {
    '$route.params.cardId': {
      async handler() {
        const { cardId } = this.$route.params;
        const { boardId } = this.$route.params;
        if (cardId) {
          try {
            await this.$store.dispatch({
              type: 'setListAndCard',
              boardId,
              cardId,
            });
            this.selectedCardId = cardId;
          } catch (err) {
            console.log('problem with getting board', err);
          }
        } else {
          try {
            await this.$store.dispatch({
              type: 'setListAndCard',
              boardId: '',
              cardId: '',
            });
            this.selectedCardId = null;
          } catch (err) {
            console.log('problem with getting board', err);
          }
        }
      },
      immediate: true,
    },
  },
  async created() {
    // this.scroll();
    const { boardId } = this.$route.params;
    console.log();
    try {
      await this.$store.dispatch({ type: 'loadBoard', boardId });
    } catch (err) {
      console.log('problem with getting board', err);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    addListText() {
      return this.board.lists && this.board.lists.length ? 'Add another list' : 'Add a list';
    },
  },
  methods: {
    setAddList() {
      this.isAddList = true;
      console.log(this.$refs);

      // this.$refs.titleInput.focus()
    },
    async addList() {
      const title = this.newListTitle;
      console.log(title);
      if (!title) return;
      try {
        await this.$store.dispatch({
          type: 'addList',
          title,
          board: this.board,
        });
        this.isAddList = false;
        this.newListTitle = '';
      } catch (err) {
        console.log('cant add list', err);
      }
    },

    async updateList(list) {
      try {
        await this.$store.dispatch({
          type: 'updateList',
          list,
          board: this.board,
        });
        console.log('list upated');
      } catch (err) {
        console.log('cant update list', err);
      }
    },
    async deleteList(list) {
      try {
        await this.$store.dispatch({
          type: 'deleteList',
          list,
          board: this.board,
        });
        // console.log('delete list');
      } catch (err) {
        console.log('cant delete list', err);
      }
    },
    async deleteBoard() {
      try {
        await this.$store.dispatch({
          type: 'deleteBoard',
          boardId: this.board._id,
        });
        this.$router.push('/');
        console.log('delete Board');
      } catch (err) {
        console.log('cant delete board', err);
      }
    },
    scroll(ev) {
      const slider = ev.target;
      this.slider = slider;
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    },
    unscroll() {
      if (!this.slider) return;
      this.slider.classList.remove('active');
    },
  },
  components: {
    boardHeader,
    boardMenu,
    mainMenu,
    boardList,
    focus,
  },
};
</script>

<style></style>

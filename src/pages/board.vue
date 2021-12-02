<template>
  <section v-if="board" :class="{ 'display-modal': selectedCardId }" class="board-app">
    <board-header />
    <ul class="board">
      <li class="list-wrapper" v-for="list in board.lists" :key="list.id">
        <board-list :list="list" @update="updateList"></board-list>
      </li>
      <li class="list-wrapper new-list" @click="addList">
        <p>
          <span><i class="fas fa-plus"></i></span>Add another list
        </p>
      </li>
    </ul>
    <router-view v-if="selectedCardId"></router-view>
  </section>
</template>

<script>
import boardHeader from '../cmps/board-header.cmp.vue';
import mainMenu from '../cmps/main-menu.cmp.vue';
import boardMenu from '../cmps/board-menu.cmp.vue';
import boardList from '../cmps/board-list.cmp.vue';

export default {
  data() {
    return {
      selectedCardId: null,
    };
  },
  watch: {
    '$route.params.cardId': {
      async handler() {
        // console.log(this.$route.params);
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
  },
  methods: {
    async addList() {
      const title = prompt('list title');
      if (!title) return;
      try {
        const board = await this.$store.dispatch({
          type: 'addList',
          title,
          boardId: this.board._id,
        });
        // this.board = board
      } catch (err) {
        console.log('cant add list', err);
      }
    },

    async updateList(list) {
      try {
        const board = await this.$store.dispatch({ type: 'updateList', list, boardId: this.board._id });
      } catch (err) {
        console.log('cant update list', err);
      }
    },
  },
  components: {
    boardHeader,
    boardMenu,
    mainMenu,
    boardList,
  },
};
</script>

<style></style>

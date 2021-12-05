<template>
  <header class="board-header" v-if="board">
    <section>
      <span class="board-title">{{ board.title }}</span>
      <span class="board-star"><i class="icon-sm icon-star"></i></span>
      <span>Members</span>
      <button>Invite</button><button @click="deleteBoard">Delete Board</button>
    </section>
    <section>
      <button>Filter</button>
      <button @click="showMainMenu = true">Show menu</button>
      <main-menu v-show="showMainMenu" @close="showMainMenu = false" />
    </section>
  </header>
</template>

<script>
import mainMenu from '@/cmps/main-menu.cmp.vue';
export default {
  data() {
    return {
      showMainMenu: false,
    };
  },
  methods: {
    deleteBoard() {
      if (confirm('This action will delete the board! continue?')) this.$emit('deleteBoard');
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },

  components: {
    mainMenu,
  },
};
</script>

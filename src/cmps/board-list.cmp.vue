<template>
  <li class="list">
    <header>
      <h4 v-if="!editTitle" @click="editTitle = true">{{ showTitle }}</h4>
      <textarea
        type="text"
        v-else
        v-model="updatedList.title"
        v-focus="editTitle"
        @focus="$event.target.select()"
        placeholder="Enter title"
        @blur="updateList()"
      />
      <button><i class="fas fa-ellipsis-h"></i></button>
    </header>
    <ul class="card-list">
      <!-- v-for cards in list.cards  :mini-list="mini-list"-->
      <card-list v-for="card in list.cards" :key="card.id" :card="card" :list="list"></card-list>
    </ul>
    <footer class="add-card">
      <button @click="addCard">
        <span class="icon-sm icon-plus"></span>Add a card
      </button>
    </footer>
  </li>
</template>

<script>
import cardList from './card-list.cmp.vue';
import { focus } from 'vue-focus';

// props- list
export default {
  props: {
    list: {
      type: Object,
    },
  },
  directives: { focus },
  data() {
    return {
      updatedList: JSON.parse(JSON.stringify(this.list)),
      editTitle: false,
    };
  },
  methods: {
    async addCard() {
      const title = prompt('card title');
      if (!title) return;
      try {
        this.$store.dispatch({ type: 'addCard', boardId: this.$store.getters.boardId, list: this.list, title });
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    selectCard(card) {
      console.log(card);
    },
    updateList() {
      this.editTitle = false;
      this.$emit('update', JSON.parse(JSON.stringify(this.updatedList)));
    },
  },
  computed: {
    showTitle() {
      return this.list.title ? this.list.title : 'Enter title';
    },
  },
  components: {
    cardList,
  },
};
</script>

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
      <button><span class="icon-sm icon-dots"></span></button>
    </header>
    <ul class="card-list">
      <!-- v-for cards in list.cards  :mini-list="mini-list"-->
      <draggable v-model="updatedList.cards" group="list-group" ghost-class="ghost" @add="updateList" @end="updateList">
        <card-list
          @change="updatedList"
          v-for="card in updatedList.cards"
          :key="card.id"
          :card="card"
          :list="list"
        ></card-list>
      </draggable>
    </ul>
    <footer class="add-card">
      <button @click="addCard"><span class="icon-sm icon-plus"></span>Add a card</button>
    </footer>
  </li>
</template>

<script>
import cardList from './card-list.cmp.vue';
import { focus } from 'vue-focus';
import draggable from 'vuedraggable';

// props- list
export default {
  props: {
    list: {
      type: Object,
    },
    idx: {
      type: Number,
    },
  },
  directives: { focus },
  data() {
    return {
      updatedList: null,
      editTitle: false,
    };
  },
  created() {
    this.updatedList = JSON.parse(JSON.stringify(this.list));
  },
  methods: {
    async addCard() {
      const title = prompt('card title');
      if (!title) return;
      try {
        await this.$store.dispatch({ type: 'addCard', board: this.$store.getters.board, list: this.list, title });
        console.log('card added', this.listOnEdit);
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    updateList() {
      this.editTitle = false;
      this.$emit('update', JSON.parse(JSON.stringify(this.updatedList)));
    },
  },
  computed: {
    getList() {
      return JSON.parse(JSON.stringify(this.list));
    },
    showTitle() {
      return this.list.title ? this.list.title : 'Enter title';
    },
  },
  watch: {
    list: {
      handler() {
        this.updatedList = JSON.parse(JSON.stringify(this.list));
      },
    },
  },
  components: {
    draggable,
    cardList,
  },
};
</script>

<style>
.ghost {
  background: rgb(226, 228, 234);
  border-radius: 3px;
}

.sortable-chosen {
  opacity: 1;
}

.sortable-chosen > * {
  opacity: 1;
  background-color: rgba(0, 0, 0, 100%);
}

.ghost > * {
  opacity: 0;
}
</style>

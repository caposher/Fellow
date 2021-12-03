<template>
  <li class="list">
    <header>
      <p>{{ oldIndex }}</p>
      <p>{{ newIndex }}</p>
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
      <draggable
        v-model="listOnEdit.cards"
        group="list-group"
        ghost-class="ghost"
        :animation="200"
        :move="detectMove"
        @start="drag = true"
        @end="drag = false"
      >
        <card-list
          v-for="(card, idx) in listOnEdit.cards"
          :class="oldIndex === idx ? 'ghost' : ''"
          :key="card.id"
          :card="card"
          :list="list"
        ></card-list>
      </draggable>
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
      listOnEdit: JSON.parse(JSON.stringify(this.list)),
      oldIndex: '',
      newIndex: '',
      updatedList: JSON.parse(JSON.stringify(this.list)),
      editTitle: false,
    };
  },
  methods: {
    async addCard() {
      const title = prompt('card title');
      if (!title) return;
      try {
       await this.$store.dispatch({ type: 'addCard', boardId: this.$store.getters.boardId, list: this.list, title });
       console.log('card added', this.listOnEdit);
       
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
    detectMove(ev) {
      console.log(ev);
      this.oldIndex = ev.draggedContext.index;
      this.newIndex = ev.draggedContext.futureIndex;
      // debugger;
    },
    osher(idx) {
      return;
    },
  },
  computed: {
    showTitle() {
      return this.list.title ? this.list.title : 'Enter title';
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
  opacity: 0.5;
  background: #f7fafc;
}

.ghost::after {
  content: '';
}
</style>

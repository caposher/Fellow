<template>
  <li class="list">
    <header>
      <p>{{ oldIndex }}</p>
      <p>{{ newIndex }}</p>
      <p>{{ isdrag }}</p>
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
        v-model="updatedList.cards"
        group="list-group"
        ghost-class="ghost"
        drag-class="drag"
        :move="detectMove"
        @start="isdrag = true"
        @end="ondragEnd()"
      >
        <card-list
          @drag="ondrag"
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
      // listOnEdit: JSON.parse(JSON.stringify(this.list)),
      oldIndex: '',
      newIndex: '',
      isdrag: false,
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
      console.log(this.updatedList);
      this.$emit('update', JSON.parse(JSON.stringify(this.updatedList)));
    },
    detectMove(ev) {
      console.log(ev);
      this.oldIndex = ev.draggedContext.index;
      this.newIndex = ev.draggedContext.futureIndex;
      ev.draggedContext.element.style = 'backgroundColor="red"';
      // debugger;
    },
    ondrag(ev) {
      debugger;
    },
    ondragEnd() {
      if (this.oldIndex !== null && this.newIndex !== null) {
        console.log('change location');
        const card = this.updatedList.cards[this.oldIndex];
        this.updatedList.cards.splice(this.oldIndex, 1, this.updatedList.cards[this.newIndex]);
        this.updatedList.cards.splice(this.newIndex, 1, card);
        //   this.updateList();
      }
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
        console.log(this.list);
        console.log('watcha la params');
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
.shadow {
  /* background-color: saddlebrown; */
}

.ghost {
  /* opacity: 0.5; */
  background: rgb(226, 228, 234);
  border-radius: 3px;
}

.ghost > * {
  opacity: 0;
}
</style>

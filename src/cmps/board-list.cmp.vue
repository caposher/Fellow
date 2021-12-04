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
        @keydown.enter="updateList()"
      />
      <button @click="deleteList"><span class="icon-sm icon-close"></span></button>
      <!-- <button @click="deleteList">x</button> -->
    </header>
    <ul class="card-list">
      <!-- v-for cards in list.cards  :mini-list="mini-list"-->
      <draggable
        v-model="updatedList.cards"
        group="list-group"
        ghost-class="ghost"
        @add="updateList"
        @start="dragCard = true"
        @end="ondragEnd"
      >
        <card-list
          @change="updatedList"
          v-for="card in updatedList.cards"
          :key="card.id"
          :card="card"
          :list="list"
          :do-drag="dragCard"
        ></card-list>
      </draggable>
    </ul>
    <footer class="add-card">
      <!-- @click="addCard" -->
      <button class="add-card" @click="isAddCard = true" v-if="!isAddCard">
        <span class="icon-sm icon-plus"></span>
        <p>Add a card</p>
      </button>
      <div v-else class="add-card-actions">
        <input type="text" v-focus="isAddCard" v-model="newCardTitle" @keydown.enter="addCard" />
        <div class="add-card-btns">
          <div class="submit-btns">
            <button class="submit-btn submit-card" @click="addCard">Add Card</button>
            <button>
              <span
                id="close"
                name="close"
                @click.stop.prevent="closeAddCard"
                class="icon-close icon-lg close-add-btn"
              ></span>
            </button>
          </div>
          <button class="dots">
            <span class="icon-dots icon-lg"></span>
          </button>
        </div>
      </div>
    </footer>
  </li>
</template>

<script>
import cardList from './card-list.cmp.vue';
import { focus } from 'vue-focus';
import draggable from 'vuedraggable';

// props- list
export default {
  directives: { focus },
  props: {
    list: {
      type: Object,
    },
  },
  data() {
    return {
      dragCard: false,
      updatedList: null,
      editTitle: false,
      isAddCard: false,
      newCardTitle: '',
    };
  },
  created() {
    this.updatedList = JSON.parse(JSON.stringify(this.list));
  },
  methods: {
    handleBlur(e) {
      console.log(e);
      if (!this.isAddCard) return;
      else this.addCard();
      // function(e) {
      // const name = e.target;
      // console.log(name);
      // }
    },
    async addCard() {
      // if (!this.isAddCard) return
      console.log('adding card');
      // const title = prompt('card title');
      const title = this.newCardTitle;
      if (!title) {
        this.isAddCard = false;
        return;
      }
      try {
        await this.$store.dispatch({
          type: 'addCard',
          board: this.$store.getters.board,
          list: this.list,
          title,
        });
        this.newCardTitle = '';
        this.isAddCard = false;
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    closeAddCard(event) {
      this.newCardTitle = '';
      this.isAddCard = false;
      event.target.blur();
      console.log('end of close');
    },

    updateList() {
      this.editTitle = false;
      this.$emit('update', JSON.parse(JSON.stringify(this.updatedList)));
    },
    ondragEnd() {
      this.dragCard = false;
      this.updateList();
    },
    deleteList() {
      if (confirm('This action will delete the list! continue?')) {
        this.$emit('deleteList', JSON.parse(JSON.stringify(this.updatedList)));
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

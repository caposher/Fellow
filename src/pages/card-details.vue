<template>
  <section v-if="list && card" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div class="header-text">
          <input @blur="updateCard" v-model="card.title" />
          <h5>in list {{ list.title }}</h5>
        </div>
      </div>
    </header>
    <div class="card-body">
      <div class="main-details">
        <div class="icon-header">
          <div class="labels">
            <!-- watch -->
            <!-- <button>Labels</button> -->
            <!-- members -->
            <!-- date -->
          </div>
        </div>
        <div class="description">
          <header>
            <span class="fa fa-align-left"></span>
            <h4>Description</h4>
            <button v-show="card.description && !isEditDesc" @click="setFocus">
              Edit
            </button>
          </header>
          <textarea
            ref="desc"
            @focus="setEditDesc"
            @blur="updateCard"
            placeholder="Add a more detailed description..."
            v-model="card.description"
          ></textarea>
          <div class="buttons" v-show="isEditDesc">
            <button class="save">save</button>
            <button @click.stop="undoDesc">X</button>
          </div>
        </div>

        <div
          class="check-list"
          v-for="checklist in card.checklists"
          :key="checklist.id"
        >
          <checklist :checklist="checklist" @updateCL="updateCL" />
        </div>
        <div class="activity-log">
          <span>icon</span>
          <h4>activities</h4>
          <input />
          <button>save</button>
        </div>
      </div>
      <div class="side-menu">
        <!-- side menu renders cmp in click -->
        <button>Labels</button>
        <button>Members</button>
        <button>Date</button>
        <section class="checklist">
          <button @click="openCheckList = !openCheckList">
            <span>Checklist</span>
          </button>
          <section class="popup" v-show="openCheckList">
            <span>Add checklist</span>
            <form @submit.prevent="addCheckList">
              <label>Title</label>
              <input
                type="text"
                value="Checklist"
                v-model="newChecklist.title"
              />
              <label>Copy items from...</label>
              <select name="" id="">
                <option value="">(none)</option>
              </select>
              <button>Add</button>
            </form>
          </section>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../services/util.service.js";
import checklist from "../cmps/checklist.cmp.vue";
export default {
  data() {
    return {
      lastCardDesc: null,
      isEditDesc: false,
      openCheckList: false,
      newChecklist: {},
    };
  },

  computed: {
    card() {
      return this.$store.getters.card;
    },
    list() {
      return this.$store.getters.list;
    },
    boardId() {
      return this.$store.getters.boardId;
    },
  },
  methods: {
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push("/b/" + boardId);
    },
    async updateCard() {
      if (this.card.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card: this.card,
        });
        this.isEditDesc = false;
        console.log("card updated");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    setEditDesc() {
      this.lastCardDesc = this.card.description;
      this.isEditDesc = true;
    },
    async undoDesc() {
      if (this.card.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      var card = this.card;
      card.description = this.lastCardDesc;
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card,
        });
        console.log("card desc undo");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    setFocus() {
      this.isEditDesc = true;
      this.$refs.desc.focus();
    },
    async addCheckList() {
      this.newChecklist.id = "CL" + utilService.makeId();
      this.card.checklists.push(this.newChecklist);
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card: this.card,
        });
        this.openCheckList = false;
        console.log("card", this.card);
        console.log("card updated");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    async updateCL(todo, checklistId, checklistTitle) {
      const card = JSON.parse(JSON.stringify(this.card));
      const idx = card.checklists.findIndex(
        (checklist) => checklist.id === checklistId
      );
      const currChecklist = card.checklists[idx];
      if (checklistTitle) {
      }
      if (todo.id) {
        const todoIdx = currChecklist.todos.findIndex(
          (td) => td.id === todo.id
        );
        currChecklist.todos.splice(todoIdx, 1, todo);
      } else {
        todo.id = "TD" + utilService.makeId();
        if (card.checklists[idx].todos) {
          card.checklists[idx].todos.push(todo);
        } else card.checklists[idx].todos = [todo];
      }
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card,
        });
      } catch (err) {
        console.log("cant save the todo", err);
      }
    },
  },
  components: {
    checklist,
  },
};
</script>

<style></style>

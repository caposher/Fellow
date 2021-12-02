<template>
  <section v-if="list && updatedCard" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div class="header-text">
          <input @blur="updateCard" v-model="updatedCard.title" />
          <h5>in list {{ list.title }}</h5>
        </div>
      </div>
    </header>
    <div class="card-body">
      <div class="main-details">
        <div class="icon-header">
          <div class="detail-labels">
            <!-- watch -->
            <!-- <button>Labels</button> -->
            <!-- <card-labels :cardLabels="updatedCard.labelIds" @update="updateLabels" /> -->
            <!-- members -->
            <!-- date -->
          </div>
          <div class="dueDate" v-show="updatedCard.dueDate">
            <h4>Due date</h4>
            <div>
              <span>{{ dateToShow }}</span>
              <span v-show="updatedCard.dueDate - Date.now() <= 86400000" :class="timeLabelColor" class="timeLabel">{{
                timeLabel
              }}</span>
            </div>
          </div>
        </div>
        <div class="description">
          <header>
            <span class="fa fa-align-left"></span>
            <h4>Description</h4>
            <button v-show="updatedCard.description && !isEditDesc" @click="setFocus">Edit</button>
          </header>
          <textarea
            ref="desc"
            @focus="setEditDesc"
            @blur="updateCard"
            placeholder="Add a more detailed description..."
            v-model="updatedCard.description"
          ></textarea>
          <div class="buttons" v-show="isEditDesc">
            <button class="save">save</button>
            <button @click.stop="undoDesc">X</button>
          </div>
        </div>

        <div class="check-list" v-for="checklist in updatedCard.checklists" :key="checklist.id">
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
        <date @updateDate="updateDate" :cardDate="updatedCard.dueDate" class="date"></date>
        <!-- <button @click="showDate=!showDate">Date</button> -->
        <button>Checklist</button>
        <section class="checklist">
          <button @click="openCheckList = !openCheckList">
            <span>Checklist</span>
          </button>
          <section class="popup" v-show="openCheckList">
            <span>Add checklist</span>
            <form @submit.prevent="addCheckList">
              <label>Title</label>
              <input type="text" value="Checklist" v-model="newChecklist.title" />
              <label>Copy items from...</label>
              <select name id>
                <option value>(none)</option>
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
import cardLabels from '../cmps/labels.cmp.vue';
import date from '../cmps/date.cmp.vue';

import { utilService } from '../services/util.service.js';
import checklist from '../cmps/checklist.cmp.vue';
export default {
  data() {
    return {
      lastCardDesc: null,
      isEditDesc: false,
      showDate: false,
      openCheckList: false,
      newChecklist: {},
      updatedCard: null,
    };
  },
  created() {
    this.updatedCard = this.card;
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
    timeLabelColor() {
      if (this.updatedCard.dueDate - Date.now() <= 0) {
        return 'red';
      } else {
        return 'yellow';
        // yellow due soon (today)
      }
    },
    dateToShow() {
      const timeStamp = this.updatedCard.dueDate;
      console.log(timeStamp);
      const dueDate = `${new Date(timeStamp)}`;
      // return (dueDate);
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);

      const milisecsUntilTommorow = tomorrow.getTime() - today.getTime();
      const milisecsPassedToday = 86400000 - milisecsUntilTommorow;

      if (timeStamp - Date.now() <= milisecsUntilTommorow && Date.now() - timeStamp <= milisecsPassedToday)
        return 'today at ' + `${dueDate}`.substring(16, 21);
      if (timeStamp - Date.now() >= milisecsUntilTommorow && timeStamp - Date.now() <= milisecsUntilTommorow + 86400000)
        return 'tommorow at ' + `${dueDate}`.substring(16, 21);
      if (Date.now() - timeStamp >= milisecsPassedToday && Date.now() - timeStamp <= milisecsPassedToday + 86400000)
        return 'yesterday at ' + `${dueDate}`.substring(16, 21);

      return `${dueDate}`.substring(4, 15);
    },
    timeLabel() {
      if (this.updatedCard.dueDate - Date.now() <= 0) {
        return 'over due';
      } else {
        return 'due soon';
        // yellow due soon (today)
      }
    },
  },
  methods: {
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push('/b/' + boardId);
    },
    async updateCard() {
      try {
        await this.$store.dispatch({
          type: 'updateCard',
          boardId: this.boardId,
          list: this.list,
          card: JSON.parse(JSON.stringify(this.updatedCard)),
        });
        this.isEditDesc = false;
        console.log('card updated');
      } catch (err) {
        console.log('cant update card', err);
      }
    },
    setEditDesc() {
      this.lastCardDesc = this.updatedCard.description;
      this.isEditDesc = true;
    },
    async undoDesc() {
      if (this.updatedCard.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      var card = this.updatedCard;
      card.description = this.lastCardDesc;
      try {
        await this.$store.dispatch({
          type: 'updateCard',
          boardId: this.boardId,
          list: this.list,
          card,
        });
        console.log('card desc undo');
      } catch (err) {
        console.log('cant update card', err);
      }
    },
    setFocus() {
      this.isEditDesc = true;
      this.$refs.desc.focus();
    },
    async updateDate(date) {
      this.updatedCard.dueDate = date;
      await this.updateCard();
    },

    async addCheckList() {
      this.newChecklist.id = 'CL' + utilService.makeId();
      this.updatedCard.checklists.push(this.newChecklist);
      try {
        await this.$store.dispatch({
          type: 'updateCard',
          boardId: this.boardId,
          list: this.list,
          card: this.updatedCard,
        });
        this.openCheckList = false;
        console.log('card', this.updatedCard);
        console.log('card updated');
      } catch (err) {
        console.log('cant update card', err);
      }
    },
    async updateCL(todo, checklistId, checklistTitle) {
      const card = this.updatedCard;
      const idx = card.checklists.findIndex((checklist) => checklist.id === checklistId);
      const currChecklist = card.checklists[idx];
      if (checklistTitle) {
      }
      if (todo.id) {
        const todoIdx = currChecklist.todos.findIndex((td) => td.id === todo.id);
        currChecklist.todos.splice(todoIdx, 1, todo);
      } else {
        todo.id = 'TD' + utilService.makeId();
        if (card.checklists[idx].todos) {
          card.checklists[idx].todos.push(todo);
        } else card.checklists[idx].todos = [todo];
      }
      try {
        await this.$store.dispatch({
          type: 'updateCard',
          boardId: this.boardId,
          list: this.list,
          card,
        });
      } catch (err) {
        console.log('cant save the todo', err);
      }
    },
    async updateLabels(labelsIds) {
      this.updatedCard.labelsIds = labelsIds;
      await this.updateCard();
    },
  },
  components: {
    checklist,
    date,
    cardLabels,
  },
};
</script>

<style></style>

<template>
  <section v-if="list && cardToEdit" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div class="header-text">
          <input @blur="updateCard" v-model="cardToEdit.title" />
          <h5>in list {{ list.title }}</h5>
        </div>
      </div>
    </header>
    <div class="card-body">
      <div class="main-details">
        <div class="icon-header">
          <div class="detail-labels">
            <div class="due-date" v-show="cardToEdit.dueDate">
              <h3>Due date</h3>
              <div class="due-date-body">
                <span class="check-box-container">
                  <!-- <span class="checkbox"> -->
                  <input type="checkbox" v-model="cardToEdit.isComplete" @change="updateCard" />
                  <!-- </span> -->
                </span>
                <div class="date-picker">
                  <span>{{ dateToShow }}</span>
                  <span v-show="cardToEdit.isComplete" class="time-label complete">complete</span>
                  <span
                    v-show="!cardToEdit.isComplete &&cardToEdit.dueDate - Date.now() <= 86400000"
                    :class="timeLabelColor"
                    class="time-label"
                  >{{ timeLabel }}</span>
                </div>
              </div>
            </div>
            <!-- watch -->
            <!-- <button>Labels</button> -->
            <button
              v-for="label in getLabels"
              :key="label.id"
              :class="label.colorClass"
              class="label-tag"
            >{{ label.txt }}</button>
            <!-- members -->
            <!-- date -->
            <!-- </div> -->
          </div>
          <div class="dueDate" v-show="cardToEdit.dueDate">
            <h4>Due date</h4>
            <div>
              <span>{{ dateToShow }}</span>
              <span
                v-show="cardToEdit.dueDate - Date.now() <= 86400000"
                :class="timeLabelColor"
                class="timeLabel"
              >{{ timeLabel }}</span>
            </div>
          </div>
        </div>
        <div class="description">
          <header>
            <span class="fa fa-align-left"></span>
            <h4>Description</h4>
            <button v-show="cardToEdit.description && !isEditDesc" @click="setFocus">Edit</button>
          </header>
          <textarea
            ref="desc"
            @focus="setEditDesc"
            @blur="updateCard"
            placeholder="Add a more detailed description..."
            v-model="cardToEdit.description"
          ></textarea>
          <div class="buttons" v-show="isEditDesc">
            <button class="save">save</button>
            <button @click.stop="undoDesc">X</button>
          </div>
        </div>

        <div class="check-list" v-for="checklist in cardToEdit.checklists" :key="checklist.id">
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
        <button @click="toggleLabels">Labels</button>
        <card-labels
          v-show="showLabels"
          @close="toggleLabels"
          :cardLabels="cardToEdit.labelIds"
          @update="updateLabels"
        />
        <button>Members</button>
        <date @updateDate="updateDate" :cardDate="cardToEdit.dueDate" class="date"></date>
        <section class="checklist">
          <button @click="openCheckList = !openCheckList">
            <span>Checklist</span>
          </button>
          <section class="checklist-popup" v-show="openCheckList">
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
import cardLabels from "../cmps/labels.cmp.vue";
import date from "../cmps/date.cmp.vue";

import { utilService } from "../services/util.service.js";
import checklist from "../cmps/checklist.cmp.vue";
export default {
  data() {
    return {
      lastCardDesc: null,
      isEditDesc: false,
      showDate: false,
      showLabels: false,
      openCheckList: false,
      newChecklist: {},
      cardToEdit: null,
    };
  },
  created() {
    this.cardToEdit = this.card;
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
      return this.cardToEdit.dueDate - Date.now() <= 0
        ? "over-due"
        : "due-soon";
    },
    timeLabel() {
      return this.cardToEdit.dueDate - Date.now() <= 0
        ? "over due"
        : "due soon";
    },
    dateToShow() {
      const timestamp = this.cardToEdit.dueDate;
      const dueDate = new Date(timestamp);
      const time = this.formatAMPM(dueDate);
      if (new Date().getDate() === new Date(timestamp).getDate())
        return "today" + time;
      else if (new Date().getDate() + 1 === new Date(timestamp).getDate())
        return "tomorrow" + time;
      else if (new Date().getDate() - 1 === new Date(timestamp).getDate())
        return "yesterday" + time;
      else if (new Date().getYear() === new Date(timestamp).getYear()) {
        return this.formatDate(dueDate) + time;
      }

      return this.formatDate(dueDate) + ", " + dueDate.getFullYear() + time;
    }
  },
  methods: {
    formatAMPM(dueDate) {
      var hours = dueDate.getHours();
      var minutes = dueDate.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = " at " + hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    formatDate(dueDate) {
      var date = dueDate.getDate();
      var month = `${dueDate}`.substring(4, 7);
      const strDate = `${month} ${date}`;
      return strDate;
    },
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push("/b/" + boardId);
    },
    async updateCard() {
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: JSON.parse(JSON.stringify(this.list)),
          card: JSON.parse(JSON.stringify(this.cardToEdit)),
        });
        this.isEditDesc = false;
        console.log("card updated");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    async changeComplete() {
      this.cardToEdit.isComplete = !this.cardToEdit.isComplete;
      await this.updateCard();
    },
    setEditDesc() {
      this.lastCardDesc = this.cardToEdit.description;
      this.isEditDesc = true;
    },
    async undoDesc() {
      if (this.cardToEdit.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      var card = this.cardToEdit;
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
    async updateDate(date) {
      this.cardToEdit.dueDate = date;
      await this.updateCard();
    },

    async addCheckList(ev) {
      if (!ev.target[0].value) return;
      this.newChecklist.id = "CL" + utilService.makeId();
      this.cardToEdit.checklists.push(this.newChecklist);
      this.openCheckList = false;
      try {
        await this.updateCard();
        this.newChecklist = {};
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    async updateCL(checklist) {
      const idx = this.cardToEdit.checklists.findIndex(
        (cl) => cl.id === checklist.id
      );
      if (checklist.title) this.cardToEdit.checklists.splice(idx, 1, checklist);
      else this.cardToEdit.checklists.splice(idx, 1);
      try {
        await this.updateCard();
      } catch (err) {
        console.log("cant save the todo", err);
      }
    },
    async updateLabels(labelIds) {
      this.cardToEdit.labelIds = labelIds;
      await this.updateCard();
    },
    toggleLabels() {
      this.showLabels = !this.showLabels;
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

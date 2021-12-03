<template>
  <div
    v-if="list && cardToEdit"
    class="card-details-container"
    @click.stop.prevent="closeModal"
  >
    <div class="card-details" @click.stop="">
      <button @click.stop="closeModal" class="close">
        <span class="icon-md icon-close"></span>
      </button>
      <header>
        <div class="header">
          <span class="icon-card icon-lg"></span>
          <!-- <span class="fa fa-newspaper"></span> -->
          <div class="card-header-container">
            <textarea @blur="updateCard" v-model="cardToEdit.title" />
            <h5>in list {{ list.title }}</h5>
            <span v-show="card.isWatch" class="icon-sm icon-watch"></span>
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
                  <span
                    class="check-box-container"
                    :class="{
                      checked: cardToEdit.isComplete,
                      unCheck: !cardToEdit.isComplete,
                    }"
                  >
                    <!-- <span class="checkbox"> -->
                    <input
                      type="checkbox"
                      v-model="cardToEdit.isComplete"
                      @change="updateCard"
                    />
                    <!-- </span> -->
                  </span>
                  <div class="date-picker">
                    <span>{{ dateToShow }}</span>
                    <span
                      v-show="
                        !cardToEdit.isComplete &&
                        cardToEdit.dueDate - Date.now() <= 86400000
                      "
                      :class="timeLabelColor"
                      class="time-label"
                      >{{ timeLabel }}</span
                    >
                    <span
                      v-show="cardToEdit.isComplete"
                      class="time-label complete"
                      >complete</span
                    >
                  </div>
                </div>
              </div>
              <div class="card-labels">
                <h4>Labels</h4>
                <button
                  v-for="label in getLabels"
                  :key="label.id"
                  :class="label.colorClass"
                  class="label-tag white-text"
                >
                  {{ label.txt }}
                </button>
                <button class="label-tag">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="description">
            <span class="card-details-icon icon-lg"></span>
            <div>
              <!-- <span class="icon-lg icon-desc"></span> -->
              <!-- <span class="fa fa-align-left"></span> -->
              <div class="content">
                <h3>Description</h3>
                <button
                  v-show="cardToEdit.description && !isEditDesc"
                  @click.stop="setFocus"
                  class="action-btn"
                >
                  Edit
                </button>
              </div>
            </div>
            <!-- @blur="updateCard" -->
            <textarea
              rows="2"
              ref="desc"
              class="action-btn desc"
              @focus="setEditDesc"
              placeholder="Add a more detailed description..."
              v-model="cardToEdit.description"
            ></textarea>
            <div class="buttons" v-show="isEditDesc">
              <button class="submit-btn" @click.stop="updateCard">save</button>
              <span @click.stop="undoDesc" class="icon-lg icon-close"></span>
            </div>
          </div>

          <div
            class="check-list"
            v-for="checklist in cardToEdit.checklists"
            :key="checklist.id"
          >
            <span class="card-details-icon icon-lg"></span>

            <checklist :checklist="checklist" @updateCL="updateCL" />
          </div>
          <div class="activity-log">
            <span class="icon-lg icon-activity"></span>
            <h4>activities</h4>
            <input />
            <button>save</button>
          </div>
        </div>
        <div class="side-menu">
          <h3>Add to card</h3>
          <!-- side menu renders cmp in click -->
          <button class="action-btn">
            <span class="icon-sm icon-member"></span>Members
          </button>
          <button @click.stop="toggleLabels" class="action-btn">
            <span class="icon-sm icon-label"></span>
            Labels
          </button>
          <card-labels
            v-show="showLabels"
            @close="toggleLabels"
            :cardLabels="cardToEdit.labelIds"
            @update="updateLabels"
          />
          <section class="checklist-btn">
            <button @click.stop="openCheckList = !openCheckList">
              <span class="action-btn">
                <span class="icon-sm icon-checklist"></span>
                Checklist</span
              >
            </button>
            <section class="checklist-popup" v-show="openCheckList">
              <section class="popup-header">
                <button class="close-popup" @click.stop="openCheckList = false">
                  x
                </button>
                <span>Add checklist</span>
              </section>
              <form @submit.prevent="addCheckList">
                <label>Title</label>
                <input
                  type="text"
                  value="Checklist"
                  v-model="newChecklist.title"
                />
                <label>Copy items from...</label>
                <select name id>
                  <option value>(none)</option>
                </select>
                <button class="submit">Add</button>
              </form>
            </section>
          </section>
          <date
            @updateDate="updateDate"
            :cardDate="cardToEdit.dueDate"
            class="date"
          ></date>
          <button class="attachment action-btn">
            <span class="icon-sm icon-attach"></span>Attachments
          </button>
          <button class="cover action-btn">
            <span class="icon-sm icon-cover"></span>Cover
          </button>
        </div>
      </div>
    </div>
  </div>
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
      newChecklist: { title: "Checklist" },
      cardToEdit: null,
      isUndoDesc: false,
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
    },
    getLabels() {
      const allLabels = this.$store.getters.labels;
      const labelIds = this.card.labelIds;
      return labelIds.map((lId) => allLabels.find((label) => label.id === lId));
    },
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
      this.isEditDesc = false;
      // console.log(this.$route.matched[0].path);
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: JSON.parse(JSON.stringify(this.list)),
          card: JSON.parse(JSON.stringify(this.cardToEdit)),
        });
        // this.$emit('reload')
        // this.$router.matched[0].path.reload()
        // console.log("card updated with new desc");
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
      this.cardToEdit.description = this.lastCardDesc;
      this.isEditDesc = false;
      // if (this.cardToEdit.description === this.lastCardDesc) return
      //   await this.updateCard()
      //   console.log("card updated with old desc");
    },
    setFocus() {
      this.isEditDesc = true;
      this.$refs.desc.focus();
    },
    async updateDate(date) {
      console.log("date", date);
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

<template>
  <div v-if="list && cardToEdit" class="card-details-container" @click.stop.prevent="closeModal">
    <div class="card-details" @click.stop>
      <button @click.stop="closeModal" class="close">
        <span class="icon-md icon-close"></span>
      </button>
      <div v-if="cardToEdit.style" class="cover-wrapper" :style="coverStyle">
        <section class="cover-menu-header">
          <button
            @click.stop="showCoverMenu=!showCoverMenu"
            class="cover-menu-btn"
            :style="{color:textColor ,backgroundColor: bgColor}"
          >
            <!-- :class="{'lightBtn':cardToEdit.style.isDark,'darkBtn': !cardToEdit.style.isDark}" -->
            <span :style="{color:textColor}" class="icon-sm icon-cover"></span>
            Cover
          </button>
          <cover
            v-if="showCoverMenu"
            @makeCover="makeCover"
            :card="cardToEdit"
            @removeCover="removeCover"
            @closeCover="showCoverMenu=false"
          ></cover>
        </section>
      </div>
      <header>
        <div class="header">
          <span class="icon-card icon-lg"></span>
          <div class="card-header-container">
            <textarea
              rows
              contenteditable="true"
              @blur="updateCard"
              v-model="cardToEdit.title"
              @keydown.enter.prevent="updateCard"
            />
            <h5>
              in list
              <span>{{ list.title }}</span>
            </h5>
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
                  <!-- <span
                    class="check-box-container"
                    :class="{
                      checked: cardToEdit.isComplete,
                      unCheck: !cardToEdit.isComplete,
                    }"
                  >-->
                  <!-- <span class="checkbox"> -->
                  <input
                    id="cb"
                    type="checkbox"
                    v-model="cardToEdit.isComplete"
                    @change="updateCard"
                  />
                  <label for="cb"></label>
                  <div class="relative-date">
                    <date
                      @updateDate="updateDate"
                      :cardDate="cardToEdit.dueDate"
                      :cardToEdit="cardToEdit"
                      class="date"
                      :datePlaceholder="dateToShow"
                    ></date>
                  </div>
                </div>
              </div>
              <div class="card-labels">
                <h4>Labels</h4>
                <span class="label-wrapper" @click="showLabels = true">
                  <button
                    v-for="label in getLabels"
                    :key="label.id"
                    :class="label.colorClass"
                    class="label-tag white-text"
                  >{{ label.txt }}</button>
                  <button v-show="getLabels.length > 0" class="action-btn">
                    <span class="icon-sm icon-plus"></span>
                  </button>
                </span>
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
                >Edit</button>
              </div>
            </div>
            <!-- @blur="updateCard" -->
            <form @submit.prevent="updateDesc">
              <div
                contenteditable="true"
                ref="desc"
                class="desc action-btn"
                @focus="setEditDesc"
                placeholder="Add a more detailed description..."
              ></div>
              <!-- <textarea
              rows="2"
              ref="desc"
              class="action-btn desc"
              @focus="setEditDesc"
              placeholder="Add a more detailed description..."
              v-model="cardToEdit.description"
              />-->
              <div class="buttons" v-show="isEditDesc">
                <!-- <button class="submit-btn" @click.stop="updateCard">Save</button> -->
                <button class="submit-btn" @click.stop.prevent="updateDesc">Save</button>
                <span @click.stop="undoDesc" class="icon-lg icon-close"></span>
              </div>
            </form>
          </div>

          <div class="attachments" v-show="cardToEdit.attachments && cardToEdit.attachments.length">
            <section class="attach-header">
              <span class="icon-attach icon-lg"></span>
              <h3>Attachments</h3>
            </section>
{{cardToEdit.attachments}}
            <div v-for="attachment in cardToEdit.attachments" :key="attachment.id">
              <attachment
                :attachment="attachment"
                @makeCover="makeCover"
                @removeCover="removeCover"
                @deleteAttach="deleteAttach"
                @openEdit="openEdit"
                :cardToEdit="cardToEdit"
              ></attachment>
            </div>
            <section class="card-popup" v-show="openEditAttach">
              <section class="popup-header">
                <div>
                  <span @click.stop="openEditAttach=false" class="close-popup icon-md icon-close"></span>
                </div>
                <h4>Edit attachment</h4>
              </section>
              <form @submit.stop.prevent="updateAttach">
                <label>Link name</label>
                <input @focus="$event.target.select()" type="text" v-model="attachToEdit.name" />
                <button class="submit">Update</button>
              </form>
            </section>
          </div>

          <div class="check-list" v-for="checklist in cardToEdit.checklists" :key="checklist.id">
            <span class="card-details-icon icon-lg"></span>

            <checklist :checklist="checklist" @updateCL="updateCL" />
          </div>
          <div class="activity-log">
            <span class="icon-lg icon-activity"></span>
            <h3>Activity</h3>
            <div class="comment-box" @click="isComment = true">
              <!-- <div
              class="comment-box"
              :class="{ onComment: isComment }"
              @click="isComment = true"
              >-->
              <!-- <textarea rows="1" placeholder="Write a comment..." @blur="isComment = false" /> -->
              <textarea rows="1" placeholder="not yet developed..." @blur="isComment = false" />
              <button class="submit-btn">save</button>
            </div>
          </div>
        </div>
        <!--     SIDE MENU      -->
        <div class="side-menu">
          <button class="action-btn not-yet" title="Not yet developed">
            <span class="icon-sm icon-member"></span>Join
          </button>
          <h3>Add to card</h3>
          <!-- side menu renders cmp in click -->
          <button class="action-btn not-yet" title="Not yet developed">
            <span class="icon-sm icon-member"></span>Members
          </button>
          <button @click.stop="toggleLabels" class="action-btn">
            <span class="icon-sm icon-label"></span>
            <span>Labels</span>
          </button>
          <card-labels
            v-show="showLabels"
            @close="toggleLabels"
            :cardLabels="cardToEdit.labelIds"
            @update="updateLabels"
          />

          <section class="checklist-btn">
            <button @click.stop="openCheckList = !openCheckList" @focus="$event.target.select()">
              <span class="action-btn">
                <span class="icon-sm icon-checklist"></span>
                <span>Checklist</span>
              </span>
            </button>
            <section class="card-popup" v-show="openCheckList">
              <section class="popup-header">
                <div @click.stop="openCheckList = false">
                  <span class="close-popup icon-md icon-close"></span>
                </div>
                <!-- <button class="close-popup" @click.stop="openCheckList = false">
                  x
                </button>-->
                <h4>Add checklist</h4>
              </section>
              <form @submit.prevent="addCheckList">
                <label>Title</label>
                <input
                  @focus="$event.target.select()"
                  type="text"
                  value="Checklist"
                  v-model="newChecklist.title"
                />
                <label>Copy items from...</label>
                <select name id class="not-yet">
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
            :datePlaceholder="'Dates'"
          ></date>
          <section class="attachment-btn">
            <button @click.stop="openAddAttach=!openAddAttach">
              <span class="action-btn">
                <span class="icon-sm icon-attach"></span>
                Attachments
              </span>
            </button>
            <add-attachment
              @addNewAttach="addNewAttach"
              @close="openAddAttach=false"
              v-show="openAddAttach"
            ></add-attachment>
          </section>
          <section v-show="!card.style" class="cover-menu-header">
            <button @click.stop="showCoverMenu=!showCoverMenu" class="cover-menu-btn action-btn">
              <span class="icon-sm icon-cover"></span>
              Cover
            </button>
            <cover
              v-if="showCoverMenu"
              @makeCover="makeCover"
              :card="cardToEdit"
              @removeCover="removeCover"
              @closeCover="showCoverMenu=false"
            ></cover>
          </section>
          <section class="actions">
            <h3>Actions</h3>
            <button class="cover action-btn not-yet" title="Not yet developed">
              <span class="icon-sm icon-move"></span>Move
            </button>
            <button class="cover action-btn not-yet" title="Not yet developed">
              <span class="icon-sm icon-copy"></span>Copy
            </button>
            <button class="cover action-btn not-yet" title="Not yet developed">
              <span class="icon-sm icon-template"></span>Make template
            </button>
            <button class="cover action-btn not-yet" title="Not yet developed">
              <span class="icon-sm icon-watch"></span>Watch
            </button>
            <hr />
            <button class="cover action-btn" @click="removeCard">
              <span class="icon-sm icon-archive"></span>Archive
            </button>
            <button class="cover action-btn not-yet" title="Not yet developed">
              <span class="icon-sm icon-share"></span>Share
            </button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardLabels from "../cmps/labels.cmp.vue";
import date from "../cmps/date.cmp.vue";
import addAttachment from "../cmps/add-attachment.cmp.vue";
import attachment from "../cmps/attachment.cmp.vue";
import cover from "../cmps/cover.cmp.vue";

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
      isComment: false,
      openAddAttach: false,
      openEditAttach: false,
      showCoverMenu: false,
      attachToEdit: {
        name: ""
      }
    };
  },
  created() {
    this.cardToEdit = this.card;
  },
  mounted() {
    this.$refs.desc.innerText = this.cardToEdit.description;
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
    coverStyle() {
      if (!this.cardToEdit.style) return;
      const backgroundColor = this.cardToEdit.style.bgColor;
      if (this.cardToEdit.style.img) {
        return {
          backgroundImage: `url("${this.cardToEdit.style.img}")`,
          backgroundColor
        };
      }
      return {
        backgroundColor,
        height: "116px",
        minHeight: "116px"
      };
    },
    dateToShow() {
      const dateString = this.cardToEdit.dueDate;
      const dueDate = new Date(dateString);
      const time = this.formatAMPM(dueDate);
      if (new Date().getDate() === new Date(dateString).getDate())
        return "today" + time;
      else if (new Date().getDate() + 1 === new Date(dateString).getDate())
        return "tomorrow" + time;
      else if (new Date().getDate() - 1 === new Date(dateString).getDate())
        return "yesterday" + time;
      else if (new Date().getYear() === new Date(dateString).getYear()) {
        return this.formatDate(dueDate) + time;
      }
      return this.formatDate(dueDate) + ", " + dueDate.getFullYear() + time;
    },
    getLabels() {
      const allLabels = this.$store.getters.labels;
      const labelIds = this.card.labelIds;
      return labelIds.map(lId => allLabels.find(label => label.id === lId));
    },
    bgColor() {
      return this.cardToEdit.style.isDark
        ?  "#ffffff3d" 
        :  "#00000014" ;
    },
    textColor() {
      return this.cardToEdit.style.isDark
        ? "#fff" 
        :  "#172b4d" ;
    },
  },
  methods: {
    async removeCover() {
      this.cardToEdit.style = null;
      try {
        await this.updateCard();
        this.showCoverMenu = false;
      } catch (err) {
        console.log("cant remove cover", err);
      }
    },
    async makeCover(style) {
      console.log("style", style);
      // console.log(val);
      // this.cardToEdit.color = color;
      // this.cardToEdit.cover = val;
      this.cardToEdit.style = style;
      try {
        await this.updateCard();
      } catch (err) {
        console.log("cant make cover", err);
      }
    },
    async updateAttach() {
      const idx = this.cardToEdit.attachments.findIndex(
        currAttach => currAttach.id === this.attachToEdit.id
      );
      this.cardToEdit.attachments.splice(idx, 1, this.attachToEdit);
      try {
        await this.updateCard();
        this.openEditAttach = false;
        this.attachToEdit = {
          name: ""
        };
      } catch (err) {
        console.log("cant update attachment", err);
      }
    },
    openEdit(attach) {
      this.attachToEdit = JSON.parse(JSON.stringify(attach));
      this.openEditAttach = true;
    },
    deleteAttach(attach) {
      const idx = this.cardToEdit.attachments.findIndex(
        attachment => attachment.id === attach.id
      );
      this.cardToEdit.attachments.splice(idx, 1);
      this.updateCard();
    },
    updateDesc() {
      this.cardToEdit.description = this.$refs.desc.innerText;
      this.updateCard();
    },
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
    async addNewAttach(newAttach) {
      this.openAddAttach = false;
      newAttach.id = "A" + utilService.makeId();
      this.cardToEdit.attachments.push(newAttach);
      try {
        await this.updateCard();
        console.log(this.cardToEdit);
      } catch (err) {
        console.log("can't update card", err);
      }
    },
    async updateCard(ev) {
      this.isEditDesc = false;
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: JSON.parse(JSON.stringify(this.list)),
          card: JSON.parse(JSON.stringify(this.cardToEdit))
        });
        if (ev) ev.target.blur();
        // this.$emit('reload')
        // this.$router.matched[0].path.reload()
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    async removeCard() {
      if (!confirm("this action will delete the card! continue?")) return;
      try {
        await this.$store.dispatch({
          type: "removeCard",
          boardId: this.boardId,
          list: JSON.parse(JSON.stringify(this.list)),
          cardId: JSON.parse(JSON.stringify(this.cardToEdit.id))
        });
        this.closeModal();
      } catch (err) {
        console.log("cant remove card", err);
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
        this.newChecklist = { title: "Checklist" };
      } catch (err) {
        console.log("can't update card", err);
      }
    },
    async updateCL(checklist) {
      const idx = this.cardToEdit.checklists.findIndex(
        cl => cl.id === checklist.id
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
    }
  },
  components: {
    checklist,
    date,
    cardLabels,
    addAttachment,
    attachment,
    cover
  }
};
</script>

<style></style>

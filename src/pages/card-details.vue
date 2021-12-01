<template>
  <section v-if="list&&card" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div class="header-text">
          <input @blur="updateCard" v-model="card.title" />
          <h5>in list {{list.title}}</h5>
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
          <div class="dueDate" v-show="card.dueDate">
            <h4>Due date</h4>
            <div>
              <span>{{dateToShow}}</span>
              <span
                v-show="card.dueDate - Date.now() <= 86400000"
                :class="timeLabelColor"
                class="timeLabel"
              >{{timeLabel}}</span>
            </div>
          </div>
        </div>
        <div class="description">
          <header>
            <span class="fa fa-align-left"></span>
            <h4>Description</h4>
            <button v-show="card.description&&!isEditDesc" @click="setFocus">Edit</button>
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
        <!-- <button @click="showDate=!showDate">Date</button> -->
        <button>Checklist</button>
        <date @updateDate="updateDate" :cardDate="card.dueDate" class="date"></date>
      </div>
    </div>
  </section>
</template>

<script>
import date from "../cmps/date.cmp.vue";

export default {
  data() {
    return {
      lastCardDesc: null,
      isEditDesc: false,
      showDate: false
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
    timeLabelColor() {
      if (this.card.dueDate - Date.now() <= 0) {
        return "red";
      } else {
        return "yellow";
        // yellow due soon (today)
      }
    },
    dateToShow() {
      const timeStamp = this.card.dueDate;
      console.log(timeStamp);
      const dueDate = `${new Date(timeStamp)}`;
      // return (dueDate);
      const today = new Date();
      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        0,
        0,
        0
      );

      const milisecsUntilTommorow = tomorrow.getTime() - today.getTime();
      const milisecsPassedToday = 86400000 - milisecsUntilTommorow;

      if (timeStamp - Date.now() <= milisecsUntilTommorow
      && Date.now()-timeStamp <=milisecsPassedToday)
        return "today at " + `${dueDate}`.substring(16, 21);
      if (timeStamp - Date.now() >= milisecsUntilTommorow
      &&timeStamp-Date.now() <=milisecsUntilTommorow+86400000)
        return "tommorow at " + `${dueDate}`.substring(16, 21);
      if ( Date.now()-timeStamp >= milisecsPassedToday
      &&Date.now()-timeStamp <=milisecsPassedToday+86400000)
        return "yesterday at " + `${dueDate}`.substring(16, 21);

      return `${dueDate}`.substring(4,15);
    },
    timeLabel() {
      if (this.card.dueDate - Date.now() <= 0) {
        return "over due";
      } else {
        return "due soon";
        // yellow due soon (today)
      }
    }
  },
  methods: {
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push("/b/" + boardId);
    },
    async updateCard() {
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card: this.card
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
          card
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
      this.card.dueDate = date;
      await this.updateCard();
    }
  },
  components: {
    date
  }
};
</script>

<style>
</style>
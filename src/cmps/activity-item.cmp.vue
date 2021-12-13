<template>
  <div class="activity-item">
    <!-- {{ activity }} -->
    <avatar
      :username="activity.byMember.fullname"
      :size="32"
      :lighten="200"
      :src="activity.byMember.imgUrl"
      class="activity-avatar"
    ></avatar>
    <span class="activity-by">{{ activity.byMember.fullname }} </span>
    <span v-if="inCard">{{activitiesToShow}}</span>
    <span v-else>
      {{notificationToShow}}
      <span v-if="showCard">
        card 
        <span :class="{'grey': !activeLink}" @click="openCard" class="underline">{{activity.card.title}}</span>
      </span>
      <span v-if="showList"> in list {{activity.listTitle}}</span>
    </span>

    <span class="activity-time">{{ timeToShow(activity.createdAt) }}</span>
  </div>
</template>

<script>
import { utilService } from "../services/util.service.js";
import Avatar from "vue-avatar";
export default {
  props: {
    activity: {
      type: Object
    },
    idx: {
      type: Number
    },
    inCard: {
      type: Boolean
    }
  },
  data() {
    return {
      showList: false,
      showCard: false
    };
  },
  created() {
    // console.log("activity", this.activity);
    // console.log("idx", this.idx);
    // console.log("inCard", this.inCard);
  },
  methods: {
    timeToShow(timeStamp) {
      return utilService.timeSince(timeStamp);
    },
    openCard() {
      if (this.activeLink)
      this.$router.push(`/b/${this.$store.getters.boardId}/c/${this.activity.card.id}`);
    }
  },
  computed: {
    activitiesToShow() {
      const txtLength = this.activity.txt.length;
      return `${this.activity.txt}`.substring(txtLength - 5, txtLength) ===
        " list"
        ? `${this.activity.txt}`
        : this.activity.txt + "this card";
    },
    notificationToShow() {
      // added card
      const txtLength = this.activity.txt.length;
      if (
        `${this.activity.txt}`.substring(txtLength - 5, txtLength) === " list"
      )
        return `${this.activity.txt}`;
      if (!this.activity.card) return `${this.activity.txt}`;
      this.showCard = true;
      if (this.activity.listTitle) this.showList = true;
      return `${this.activity.txt}`;
    },
    activitiesLength() {
      return this.$store.getters.activitiesLength;
    },
    activeLink() {
      if (!this.activity.card) return false
      const board = this.$store.getters.board;
      // console.log("board", board);
      const cardId = this.activity.card.id;
      const list = board.lists.find(list => {
        return list.cards.find(card => card.id === cardId);
      });
      // console.log("list", list);
      if (!list) return false;
      const card = list.cards.find(card => card.id === cardId);
      // console.log("card", card);
      if (!card) return false;
      return true
    }
  },
  components: {
    Avatar
  }
};
</script>

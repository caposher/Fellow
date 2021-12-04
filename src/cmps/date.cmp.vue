<template>
  <section class="date-cmp action-btn">
    <!-- <section class="date-lib"> -->

    <date-picker
      :placeholder="datePlaceholder"
      locale="en"
      type="datetime"
      class="custom-input"
      label-class="icon-sm icon-clock"
      ref="date"
      v-model="newDate"
      @input="updateDate"
      format="YYYY-MM-DD HH:mm:ss"
      color="#0079bf"
      :class="{'long': datePlaceholder!== 'Dates'}"
      value
    ></date-picker>
    <span
      v-show="cardToEdit &&!cardToEdit.isComplete &&
      +new Date(cardToEdit.dueDate) - Date.now() <= 86400000
      "
      :class="timeLabelColor"
      class="time-label"
    >{{ timeLabel }}</span>
    <span 
    v-show="cardToEdit &&cardToEdit.isComplete" 
    class="time-label complete">complete</span>
  </section>
</template>

<script>
export default {
  props: {
    cardToEdit: {
      type: Object
    },
    cardDate: {
      type: [String, Date]
    },
    datePlaceholder: {
      type: String
    }
  },
  data() {
    return {
      newDate: ""
    };
  },
  created(){
  },
  methods: {
    async updateDate() {
      try {
        await this.$emit("updateDate", this.newDate);
        this.newDate = "";
      } catch (err) {
        console.log("update date in date err", err);
      }
    }
  },
  computed: {
    timeLabelColor() {
      if (!this.cardToEdit) return
      return +new Date(this.cardToEdit.dueDate) - Date.now() <= 0
        ? "over-due"
        : "due-soon";
    },
    timeLabel() {
      if (!this.cardToEdit) return

      return +new Date(this.cardToEdit.dueDate) - Date.now() <= 0
        ? "over due"
        : "due soon";
    }
  }
};
</script>

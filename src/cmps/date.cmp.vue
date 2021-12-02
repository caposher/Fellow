<template>
  <section class="date-cmp">
    <el-date-picker
      ref="date"
      @change="handleChange"
      @focus="setVal"
      format="HH:mm dd/MM/yyyy"
      value-format="timestamp"
      v-model="newDate"
      type="datetime"
      placeholder="Dates"
    ></el-date-picker>
  </section>
</template>

<script>
export default {
  props: {
    cardDate: {
      type: [String, Number]
    }
  },
  data() {
    return {
      clickOutsideFlag: false,
      childHandleClose: null,
      newDate: ""
    };
  },
  watch: {
    newDate(val) {
      if (val === null) {
        this.newDate = "";
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.childHandleClose = this.$refs.date.handleClose;
      this.$refs.date.handleClose = this.handleClose;
    });
  },
  methods: {
    setVal() {
      this.newDate = this.cardDate;
    },
    handleChange() {
      if (!this.clickOutsideFlag) {
        this.$emit("updateDate", this.newDate);
      } else {
        this.clickOutsideFlag = false;
      }
      this.newDate = null;
      this.value = null;
    },
    handleClose() {
      if (this.$refs.date.pickerVisible) {
        this.clickOutsideFlag = true;
        this.childHandleClose();
      }
        this.newDate = null;
        this.value = null;
    }
  }
};
</script>
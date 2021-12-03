<template>
  <section class="date-cmp action-btn">
    <!-- <section class="date-lib"> -->

    <date-picker
      placeholder="Dates"
      locale="en"
      type="datetime"
      label-class="icon-sm icon-clock"
      ref="date"
      v-model="newDate"
      @input="updateDate"
      format="YYYY-MM-DD HH:mm:ss"
      color="#0079bf"
      value=""
    ></date-picker>
      <!-- initial-value="cardDate" -->
      
      <!-- name="my_date"
      input-class="form-control form-control-lg"
      v-model="value" -->
    <!-- </section> -->
    <!-- value="cardDate || Date.now()" -->
    <!-- <span class="vpd-input-group">
   </span> --> 
    <!-- <span class="icon-sm icon-clock"></span> -->

    <!-- <el-date-picker
      ref="date"
      @change="handleChange"
      @focus="setVal"
      format="HH:mm dd/MM/yyyy"
      value-format="timestamp"
      v-model="newDate"
      type="datetime"
      placeholder="Dates"
    ></el-date-picker>-->
  </section>
</template>

<script>
export default {
  props: {
    cardDate: {
      type: [String, Date]
    }
  },
  data() {
    return {
      newDate: ""
    };
  },
  methods: {
    async updateDate() {
      // console.log(this.$refs.date)
      try{
        await this.$emit("updateDate", this.newDate);
      this.newDate = '';
      console.log(this. newDate);
      }catch(err){
        console.log('update date in date err', err);
      }
    }
    //   setVal() {
    //     this.newDate = this.cardDate;
    //   },
    //   handleChange() {
    //     if (!this.clickOutsideFlag) {
    //       this.$emit("updateDate", this.newDate);
    //     } else {
    //       this.clickOutsideFlag = false;
    //     }
    //     this.newDate = null;
    //     this.value = null;
    //   },
    //   handleClose() {
    //     if (this.$refs.date.pickerVisible) {
    //       this.clickOutsideFlag = true;
    //       this.childHandleClose();
    //     }
    //       this.newDate = null;
    //       this.value = null;
    //   }
  },
  computed:{

  }
};
</script>
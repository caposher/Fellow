<template>
  <section v-show="showPopup" class="card-popup notification-popup">
    <header class="popup-header">
      <h4>Notifications</h4>
      <!-- {{activities}} -->
      <div @click="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
    </header>
    <!-- <section class="notification-body">
      <section v-for="(activity,idx) in getLatestActivities" :key="activity.id">
        <activity-item :activity="activity" :idx="idx" :inCard="false" />
      </section>
    </section> -->
  </section>
</template>

<script>
import activityItem from '../cmps/activity-item.cmp.vue';
export default {
  props: {
    showPopup: {
      type: Boolean,
    },
    activities: {
      type: Array,
    },
  },
  created(){
// console.log(this.activities);
  },
  computed: {
    getLatestActivities() {
      // console.log('this.activities.', this.activities);
      return this.activities.slice(0, 10);
    },
  },
  components: {
    activityItem,
  },
};
</script>

<style></style>

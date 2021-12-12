<template>
  <section v-show="showPopup" class="card-popup notification-popup">
    <header class="popup-header">
      <h4>Notifications</h4>
      <div @click="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
    </header>
    <section class="notification-body">
      <section v-for="activity in getLatestActivities" :key="activity.id">
        <activity-item :activity="activity" />
      </section>
    </section>
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
  computed: {
    getLatestActivities() {
      return this.activities.slice(0, 10).reverse();
    },
  },
  components: {
    activityItem,
  },
};
</script>

<style></style>

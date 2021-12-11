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
    <span class="activity-by">{{ activity.byMember.fullname }}</span>
    {{ activity.txt }}this card
    <span class="activity-time"> {{ timeToShow(activity.createdAt) }}</span>
  </div>
</template>

<script>
import { utilService } from '../services/util.service.js';
import Avatar from 'vue-avatar';
export default {
  props: {
    activity: Object,
  },
  methods: {
    timeToShow(timeStamp) {
      return utilService.timeSince(timeStamp);
    },
  },
  components: {
    Avatar,
  },
};
</script>

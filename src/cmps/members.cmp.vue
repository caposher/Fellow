<template>
  <section class="card-popup label-popup">
    <header class="popup-header">
      <h4>Members</h4>
      <div @click="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
      <!-- <button class="close-label-popup" @click="$emit('close')">X</button> -->
    </header>
    <input type="text" placeholder="Search members" />
    <form @submit.prevent="">
      <h5>Board members</h5>
      <ul>
        <li
          class="item js-member-item active selected"
          v-for="member in membersToShow"
          :key="member.id"
          @click="toggleMember(member)"
        >
          <a
            class="name js-select-member member-container"
            href="#"
            :memberId="member._id"
            :title="`${member.fullname} (${member.username})`"
            :autocompletetext="member.username"
          >
            <p
              class="member js-member member-icon"
              :style="{ backgroundColor: member.color }"
            >
              {{ iconToShow(member) }}
            </p>
            <!-- <p class="member-avatar">{{ iconToShow(member) }}</p> -->
            <!-- <img
                class="member-avatar"
                height="30"
                width="30"
                src="https://trello-members.s3.amazonaws.com/619fe0a5bfaa03163f844a19/30c68a5fe55968e001394575e5d5c4cc/30.png"
                srcset="
                  https://trello-members.s3.amazonaws.com/619fe0a5bfaa03163f844a19/30c68a5fe55968e001394575e5d5c4cc/30.png 1x,
                  https://trello-members.s3.amazonaws.com/619fe0a5bfaa03163f844a19/30c68a5fe55968e001394575e5d5c4cc/50.png 2x
                "
                :title="`${member.fullname} (${member.username})`"
              /> -->
            <!-- <span :id="member._id"> </span> -->
            <!-- </p> -->
            <p
              class="full-name"
              :name="`${member.fullname} (${member.username})`"
            >
              {{ member.fullname }}
            </p>

            <p class="username">({{ member.username }})</p>
            <!-- </p> -->
            <span
              class="icon-sm icon-check checked-icon"
              :style="{
                display: checkMember(member._id) ? 'block' : 'none',
              }"
            ></span>
          </a>
        </li>
      </ul>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    cardMembers: {
      type: Array,
    },
  },
  data() {
    return {
      selectedMembers: JSON.parse(JSON.stringify(this.cardMembers)),
      allMembers: this.$store.getters.board.members,
    };
  },

  methods: {
    setColor(colorClass) {
      return `${colorClass} ${colorClass}-lg`;
    },
    checkMember(memberId) {
      return this.selectedMembers.find((member) => member._id === memberId);
    },
    toggleMember(member) {
      if (this.checkMember(member._id)) {
        const idx = this.selectedMembers.findIndex(
          (mbr) => mbr._id === member._id
        );
        this.selectedMembers.splice(idx, 1);
      } else {
        this.selectedMembers.push(member);
      }
      this.$emit("update", JSON.parse(JSON.stringify(this.selectedMembers)));
    },
    iconToShow(member) {
      var matches = member.fullname.match(/\b(\w)/g);
      var acronym = matches.join("").toUpperCase();
      return acronym;
    },
  },
  computed: {
    membersToShow() {
      const members = JSON.parse(JSON.stringify(this.allMembers));
      const user = this.$store.getters.user;
      members.unshift(this.$store.getters.board.createdBy);
      const idx = members.findIndex((mbr) => mbr._id === user._id);
      members.splice(idx, 1);
      members.unshift(user);
      return members;
    },
  },
};
</script>

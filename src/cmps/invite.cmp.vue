<template>
  <section class="card-popup members-popup invite">
    <header class="popup-header">
      <h4>Invite to Board</h4>
      <div @click.stop="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
    </header>
    <input
      type="text"
      placeholder="Email address or name"
      v-model="filterBy.txt"
      @change="searchMembers"
    />
    <form @submit.prevent="">
      <ul class="invite-body">
        <li
          class="item js-member-item active selected"
          v-for="member in searchedMembers"
          :key="member.id"
          @click="addMember(member)"
          :class="{ disable: isMember }"
        >
          <a
            class="name js-select-member member-container"
            href="#"
            :memberId="member._id"
            :title="`${member.fullname} (${member.username})`"
            :autocompletetext="member.username"
          >
            <avatar
              :username="member.fullname"
              :size="32"
              :lighten="200"
              :src="member.imgUrl"
              class="invite-icon"
            ></avatar>
            <p
              class="full-name"
              :name="`${member.fullname} (${member.username})`"
            >
              {{ member.fullname }}
            </p>
            <p class="username">({{ member.username }})</p>
            <!-- <span
              class="icon-sm icon-check checked-icon"
              :style="{
                display: checkMember(member._id) ? 'block' : 'none',
              }"
            ></span> -->
          </a>
        </li>
      </ul>
    </form>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import { userService } from "../services/user.service";

export default {
  // props: {
  //   boardMembers: {
  //     type: Array,
  //   },
  // },
  data() {
    return {
      // selectedMembers: JSON.parse(JSON.stringify(this.boardMembers)),
      searchedMembers: null,
      filterBy: {
        txt: "",
      },
    };
  },
  async created() {
    // try {
    //   this.searchMembers();
    // } catch (err) {
    //   console.log("err", err);
    // }
  },
  methods: {
    isMember(memberId) {
      // if (!this.$store.getters.card) return;
      // return this.$store.getters.board.members.find(
      //   (member) => member._id === memberId
      // );
      // return this.selectedMembers.find((member) => member._id === memberId);
    },
    async searchMembers() {
      try {
        this.searchedMembers = await userService.query(this.filterBy);
        console.log("searchedMembers", this.searchedMembers);
      } catch (err) {
        console.log("err", err);
      }
    },
    addMember(member) {
      console.log("member", member);
      this.$emit("update", JSON.parse(JSON.stringify(member)));
    },
    toggleMember(member) {
      // if (this.checkMember(member._id)) {
      //   const idx = this.selectedMembers.findIndex(
      //     (mbr) => mbr._id === member._id
      //   );
      //   this.selectedMembers.splice(idx, 1);
      // } else {
      //   this.selectedMembers.push(member);
      // }
      // this.$emit("update", JSON.parse(JSON.stringify(this.selectedMembers)));
    },
  },
  computed: {
    membersToShow() {
      // const members = JSON.parse(JSON.stringify(this.allMembers));
      // const user = this.$store.getters.user;
      // const idx = members.findIndex((mbr) => mbr._id === user._id);
      // members.splice(idx, 1);
      // members.unshift(user);
      // return members;
    },
  },
  components: {
    Avatar,
  },
};
</script>

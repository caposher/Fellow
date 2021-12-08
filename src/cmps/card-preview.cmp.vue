<template>
  <section class="card" :class="{ 'with-cover': card.style }" @click="showDetails" v-if="card">
    <div class="cover-img" v-show="card.style" :style="getCover"></div>
    <!-- <div> -->
    <!-- <section class="label-and-q-edit"> -->
    <span class="card-wrapper" @click.stop.prevent>
      <span
        v-for="label in getLabels"
        :key="label.id"
        :class="[label.colorClass, setLabelClass]"
        class="open-label"
        @click="onLabelClick"
        @mouseover="islabelHover = true"
        @mouseleave="islabelHover = false"
      >
        <span class="text-label">{{ label.txt }}</span>
      </span>
    </span>
    <span class="edit-wrapper">
      <span class="icon-sm icon-edit q-edit"></span>
    </span>
    <!-- </section> -->
    <!-- <button>Quick edit</button> -->
    <!-- </div> -->
    <section class="card-title">
      <p>{{ card.title }}</p>
    </section>
    <section class="card-icons">
      <div class="icon-wrapper" v-if="card.isWatch">
        <span class="icon-sm icon-watch badge"></span>
      </div>
      <div class="icon-wrapper" v-if="card.dueDate">
        <span class="clock icon-sm icon-clock badge"></span>
        <span class="icon-text">{{ dateToShow }}</span>
      </div>
      <div class="icon-wrapper" v-if="card.description">
        <span class="icon-sm icon-desc badge"></span>
      </div>
      <div class="icon-wrapper" v-if="card.attachments && card.attachments.length">
        <span class="icon-sm icon-attach badge"></span>
        <span class="icon-text">{{ card.attachments.length }}</span>
      </div>
      <div class="icon-wrapper" v-if="card.checklists && card.checklists.length && todos">
        <span class="icon-sm icon-checklist badge"></span>
        <span class="icon-text">{{ doneTodos }}/{{ todos }}</span>
      </div>
    </section>
    <div v-show="card.members.length" class="card-members-preview">
      <avatar
        v-for="member in card.members"
        :key="member.id"
        :username="member.fullname"
        :size="28"
        :lighten="200"
        :src="member.imgUrl"
        class="member-avatar"
      ></avatar>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  props: {
    card: {
      type: Object,
    },
    list: {
      type: Object,
    },
    labelsState: {
      type: Boolean,
    },
  },
  data() {
    return {
      islabelHover: false,
      // todos: 0,
      // doneTodos: 0
    };
  },
  methods: {
    showDetails() {
      this.$router.push(this.$route.path + '/c/' + this.card.id);
    },
    formatDate(dueDate) {
      var date = dueDate.getDate();
      var month = `${dueDate}`.substring(4, 7);
      const strDate = `${month} ${date}`;
      return strDate;
    },
    onLabelClick() {
      this.$store.commit({
        type: 'toggleLabel',
        labelsState: this.labelsState,
      });
    },
    // getShouldAcceptDrop(index, src, payload) {
    //   // console.log("index", index);
    //   // console.log("src", src);
    //   // console.log("payload", payload);
    // },
    // getChildPayload(detachList) {
    //   // console.log((index) => detachList.members[index]);
    //   // return (index) => detachList.cards[index];
    // },
    // onMemberDrop(targetList, dropResult) {
    //   const { addedIndex, removedIndex, payload } = dropResult;
    //   console.log(dropResult, targetList);
    // },
  },
  computed: {
    todos() {
      var todos = 0;
      if (this.card.checklists && this.card.checklists.length) {
        this.card.checklists.forEach((checklist) => {
          if (checklist.todos && checklist.todos.length) {
            checklist.todos.forEach((todo) => {
              todos++;
            });
          }
        });
      }
      return todos;
    },
    doneTodos() {
      var doneTodos = 0;
      if (this.card.checklists && this.card.checklists.length) {
        this.card.checklists.forEach((checklist) => {
          if (checklist.todos && checklist.todos.length) {
            checklist.todos.forEach((todo) => {
              if (todo.isDone) doneTodos++;
            });
          }
        });
      }
      return doneTodos;
    },
    getLabels() {
      const allLabels = this.$store.getters.labels;
      const labelIds = this.card.labelIds;
      return labelIds.map((lId) => allLabels.find((label) => label.id === lId));
    },
    setLabelClass() {
      let classes = `preview-label${this.labelsState ? '' : '-close'}`;
      return classes;
    },

    dateToShow() {
      const dueDate = new Date(this.card.dueDate);
      if (new Date().getYear() === new Date(this.card.dueDate).getYear()) {
        return this.formatDate(dueDate);
      }

      return this.formatDate(dueDate) + ', ' + dueDate.getFullYear();
    },
    ChecklistNum() {
      var doneTodos = 0;
      this.card.checklists.forEach((checklist) => {
        checklist.todos.forEach((todo) => {
          if (todo.isDone) doneTodos++;
          else undoneTodos++;
        });
      });
      return `${undoneTodos}/${doneTodos}`;
    },
    getCover() {
      if (!this.card.style) return;
      const backgroundColor = this.card.style.bgColor;
      if (!this.card.style.img) {
        return {
          backgroundColor,
          height: '32px',
          minHeight: '32px',
        };
      }
      return {
        height: '163.58px',
        backgroundColor,
        backgroundImage: `url("${this.card.style.img}")`,
      };
    },
  },
  components: { Avatar, Container, Draggable },
};
</script>

<style></style>

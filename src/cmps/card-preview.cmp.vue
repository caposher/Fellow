<template>
  <section class="card" @click="showDetails">
    <img v-show="card.cover" :url="card.cover" class="card-cover" />
    <!-- <div> -->
    <section class="label-and-q-edit">
      <span>
        <span
          v-for="label in getLabels"
          :key="label.id"
          :class="label.colorClass"
          class="preview-label"
        >{{ label.txt }}</span>
      </span>
      <span class="edit-wrapper">
        <span class="icon-sm icon-edit q-edit"></span>
      </span>
    </section>
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
        <span class="icon-sm icon-clock badge"></span>
        <span class="icon-text">{{ dateToShow }}</span>
      </div>
      <div class="icon-wrapper" v-if="card.description">
        <span class="icon-sm icon-desc badge"></span>
      </div>
      <div class="icon-wrapper" v-if="card.attachments && card.attachments.length">
        <span class="icon-sm icon-attach badge"></span>
        <span class="icon-text">{{ card.attachments.length }}</span>
      </div>
      <div class="icon-wrapper" v-if="card.checklists&& card.checklists.length && todos">
        <span class="icon-sm icon-checklist badge"></span>
        <span class="icon-text">{{ doneTodos }}/{{ todos }}</span>
      </div>
    </section>
    <div class="card-members"></div>
  </section>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
    },
    list: {
      type: Object,
    },
  },
  data() {
    return {
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
  },
  computed: {
    todos() {
      var todos = 0;
      // console.log(this.card.checklists);
      if (this.card.checklists && this.card.checklists.length) {
        this.card.checklists.forEach((checklist) => {
          if (checklist.todos && checklist.todos.length) {
            checklist.todos.forEach((todo) => {
              todos++;
            });
          }
        });
      }
      console.log(todos);
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
  },
  components: {},
};
</script>

<style></style>

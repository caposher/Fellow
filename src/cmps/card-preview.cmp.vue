<template>
  <section
    class="card"
    ref="card"
    :class="{'with-cover': card.style, 'is-quick': isQuick}"
    @click="showDetails"
    v-if="card"
  >
    <button v-show="isQuick" @click.stop="isQuick=false">close</button>
    <div class="cover-img" v-show="card.style" :style="getCover"></div>
    <!-- <div> -->
    <span class="card-wrapper" @click.stop.prevent>
      <span
        v-for="label in getLabels"
        :key="label.id"
        :class="[label.colorClass, setLabelClass]"
        class="open-label"
        @click.stop="onLabelClick"
        @mouseover="islabelHover = true"
        @mouseleave="islabelHover = false"
      >
        <span class="text-label">{{ label.txt }}</span>
      </span>
    </span>
    <span class="edit-wrapper" v-show="!isQuick" @click.stop="openQuick">
      <span class="icon-sm icon-edit q-edit"></span>
    </span>
    <section class="card-title" v-show="!isQuick">
      <p :ref="card.id">{{ card.title }}</p>
    </section>
    <section class="edit-title" v-if="isQuick">
      <textarea
        v-focus="isQuick"
        @focus="$event.target.select()"
        ref="text"
        :style="{'height': height }"
        @input="checkHeight"
        v-model="cardToEdit.title"
      ></textarea>
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
import { focus } from "vue-focus";
import Avatar from 'vue-avatar';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  directives: { focus },
  props: {
    card: {
      type: Object
    },
    list: {
      type: Object
    },
    labelsState: {
      type: Boolean
    }
  },
  data() {
    return {
      islabelHover: false,
      isQuick: false,
      pos: null,
      cardToEdit: {
        title: ""
      },
      height: ""
      // todos: 0,
      // doneTodos: 0
    };
  },
  mounted() {
    this.height = this.$refs[this.card.id].clientHeight +'px';
    // console.log("m", this.$refs);
    // console.log("h", this.height);
  },
  methods: {
    checkHeight() {
      if (!this.isQuick || !this.$refs.text) console.log("N");
      console.log("text", this.$refs.text.scrollHeight);
      this.height = this.$refs.text.scrollHeight + "px";
    },
    showDetails() {
      if (this.isQuick) return;
      this.$router.push(this.$route.path + "/c/" + this.card.id);
    },
    formatDate(dueDate) {
      var date = dueDate.getDate();
      var month = `${dueDate}`.substring(4, 7);
      const strDate = `${month} ${date}`;
      return strDate;
    },
    onLabelClick() {
      this.$store.commit({
        type: "toggleLabel",
        labelsState: this.labelsState
      });
    },
    openQuick(ev) {
      console.log(ev);
      this.pos = {
        x: ev.clientX,
        y: ev.clientY
      };
      this.cardToEdit = JSON.parse(JSON.stringify(this.card));
      this.isQuick = true;
    }
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
        this.card.checklists.forEach(checklist => {
          if (checklist.todos && checklist.todos.length) {
            checklist.todos.forEach(todo => {
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
        this.card.checklists.forEach(checklist => {
          if (checklist.todos && checklist.todos.length) {
            checklist.todos.forEach(todo => {
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
      return labelIds.map(lId => allLabels.find(label => label.id === lId));
    },
    setLabelClass() {
      let classes = `preview-label${this.labelsState ? "" : "-close"}`;
      return classes;
    },

    dateToShow() {
      const dueDate = new Date(this.card.dueDate);
      if (new Date().getYear() === new Date(this.card.dueDate).getYear()) {
        return this.formatDate(dueDate);
      }

      return this.formatDate(dueDate) + ", " + dueDate.getFullYear();
    },
    ChecklistNum() {
      var doneTodos = 0;
      this.card.checklists.forEach(checklist => {
        checklist.todos.forEach(todo => {
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
        backgroundImage: `url("${this.card.style.img}")`
      };
    },
  },
  components: { Avatar, Container, Draggable },
};
</script>

<style></style>

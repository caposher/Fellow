<template>
  <section v-if="card" class="quick-edit" :class="{'with-cover': card.style}" :style="qStyle">
    <button @click="closeEdit">X</button>
    <div class="cover-img" v-show="card.style" :style="getCover"></div>
    <span class="card-wrapper" @click.stop.prevent>
      <span
        v-for="label in getLabels"
        :key="label.id"
        :class="[label.colorClass, setLabelClass]"
        class="open-label"
      >
        <span class="text-label">{{ label.txt }}</span>
      </span>
    </span>
    <section class="card-title" >
      <!-- <div
      
        contenteditable="true"
        ref="desc"
        class="desc"
        @click="setFocus"
      ></div> -->
      <textarea :style="textareaStyle" ref="desc" v-model="card.title"></textarea>
      <!-- @focus="setEditDesc" -->
      <!-- <p>{{ card.title }}</p> -->
    </section>
    <section class="card-icons">
      <div class="icon-wrapper" v-if="card.isWatch">
        <span class="icon-sm icon-watch badge"></span>
      </div>
      <div class="icon-wrapper" v-if="card.dueDate">
        <span class="clock icon-sm icon-clock badge"></span>
        <!-- <span class="icon-text">{{ dateToShow }}</span> -->
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
        <!-- <span class="icon-text">{{ doneTodos }}/{{ todos }}</span> -->
      </div>
    </section>
    <div class="card-members"></div>
  </section>
</template>

<script>
import { focus } from "vue-focus";
export default {
  directives: { focus },
  // props: {
  //   card: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      editTitle: false
    };
  },
  created(){

    // this.$refs.desc.select()
  },
  mounted() {
    console.log("text", this.$refs.desc.scrollHeight);
    // this.$refs.desc.innerText = this.card.title;
  },
  created() {
    // console.log(this.card);
  },
  methods: {
    closeEdit() {
      this.$store.dispatch({ type: "qEdit", card: null });
    },
    setFocus(ev){
      console.log(ev);
       this.$refs.desc.focus()
    }
  },
  computed: {
    textareaStyle() {
    },
    card() {
      console.log(this.$store.getters.qEdit);
      return this.$store.getters.qEdit;
    },
    getLabels() {
      const allLabels = this.$store.getters.labels;
      const labelIds = this.card.labelIds;
      return labelIds.map(lId => allLabels.find(label => label.id === lId));
    },
    getCover() {
      if (!this.card.style) return;
      const backgroundColor = this.card.style.bgColor;
      if (!this.card.style.img) {
        return {
          backgroundColor,
          height: "32px",
          minHeight: "32px"
        };
      }
      return {
        height: "163.58px",
        backgroundColor,
        backgroundImage: `url("${this.card.style.img}")`
      };
    },
    setLabelClass() {
      let classes = `preview-label${this.labelsState ? "" : "-close"}`;
      return classes;
    },
    qStyle() {
      const pos = this.card.pos;
      console.log(pos);
      return {
        // top: pos.y +'px',
        // left: pos.x-248  +'px '
      };
    }
  }
};
</script>

<style>
</style>
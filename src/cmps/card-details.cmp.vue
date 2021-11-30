<template>
  <section v-if="card &&list">
    <header>
      <textarea :value="card.title"></textarea>
      <!-- list is link to list -->
      <h5>in list {{list.title}}</h5>
    </header>
    <div class="main-details">
      <p>v-if watch icon</p>
      <div>
        <!-- v-for labels - gets from store labels by id -->
        <button>Labels</button>
        <!-- members -->
        <!-- date -->
      </div>
      <div class="description">
        <span>icon</span>
        <h4>Description</h4>
        <textarea></textarea>
        <button>undo</button>
        <button>save</button>
      </div>
    </div>
    <div class="side-menu">
      <!-- side menu renders cmp in click -->
      <button>Labels</button>
      <button>Members</button>
      <button>Date</button>
      <button>Checklist</button>
    </div>
  </section>
</template>

<script>
// prop card
// prop mini-list
export default {
  async created() {
    const { cardId } = this.$route.params;
    const { boardId } = this.$route.params;
    console.log();
    try {
      await this.$store.dispatch({ type: "loadListAndCard", boardId, cardId });
      // console.log('board', board);
      // this.board = this.$store.getters.board
    } catch (err) {
      console.log("problem with getting board", err);
    }
  },
  computed: {
    card(){
      console.log('this.$store.getters.card', this.$store.getters.card);
      return this.$store.getters.card
    },
    list(){
      console.log('this.$store.getters.list', this.$store.getters.list);
      return this.$store.getters.list
    }
  }
};
</script>

<style>
</style>
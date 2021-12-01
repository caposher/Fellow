<template>
  <section v-if="list&&card" class="card-details">
    <header>
      <textarea :value="card.title"></textarea>
      <h5>in list {{list.title}}</h5>
    </header>
    <div class="main-details">
      <div class="icon-header">
        <p>v-if watch icon</p>
        <div class="labels">
          <!-- v-for labels - gets from store labels by id -->
          <button>Labels</button>
          <!-- members -->
          <!-- date -->
        </div>
      </div>
      <div class="description">
        <span>icon</span>
        <h4>Description</h4>
        <textarea></textarea>
        <button>undo</button>
        <button>save</button>
      </div>
      <div class="activity-log">
        <span>icon</span>
        <h4>activities</h4>
        <textarea></textarea>
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
export default {
  computed: {
    card() {
      console.log("card", this.$store.getters.card);
      return this.$store.getters.card;
    },
    list() {
      console.log("list", this.$store.getters.list);
      return this.$store.getters.list;
    }
  }
};
</script>

<style>
</style>
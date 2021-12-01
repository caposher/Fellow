<template>
  <section v-if="list&&card" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div>
          <input @input="updateCard" v-model="card.title" />
          <h5>in list {{list.title}}</h5>
        </div>
      </div>
    </header>
    <div class="card-body">
      <div class="main-details">
        <div class="icon-header">
          <div class="labels">
            <!-- watch -->
            <!-- <button>Labels</button> -->
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
          <input />
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
    },
    boardId(){
      return this.$store.getters.boardId;

    }
  },
  methods: {
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push("/b/" + boardId);
    },
    async updateCard(){
      try{
        this.$store.dispatch({type: 'updateCard',boardId:this.boardId, list: this.list, card:this.card})
      }
      catch(err){
        console.log('cant update card', err);
      }
    }
  }
};
</script>

<style>
</style>
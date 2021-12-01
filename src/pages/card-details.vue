<template>
  <section v-if="list&&card" class="card-details">
    <header>
      <button @click="closeModal" class="close">x</button>
      <div class="header">
        <span class="fa fa-newspaper"></span>
        <div class="header-text">
          <input @blur="updateCard" v-model="card.title" />
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
          <header>
            <span class="fa fa-align-left"></span>
            <h4>Description</h4>
            <button v-show="card.description&&!isEditDesc" @click="setFocus">Edit</button>
          </header>
          <textarea
            ref="desc"
            @focus="setEditDesc"
            @blur="updateCard"
            placeholder="Add a more detailed description..."
            v-model="card.description"
          ></textarea>
          <div class="buttons" v-show="isEditDesc">
            <button class="save">save</button>
            <button @click.stop="undoDesc">X</button>
          </div>
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
  data() {
    return {
      lastCardDesc: null,
      isEditDesc: false
    };
  },
  computed: {
    card() {
      return this.$store.getters.card;
    },
    list() {
      return this.$store.getters.list;
    },
    boardId() {
      return this.$store.getters.boardId;
    }
  },
  methods: {
    closeModal() {
      const { boardId } = this.$route.params;
      this.$router.push("/b/" + boardId);
    },
    async updateCard() {
      if (this.card.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card: this.card
        });
        this.isEditDesc = false;
        console.log("card updated");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    setEditDesc() {
      this.lastCardDesc = this.card.description;
      this.isEditDesc = true;
    },
    async undoDesc() {
         if (this.card.description === this.lastCardDesc) {
        this.isEditDesc = false;
        return;
      }
      var card = this.card;
      card.description = this.lastCardDesc;
      try {
        await this.$store.dispatch({
          type: "updateCard",
          boardId: this.boardId,
          list: this.list,
          card
        });
        console.log("card desc undo");
      } catch (err) {
        console.log("cant update card", err);
      }
    },
    setFocus() {
      this.isEditDesc = true;
      this.$refs.desc.focus();
    }
  }
};
</script>

<style>
</style>
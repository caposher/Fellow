<template>
  <section class="home">
    <ul>
      <li v-for="board in boards" :key="board._id">
        <router-link :to="'/b/'+board._id">{{board.title}}</router-link>
      </li>
      <li @click="createBoard">Add board</li>
    </ul>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      user: null
    };
  },
  async created() {
    // get userId
    await this.$store.dispatch({type:"loadBoards"});
  },
  computed:{
    boards(){
     return this.$store.getters.boards
    }
  },
  methods: {
    async createBoard() {
      const title = prompt('add title')
      try{
        const board = await this.$store.dispatch({type:'createBoard', title})
        this.$router.push('/b/'+board._id)
      }catch(err){
        console.log('cant get new board', err);
      }
    }
  },
  components: {}
};
</script>

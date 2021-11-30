<template>
  <li>
    <header>
      <h4>{{list.title}}</h4>
      <button class="actions">...</button>
    </header>
    <ul v-for="card in list.cards" :key="card.id">
    <!-- v-for cards in list.cards  :mini-list="mini-list"-->
    <card-list :card="card" :list="list"></card-list>
    </ul>
    <footer>
      <button @click="addCard">+Add card</button>
    </footer>
  </li>
</template>

<script>
import cardList from "./card-list.cmp.vue";

// props- list
export default {
  props:{
    list:{
      type:Object
    }
  },
  methods:{
    async addCard(){
       const title = prompt('card title')
      try{
        this.$store.dispatch({type:'addCard',boardId:this.$store.getters.boardId,list: this.list, title})
      }
      catch(err){
        console.log('cant add card', err);
      }
    }
  },
  components: {
    cardList
  }
};
</script>

<style>
</style>
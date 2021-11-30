<template>
  <li>
    <header>
      <h4>{{list.title}}</h4>
      <div class="actions"></div>
    </header>
    <ul>
    <!-- v-for cards in list.cards  :mini-list="mini-list"-->
    <card-list></card-list>
    </ul>
    <footer>
      <button>+Add card</button>
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
  components: {
    cardList
  }
};
</script>

<style>
</style>
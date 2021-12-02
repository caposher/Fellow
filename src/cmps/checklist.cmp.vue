<template>
  <section>
    <h4>{{ checklist.title }}</h4>
    <ul>
      <li v-for="(todo, idx) in checklist.todos" :key="idx">
        <span @click="updateTodo(todo)">{{ todo.title }}</span>
      </li>
      <section v-if="newTodo">
        <form @submit.prevent="updateCL">
          <input
            placeholder="Add an item"
            v-model="todoToAdd.title"
            @blur="newTodo = false"
          />
          <br />
          <button>Add</button><span @click="this.newTodo = false">X</span>
        </form>
      </section>
      <span v-else @click="newTodo = true">Add an item</span>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    checklist: {
      type: Object,
    },
  },
  data() {
    return {
      //   CLtoUpdate: JSON.parse(JSON.stringify(this.checklist)),
      todoToAdd: {
        title: "",
        isDone: false,
      },
      newTodo: false,
    };
  },
  methods: {
    addTodo() {
      this.newTodo = true;
    },
    updateTodo(todo) {
      this.newTodo = true;
      this.todoToAdd = { ...todo };
    },
    updateCL(ev) {
      if (!ev.target[0].value) return;
      this.$emit(
        "updateCL",
        this.todoToAdd,
        this.checklist.id,
        this.checklist.title
      );
      this.todoToAdd = {};
    },
  },
};
</script>

<style></style>

<template>
  <section>
    <form v-if="editTitle" @submit.prevent="updateCL">
      <input
        placeholder="Add an item"
        v-model="CLtoUpdate.title"
        @blur="(editTitle = false), updateCL"
      />
    </form>
    <section v-else>
      <h4 @click="editTitle = true">{{ checklist.title }}</h4>
      <button @click="deleteCL">Delete</button>
    </section>
    <ul>
      <li v-for="(todo, idx) in checklist.todos" :key="idx">
        <span @click="editTodo(todo)">{{ todo.title }}</span
        ><span @click="removeTodo(todo.id)">X</span>
      </li>
      <section v-if="newTodo">
        <form @submit.prevent="updateTodo">
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
import { utilService } from "../services/util.service.js";

export default {
  props: {
    checklist: {
      type: Object,
    },
  },
  data() {
    return {
      CLtoUpdate: JSON.parse(JSON.stringify(this.checklist)),
      todoToAdd: {
        title: "",
        isDone: false,
      },
      newTodo: false,
      editTitle: false,
    };
  },
  methods: {
    addTodo() {
      this.newTodo = true;
    },
    editTodo(todo) {
      this.newTodo = true;
      this.todoToAdd = { ...todo };
    },
    updateTodo(ev) {
      if (!ev.target[0].value) return;
      let todo = JSON.parse(JSON.stringify(this.todoToAdd));
      if (todo.id) {
        const todoIdx = this.CLtoUpdate.todos.findIndex(
          (td) => td.id === todo.id
        );
        this.CLtoUpdate.todos.splice(todoIdx, 1, todo);
      } else {
        console.log("new");
        todo.id = "TD" + utilService.makeId();
        if (this.CLtoUpdate.todos) {
          this.CLtoUpdate.todos.push(todo);
        } else this.CLtoUpdate.todos = [todo];
      }
      this.updateCL();
    },
    removeTodo(todoId) {
      console.log("removing", todoId);
      const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todoId);
      this.CLtoUpdate.todos.splice(idx, 1);
      this.updateCL();
    },
    updateCL() {
      this.$emit("updateCL", JSON.parse(JSON.stringify(this.CLtoUpdate)));
      this.todoToAdd = {};
      this.editTitle = false;
    },
    deleteCL() {
      if (confirm("Are you sure?")) {
        delete this.CLtoUpdate.title;
        this.$emit("updateCL", this.CLtoUpdate);
      }
    },
  },
};
</script>

<style></style>

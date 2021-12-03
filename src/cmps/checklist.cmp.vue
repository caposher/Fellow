<template>
  <section class="checklist">
    <form class="editor" v-show="editTitle" @submit.prevent="updateCL">
      <textarea placeholder="Add an item" v-model="CLtoUpdate.title" @blur="updateCL" />
      <button class="submit-btn">Save</button>
      <!-- <button>X</button> -->
    </form>
    <section v-show="!editTitle" class="checklist-header">
      <h3 @click="editTitle = true">{{ checklist.title }}</h3>
      <span class="checklist-actions">
        <button v-if="doneTodos > 0" class="action-btn checklist-btn" @click.stop="hideDone = !hideDone">
          {{ !hideDone ? 'Hide checked items' : `Show checked items (${doneTodos})` }}
        </button>
        <button class="action-btn" @click="deleteCL">Delete</button>
      </span>
    </section>
    <ul>
      <li v-for="todo in todosToShow" :key="todo.id">
        <label>
          <!-- <span class="check-box-container"> -->
          <input type="checkbox" :checked="todo.isDone" @click="toggleTodo(todo.id)" />
          <!-- </span> -->
          <span @click="editTodo(todo)" :class="{ done: todo.isDone }">{{ todo.title }} </span>
        </label>

        <span @click="removeTodo(todo.id)">X</span>
      </li>
      <section v-if="newTodo">
        <form @submit.prevent="updateTodo">
          <input placeholder="Add an item" v-model="todoToAdd.title" @blur="newTodo = false" />
          <br />
          <button class="submit-btn">Add</button>
          <span @click="this.newTodo = false" class="icon-lg icon-close"></span>
        </form>
      </section>
    </ul>
    <span v-show="!newTodo" @click="newTodo = true" class="action-btn checklist-btn">Add an item</span>
  </section>
</template>

<script>
import { utilService } from '../services/util.service.js';

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
        title: '',
        isDone: false,
      },
      newTodo: false,
      editTitle: false,
      hideDone: false,
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
    toggleTodo(todoId) {
      const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todoId);
      let currTodo = this.CLtoUpdate.todos[idx];
      currTodo.isDone = !currTodo.isDone;
      this.CLtoUpdate.todos.splice(idx, 1, currTodo);
      this.updateCL();
    },
    updateTodo(ev) {
      if (!ev.target[0].value) return;
      let todo = JSON.parse(JSON.stringify(this.todoToAdd));
      if (todo.id) {
        const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todo.id);
        this.CLtoUpdate.todos.splice(idx, 1, todo);
      } else {
        console.log('new');
        todo.id = 'TD' + utilService.makeId();
        if (this.CLtoUpdate.todos) {
          this.CLtoUpdate.todos.push(todo);
        } else this.CLtoUpdate.todos = [todo];
      }
      this.updateCL();
    },
    removeTodo(todoId) {
      console.log('removing', todoId);
      const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todoId);
      this.CLtoUpdate.todos.splice(idx, 1);
      this.updateCL();
    },
    async updateCL() {
      console.log('update cl');
      console.log('this.CLtoUpdate', this.CLtoUpdate);
      try {
        await this.$emit('updateCL', JSON.parse(JSON.stringify(this.CLtoUpdate)));
        (this.todoToAdd = {
          title: '',
          isDone: false,
        }),
          (this.editTitle = false);
        this.CLtoUpdate = JSON.parse(JSON.stringify(this.checklist));
      } catch (err) {
        console.log('err', err);
      }
    },
    deleteCL() {
      if (confirm('Are you sure?')) {
        delete this.CLtoUpdate.title;
        this.$emit('updateCL', this.CLtoUpdate);
      }
    },
  },
  computed: {
    doneTodos() {
      if (!this.CLtoUpdate.todos) return;
      return this.CLtoUpdate.todos.filter((td) => td.isDone).length;
    },
    todosToShow() {
      if (this.hideDone) {
        return this.CLtoUpdate.todos.filter((td) => !td.isDone);
      } else {
        return this.CLtoUpdate.todos;
      }
    },
  },
};
</script>

<style></style>

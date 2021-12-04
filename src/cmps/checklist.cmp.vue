<template>
  <section class="checklist">
    <form class="editor" v-show="editTitle" @submit.prevent="updateCL">
      <textarea v-model="CLtoUpdate.title" />
      <div class="buttons">
        <button class="submit-btn">Save</button>
        <span @click="editTitle = false" class="icon-lg icon-close"></span>
      </div>
    </form>
    <section v-show="!editTitle" class="checklist-header">
      <h3 @click="editTitle = true">{{ checklist.title }}</h3>
      <span class="checklist-actions">
        <button
          v-if="doneTodos > 0"
          class="action-btn checklist-btn"
          @click.stop="hideDone = !hideDone"
        >
          {{
            !hideDone
              ? "Hide checked items"
              : `Show checked items (${doneTodos})`
          }}
        </button>
        <button class="action-btn" @click="deleteCL">Delete</button>
      </span>
    </section>
    <div class="checklist-progress">
      <span class="checklist-progress-percentage">{{
        progressPercentage
      }}</span>
      <div class="checklist-progress-bar">
        <div
          class="checklist-progress-bar-current"
          :style="{ width: progressPercentage }"
          :class="{ finished: progressPercentage === '100%' }"
        ></div>
      </div>
      <div
        v-if="!CLtoUpdate.todos || !CLtoUpdate.todos.length"
        class="checklist-progress-bar dummy"
      ></div>
      <span
        v-if="
          progressPercentage === '100%' && !todosToShow && !todosToShow.length
        "
        class="checklist-completed-text"
        >Everything in this checklist is complete!</span
      >
    </div>

    <ul>
      <li v-for="todo in todosToShow" :key="todo.id">
        <span class="c-b-container">
          <input
            class="c-b-btn"
            type="checkbox"
            :checked="todo.isDone"
            @click.stop="toggleTodo(todo.id)"
          />
          <!-- </span> -->
          <span @click.stop="editTodo(todo)" :class="{ done: todo.isDone }"
            >{{ todo.title }}
          </span>
        </span>
        <span @click="removeTodo(todo.id)">X</span>
      </li>
      <section v-if="newTodo">
        <form @submit.prevent="updateTodo">
          <input
            class="add-item"
            placeholder="Add an item"
            v-model="todoToAdd.title"
          />
          <br />
          <div class="buttons">
            <button class="submit-btn" @click.stop="updateTodo">Add</button>
            <span @click="newTodo = false" class="icon-lg icon-close"></span>
          </div>
        </form>
      </section>
    </ul>
    <span
      v-show="!newTodo"
      @click="newTodo = true"
      class="action-btn checklist-btn"
      >Add an item</span
    >
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
      hideDone: false,
    };
  },
  methods: {
    addTodo() {
      this.newTodo = true;
    },
    editTodo(todo) {
      this.newTodo = true;
      this.todoToAdd.title = todo.title;
    },
    toggleTodo(todoId) {
      const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todoId);
      let currTodo = this.CLtoUpdate.todos[idx];
      currTodo.isDone = !currTodo.isDone;
      this.CLtoUpdate.todos.splice(idx, 1, currTodo);
      this.updateCL();
    },
    updateTodo(ev) {
      if (!ev.target[0] || !ev.target[0].value) return;
      let todo = JSON.parse(JSON.stringify(this.todoToAdd));
      if (todo.id) {
        const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todo.id);
        this.CLtoUpdate.todos.splice(idx, 1, todo);
      } else {
        todo.id = "TD" + utilService.makeId();
        if (this.CLtoUpdate.todos) {
          this.CLtoUpdate.todos.push(todo);
        } else this.CLtoUpdate.todos = [todo];
      }
      this.updateCL();
    },
    removeTodo(todoId) {
      const idx = this.CLtoUpdate.todos.findIndex((td) => td.id === todoId);
      this.CLtoUpdate.todos.splice(idx, 1);
      this.updateCL();
    },
    async updateCL() {
      try {
        await this.$emit(
          "updateCL",
          JSON.parse(JSON.stringify(this.CLtoUpdate))
        );
        (this.todoToAdd = {
          title: "",
          isDone: false,
        }),
          (this.editTitle = false);
        this.CLtoUpdate = JSON.parse(JSON.stringify(this.checklist));
      } catch (err) {
        console.log("err", err);
      }
    },
    deleteCL() {
      if (confirm("Are you sure?")) {
        delete this.CLtoUpdate.title;
        this.$emit("updateCL", this.CLtoUpdate);
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
    progressPercentage() {
      if (!this.CLtoUpdate.todos) return;
      return (this.doneTodos / this.CLtoUpdate.todos.length || 0) * 100 + "%";
    },
  },
};
</script>

<style></style>

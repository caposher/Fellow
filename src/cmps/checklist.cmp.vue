<template>
  <section class="checklist">
    <form class="editor" v-show="editTitle" @submit.prevent="updateCL">
      <textarea v-model="CLtoUpdate.title" @keydown.enter.prevent="updateCL" />
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
          class="action-btn relative-btn"
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
        v-if="progressPercentage === '100%' && !todosToShow.length"
        class="checklist-completed-text"
        >Everything in this checklist is complete!</span
      >
    </div>

    <ul>
      <draggable
        v-model="CLtoUpdate.todos"
        group="todo-group"
        ghost-class="ghost"
        chosenClass=""
        dragClass="drag"
        dragoverBubble: false,

        @start="updateCL"
        @end="updateCL"
        @add="updateCL"
      >
        <li v-for="todo in todosToShow" :key="todo.id" @click.stop="editTodo(todo)">
          <span class="c-b-container">
            <label for="">
              <input class="cb-cl" type="checkbox" :checked="todo.isDone" />
              <label class="c-b-btn" @click.stop="toggleTodo(todo.id)"></label>
            </label>
            <!-- <input
              class="c-b-btn"
              type="checkbox"
              :checked="todo.isDone"
              @click.stop="toggleTodo(todo.id)"
            /> -->
            <span @click.stop="editTodo(todo)" :class="{ done: todo.isDone }"
              >{{ todo.title }}
            </span>
          </span>
          <!-- <span class="td-action" @click="removeTodo(todo.id)">X</span> -->
          <button class="td-action" @click.stop="tdMenu = !tdMenu">
            <span class="icon-sm icon-dots"> </span>
            <section class="card-popup td-popup" v-show="tdMenu" @click.stop="">
              <section class="popup-header">
                <span @click="tdMenu = false" class="close-popup icon-md icon-close"></span>
                <h4>Item action</h4>
              </section>
              <span class="action" @click="removeTodo(todo.id)">Delete this todo</span>
            </section>
          </button>
        </li>
      </draggable>
      <section v-if="newTodo">
        <form @submit.prevent="updateTodo">
          <input
            class="add-item"
            placeholder="Add an item"
            v-model="todoToAdd.title"
            @keydown.enter="updateTodo"
          />
          <br />
          <div class="buttons">
            <button class="submit-btn" @click.stop="updateTodo">{{todoToAdd.id?'Update':'Add'}}</button>
            <span @click="cancelEdit" class="icon-lg icon-close"></span>
          </div>
        </form>
      </section>
    </ul>
    <button
      v-show="!newTodo"
      @click="newTodo = true"
      class="action-btn relative-btn"
      >Add an item</button
    >
  </section>
</template>

<script>
import draggable from "vuedraggable";

import { utilService } from "../services/util.service.js";

export default {
  props: {
    checklist: {
      type: Object,
    },
  },
  data() {
    return {
      CLtoUpdate: null,
      todoToAdd: {
        title: "",
        isDone: false,
      },
      newTodo: false,
      editTitle: false,
      hideDone: false,
      tdMenu:false,

    };
  },
  created(){
      this.CLtoUpdate= JSON.parse(JSON.stringify(this.checklist))
  },
  methods: {
    addTodo() {
      this.newTodo = true;
    },
    editTodo(todo) {
      this.newTodo = true;
      this.todoToAdd = JSON.parse(JSON.stringify(todo));
      // this.todoToAdd.title = todo.title;
    },
    toggleTodo    (todoId    ) {
      // console.log('toggleTodo',todoId)
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
    cancelEdit(){
      this.newTodo = false
      this.todoToAdd = {
          title: "",
          isDone: false,
        }
    }
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
      return (
        Math.ceil((this.doneTodos / this.CLtoUpdate.todos.length || 0) * 100) +
        "%"
      );
    },
  },
  components: {
    draggable,
  },
};
</script>

<style></style>

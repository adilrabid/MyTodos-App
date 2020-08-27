<template>
  <!------------------------------------- All Lists ------------------------------------->
  <div class="allLists" :style="showBg">
    <div class="allLists-contents">
      <div v-if="showLists === 'myday'" class="allLists-contents-myDay">
        <div>
          <span>
            <h2 class="allLists-title">
              <i class="fas fa-cloud-sun"></i> My Day
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <li v-for="(todo, index) in todos" :key="index" class="todoItem">
              <div class="todoCompleteTitle">
                <label class="completeChkBx-wrap" :for="todo.key">
                  <input
                    v-model="completedCheckBoxes"
                    :id="todo.key"
                    :value="todo.key"
                    type="checkbox"
                    class="completeChkBx-main"
                    @change="markCompleted(todo.key, index)"
                  />
                  <div class="completeChkBx"></div>
                </label>
                <div class="todoContent" @click="showDetails(index)">
                  <p class="todoTitle">{{ todo.title }}</p>
                  <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                </div>
              </div>
              <div class="importantStarIcon">
                <label class="importantChkBx-wrap">
                  <input type="checkbox" class="importantChkBx-main" />
                  <div class="importantChkBx"></div>
                </label>
              </div>
            </li>
          </transition-group>
        </ul>
        <p style="color: white">{{ completedCheckBoxes }}</p>
        <div class="addNewTodo-wrap">
          <span class="addNewTodo-symbol">{{ addNewSymbol }}</span>
          <input
            @focus="addNewSymbol = 'O'"
            @blur="addNewSymbol = '+'"
            class="addNewTodo"
            type="text"
            placeholder="Add new"
            v-model="newTodo"
            @keydown.enter="addNew"
          />
        </div>
      </div>
      <!-- end of allLists-contents-myDay -->
      <div class="allLists-contents-completed" v-if="showLists === 'completed'">
        <div>
          <span>
            <h2 class="allLists-title">
              <i class="fas fa-check-double"></i> Completed Tasks
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <li v-for="(todo, index) in completedTodos" :key="index" class="todoItem">
              <div class="todoCompleteTitle">
                <label class="completeChkBx-wrap" :for="todo.key">
                  <input
                    v-model="completedCheckBoxes"
                    :id="todo.key"
                    :value="todo.key"
                    type="checkbox"
                    class="completeChkBx-main"
                    @change="markCompleted(todo.key, index)"
                  />
                  <div class="completeChkBx"></div>
                </label>
                <div class="todoContent" @click="showDetails(index)">
                  <p class="todoTitle">{{ todo.title }}</p>
                  <p v-if="completedTodos.note" class="todo-category">{{ completedTodos.note }}</p>
                </div>
              </div>
              <div class="importantStarIcon">
                <label class="importantChkBx-wrap">
                  <input type="checkbox" class="importantChkBx-main" />
                  <div class="importantChkBx"></div>
                </label>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
      <!-- end of allLists-contents-completed -->
      <div class="allLists-contents-completed" v-if="showLists === 'due'">
        <div>
          <span>
            <h2 class="allLists-title">
              <i class="far fa-calendar-times"></i> Due Tasks
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <li v-for="(todo, index) in completedTodos" :key="index" class="todoItem">
              <div class="todoCompleteTitle">
                <label class="completeChkBx-wrap" :for="todo.key">
                  <input
                    v-model="completedCheckBoxes"
                    :id="todo.key"
                    :value="todo.key"
                    type="checkbox"
                    class="completeChkBx-main"
                    @change="markCompleted(todo.key, index)"
                  />
                  <div class="completeChkBx"></div>
                </label>
                <div class="todoContent" @click="showDetails(index)">
                  <p class="todoTitle isCompleted">{{ todo.title }}</p>
                  <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                </div>
              </div>
              <div class="importantStarIcon">
                <label class="importantChkBx-wrap">
                  <input type="checkbox" class="importantChkBx-main" />
                  <div class="importantChkBx"></div>
                </label>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
      <!-- end of allLists-contents-due -->
    </div>
    <!-- end of allLists-contents-->
  </div>
</template>

<script>
import { dateTime } from "../../main.js";
export default {
  data() {
    return {
      //Todos to show
      completedCheckBoxes: [],
      addNewSymbol: "+",
      newTodo: "",
      completed: false,
      important: false,
    };
  },
  watch: {},

  computed: {
    showBg() {
      if (this.$store.state.backGround) {
        return { backgroundImage: "url(" + this.$store.state.backGround + ")" };
      } else {
        return { backgroundImage: "url(" + this.$store.getters.getBG + ")" };
      }
    },
    currentDate() {
      return this.$store.getters.currentDate;
    },
    showLists() {
      return this.$store.state.show_lists;
    },
    todos() {
      let todos = this.$store.state.todos;
      if (todos.length > 0) {
        todos.forEach((todo) => {
          if (todo.completed) {
            if (!this.completedCheckBoxes.includes(todo.key)) {
              this.completedCheckBoxes.push(todo.key);
            }
          }
        });
      }
      return todos;
    },
    mydayTodos() {
      let todos = this.$store.state.todos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return !todo.completed;
        });
        return filteredTodo;
      }
      return todos;
    },
    completedTodos() {
      let todos = this.$store.state.todos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return todo.completed;
        });
        return filteredTodo;
      }
      return todos;
    },
  },
  methods: {
    addNew() {
      if (!this.newTodo) {
        return;
      }
      let todo = {
        title: this.newTodo,
        completed: this.completed,
        note: "",
        dateCreated: dateTime.getTime(),
        dueDate: dateTime.getTime() + 86400000,
        important: this.important,
        status: "Incomplete",
      };
      //store this data
      this.$store.dispatch("storeTodo", todo);
      this.newTodo = "";
    },
    markCompleted(key, index) {
      if (this.$store.getters.getStoredTodos[index].completed) {
        this.$store.getters.getStoredTodos[index].completed = false;
      } else {
        this.$store.getters.getStoredTodos[index].completed = true;
      }
      this.$store.state.clickedTodoKey = key;
      let newValue = this.$store.getters.getStoredTodos[index];
      this.$store.dispatch("updateTodo", newValue);
    },
    showDetails(index) {
      this.$store.commit("showDetails", index);
    },
    hideDetails() {
      this.todoClicked = false;
    },
    changeBg(index) {
      this.bgUrl = this.image[index];
      console.log(this.bgUrl);
    },
    countTodo() {
      console.log("Completed todo length : ");
    },
  },
  updated() {
    this.$store.state.todoCount.myday = this.todos.length;
    this.$store.state.todoCount.completed = this.completedCheckBoxes.length;
  },
  created() {},
};
</script>
<style>
.allLists {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 300ms;
}
.allLists-contents {
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  position: relative;
}
.allLists-title {
  margin: 0 0 5px 0;
  font-weight: 100;
  color: white;
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
}
.allLists-title svg {
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.2));
}
.allLists-date {
  font-size: smaller;
  color: rgb(255, 255, 255);
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
}
.completeChkBx-wrap {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
}
.completeChkBx {
  height: 1.25em;
  width: 1.25em;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 50ms, border-color 50ms;
}
.completeChkBx::after {
  content: "\2714";
  color: white;
  transform: scale(0);
  transition: transform 300ms;
}
.completeChkBx-main {
  display: none;
}
.completeChkBx-main:checked + .completeChkBx {
  background-color: #2266dc;
  border-color: #2266dc;
}
.completeChkBx-main:checked + .completeChkBx:after {
  transform: scale(0.8);
}
.importantChkBx-wrap {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
}
.importantChkBx {
  height: 1.25em;
  width: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.importantChkBx::after {
  content: "\2605";
  color: white;
  transition: 200ms;
  transform: scale(1);
}
.importantChkBx-main {
  display: none;
}
.importantChkBx-main:checked + .importantChkBx::after {
  content: "\272F";
  color: rgb(255, 153, 0);
  transform: scale(1.5);
}
.addNewTodo-wrap {
  position: absolute;
  bottom: 30px;
  width: calc(100% - 2 * 40px);
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  border: 0.1px solid rgb(34, 34, 34);
  flex-wrap: nowrap;
  background-color: rgba(0, 0, 0, 0.246);
}
.addNewTodo-symbol {
  font-size: 35px;
  padding: 0 15px;
  color: rgba(255, 255, 255, 0.581);
  font-weight: 100;
}
.addNewTodo {
  width: 100%;
  padding: 15px 15px 15px 5px;
  font-size: 20px;
  border: none;
  outline: none;
  color: white;
  background: transparent;
  text-shadow: 0 0 3px #000000;
}
.addNewTodo::placeholder {
  color: rgba(255, 255, 255, 0.581);
}

.todoItems {
  list-style-type: none;
  list-style-position: outside;
  margin: 15px -5px 0;
  padding: 0 5px;
  overflow: auto;
  max-height: calc(100% - 150px);
  scrollbar-color: #009578 rgba(255, 255, 255, 0.678);
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.678);
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background-color: dodgerblue;
  border-radius: 20px;
}
.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  background-color: rgba(255, 255, 255, 0.678);
  margin: 0px 0px 8px;
  border-radius: 3px;
  transition: 200ms;
  backdrop-filter: blur(5px);
}
.todoItem:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
.todoTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
}
.todoTitle.isCompleted {
  text-decoration: line-through;
}
.todo-category {
  margin-top: 8px;
  margin-bottom: 3px;
  font-size: 12px;
}
.todoCompleteTitle {
  display: flex;
  align-items: center;
  width: 100%;
}
.todoContent {
  cursor: pointer;
  padding: 10px 0px;
  margin: 0 20px;
  width: 100%;
}
.completedCheckbox {
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 200ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-move {
  transition: transform 200ms;
}
</style>

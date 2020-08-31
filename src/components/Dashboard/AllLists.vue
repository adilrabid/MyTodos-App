<template>
  <!------------------------------------- All Lists ------------------------------------->
  <div class="allLists" :style="showBg">
    <div class="allLists-contents">
      <div v-if="showLists === 'myday'" class="allLists-contents-myDay">
        <div class="allLists-header">
          <span class="hamburger-menu" @click="showSidepanel">
            <i class="fas fa-bars"></i>
          </span>
          <span class="allLists-title-wrap">
            <h2 class="allLists-title">
              <i class="fas fa-cloud-sun"></i> My Day
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <template v-for="todo in mydayTodos">
              <li :key="todo.key" class="todoItem">
                <div class="todoCompleteTitle">
                  <label
                    v-if="todo.status !=='Due'"
                    class="completeChkBx-wrap cursorPointer"
                    :for="todo.key"
                  >
                    <input
                      v-model="completedCheckBoxes"
                      :id="todo.key"
                      :value="todo.key"
                      @change="markCompleted(todo.key, todo.index)"
                      type="checkbox"
                      class="completeChkBx-main"
                    />
                    <div class="completeChkBx" title="Mark as completed"></div>
                  </label>
                  <i v-else class="fas fa-exclamation-triangle" :class="{due:todo.status=='Due'}"></i>
                  <div
                    class="todoContent cursorPointer"
                    @click="showDetails(todo.index)"
                    title="Click to show details"
                  >
                    <p class="todoTitle" :class="{completed : todo.completed}">{{ todo.title }}</p>
                    <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                  </div>
                </div>
                <div class="importantStarIcon" title="Mark as important">
                  <label class="importantChkBx-wrap cursorPointer">
                    <input
                      v-model="importantCheckBoxes"
                      :value="todo.key"
                      @change="markImportant(todo.key, todo.index)"
                      type="checkbox"
                      class="importantChkBx-main"
                    />
                    <div class="importantChkBx"></div>
                  </label>
                </div>
              </li>
            </template>
          </transition-group>
        </ul>
        <div class="addNewTodo-wrap">
          <span class="addNewTodo-symbol" v-html="addNewSymbol">{{ addNewSymbol }}</span>
          <input
            @focus="changeSymbol"
            @blur="changeSymbol"
            class="addNewTodo"
            type="text"
            placeholder="Add new"
            v-model="newTodo"
            @keydown.enter="addNew"
          />
        </div>
      </div>
      <!-- end of allLists-contents-myDay -->
      <div v-if="showLists === 'important'" class="allLists-contents-important">
        <div class="allLists-header">
          <span class="hamburger-menu" @click="showSidepanel">
            <i class="fas fa-bars"></i>
          </span>
          <span class="allLists-title-wrap">
            <h2 class="allLists-title">
              <i class="fas fa-star"></i> Important
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <template v-for="todo in importantTodos">
              <li :key="todo.key" class="todoItem">
                <div class="todoCompleteTitle">
                  <label
                    v-if="todo.status !=='Due'"
                    class="completeChkBx-wrap cursorPointer"
                    :for="todo.key"
                  >
                    <input
                      v-model="completedCheckBoxes"
                      :id="todo.key"
                      :value="todo.key"
                      @change="markCompleted(todo.key, todo.index)"
                      type="checkbox"
                      class="completeChkBx-main"
                    />
                    <div class="completeChkBx"></div>
                  </label>
                  <i v-else class="fas fa-exclamation-triangle" :class="{due:todo.status=='Due'}"></i>
                  <div class="todoContent cursorPointer" @click="showDetails(todo.index)">
                    <p class="todoTitle" :class="{completed : todo.completed}">{{ todo.title }}</p>
                    <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                  </div>
                </div>
                <div class="importantStarIcon">
                  <label class="importantChkBx-wrap cursorPointer">
                    <input
                      v-model="importantCheckBoxes"
                      :value="todo.key"
                      @change="markImportant(todo.key, todo.index)"
                      type="checkbox"
                      class="importantChkBx-main"
                    />
                    <div class="importantChkBx"></div>
                  </label>
                </div>
              </li>
            </template>
          </transition-group>
        </ul>
      </div>
      <!-- end of allLists-contents-Important -->
      <div class="allLists-contents-completed" v-if="showLists === 'completed'">
        <div class="allLists-header">
          <span class="hamburger-menu" @click="showSidepanel">
            <i class="fas fa-bars"></i>
          </span>
          <span class="allLists-title-wrap">
            <h2 class="allLists-title">
              <i class="fas fa-check-double"></i> Completed
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <li v-for="todo in completedTodos" :key="todo.key" class="todoItem">
              <div class="todoCompleteTitle">
                <label class="completeChkBx-wrap cursorPointer" :for="todo.key">
                  <input
                    v-model="completedCheckBoxes"
                    :id="todo.key"
                    :value="todo.key"
                    type="checkbox"
                    class="completeChkBx-main"
                    @change="markCompleted(todo.key, todo.index)"
                  />
                  <div class="completeChkBx"></div>
                </label>
                <div class="todoContent">
                  <p class="todoTitle" :class="{completed : todo.completed}">{{ todo.title }}</p>
                  <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                </div>
              </div>
              <div class="importantStarIcon">
                <label class="importantChkBx-wrap" title>
                  <input
                    v-model="importantCheckBoxes"
                    :value="todo.key"
                    disabled
                    type="checkbox"
                    class="importantChkBx-main"
                  />
                  <div class="importantChkBx"></div>
                </label>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
      <!-- end of allLists-contents-completed -->
      <div class="allLists-contents-due" v-if="showLists === 'due'">
        <div class="allLists-header">
          <span class="hamburger-menu" @click="showSidepanel">
            <i class="fas fa-bars"></i>
          </span>
          <span class="allLists-title-wrap">
            <h2 class="allLists-title">
              <i class="far fa-calendar-times"></i> Due
            </h2>
            <p class="allLists-date">{{ currentDate.date }}</p>
          </span>
        </div>
        <ul class="todoItems">
          <transition-group name="list">
            <li v-for="todo in dueTodos" :key="todo.key" class="todoItem">
              <div class="todoCompleteTitle">
                <label class="completeChkBx-wrap" :for="todo.key">
                  <i class="fas fa-exclamation-triangle" :class="{due:todo.status=='Due'}"></i>
                </label>
                <div class="todoContent">
                  <p class="todoTitle">{{ todo.title }}</p>
                  <p v-if="todo.note" class="todo-category">{{ todo.note }}</p>
                </div>
              </div>
              <div class="dueTodoDeleteIcon" @click="deleteTodo(todo.key)">
                <i class="far fa-trash-alt"></i>
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
      importantCheckBoxes: [],
      addNewSymbol: "<i class='fas fa-plus'></i>",
      newTodo: "",
      completed: false,
      important: false,
    };
  },
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
    mydayTodos() {
      let todos = this.$store.state.todos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return todo.status !== "Due";
        });
        return filteredTodo;
      }
      return todos;
    },
    importantTodos() {
      let todos = this.$store.state.todos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return todo.important && todo.status !== "Due" && !todo.completed;
        });
        return filteredTodo;
      }
      return todos;
    },
    completedTodos() {
      let todos = this.$store.getters.getStoredTodos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return todo.completed;
        });
        return filteredTodo;
      }
      return todos;
    },
    dueTodos() {
      let todos = this.$store.getters.getStoredTodos;
      if (todos.length > 0) {
        let filteredTodo = todos.filter((todo) => {
          return todo.status == "Due";
        });
        return filteredTodo;
      }
      return todos;
    },
  },
  methods: {
    changeSymbol() {
      if (this.addNewSymbol == "<i class='fas fa-plus'></i>") {
        this.addNewSymbol = "<i class='far fa-circle'></i>";
      } else {
        this.addNewSymbol = "<i class='fas fa-plus'></i>";
      }
    },
    showSidepanel() {
      if (this.$store.state.showSidepanel) {
        this.$store.state.showSidepanel = false;
      } else {
        this.$store.state.showSidepanel = true;
      }
    },
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
    markImportant(key, index) {
      if (this.$store.getters.getStoredTodos[index].important) {
        this.$store.getters.getStoredTodos[index].important = false;
      } else {
        this.$store.getters.getStoredTodos[index].important = true;
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
    },
    trackCheckMarks(todos) {
      if (todos.length > 0) {
        todos.forEach((todo) => {
          if (todo.completed) {
            if (!this.completedCheckBoxes.includes(todo.key)) {
              this.completedCheckBoxes.push(todo.key);
            }
          }
          if (todo.important) {
            if (!this.importantCheckBoxes.includes(todo.key)) {
              this.importantCheckBoxes.push(todo.key);
            }
          }
        });
      }
    },
    deleteTodo(key) {
      this.$store.state.clickedTodoKey = key;
      this.$store.dispatch("deleteTodo");
    },
  },
  updated() {
    this.$store.state.todoCount.myday = this.mydayTodos.length;
    this.$store.state.todoCount.completed = this.completedCheckBoxes.length;
    this.$store.state.todoCount.due = this.dueTodos.length;
    this.$store.state.todoCount.important = this.importantTodos.length;
    this.trackCheckMarks(this.$store.getters.getStoredTodos);
  },
};
</script>
<style>
.hamburger-menu {
  display: none;
}
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
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
}
.allLists-date {
  font-size: smaller;
  color: rgb(255, 255, 255);
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
}
.completeChkBx-wrap {
  display: inline-flex;
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
  color: orange;
  transform: scale(1.5);
}
.importantStarIcon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dueTodoDeleteIcon {
  font-size: 14px;
  color: inherit;
}
.dueTodoDeleteIcon:hover {
  cursor: pointer;
}
.addNewTodo-wrap {
  position: absolute;
  padding: 12px 0;
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
  padding: 0 15px;
  color: rgba(255, 255, 255, 0.581);
}
.addNewTodo {
  width: 100%;
  padding: 0px 15px 0px 5px;
  font-size: 18px;
  font-weight: 100;
  font-family: inherit;
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
  height: calc(100vh - 210px);
  padding: 0 5px;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-color: rgb(30, 143, 255) rgba(255, 255, 255, 0.183);
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.183);
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(30, 143, 255, 0.6);
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
  padding: 10px 0px;
  margin: 0 20px;
  width: 100%;
}
.cursorPointer:hover {
  cursor: pointer;
}
.completedCheckbox {
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 200ms;
}
.list-enter {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-move {
  transition: transform 200ms;
}
.completed {
  /* color: #009578; */
  /* color: green; */
  text-decoration: line-through;
  text-decoration-thickness: 3px;
}
.due {
  /* color: #ac0a0a; */
  color: #e60023;
}

@media only screen and (max-width: 667px) {
  .allLists-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hamburger-menu {
    display: inline-block;
    color: rgb(236, 236, 236);
    font-size: 30px;
  }
  .hamburger-menu svg {
    filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.2));
  }
  .allLists-title-wrap {
    text-align: right;
  }
}
</style>

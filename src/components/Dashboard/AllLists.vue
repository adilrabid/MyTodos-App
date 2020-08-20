<template>
  <!------------------------------------- All Lists ------------------------------------->
  <div class="allLists" :style="showBg">
    <div class="allLists-contents">
      <div>
        <span>
          <h2 class="allLists-title">My Day</h2>
          <p class="allLists-date">{{currentDate.date}}</p>
        </span>
      </div>
      <ul class="todoItems">
        <li v-for="(todo, index) in todos" :key="index" class="todoItem">
          <div class="todoCompleteTitle">
            <label class="completeChkBx-wrap">
              <input type="checkbox" class="completeChkBx-main" />
              <div class="completeChkBx"></div>
            </label>
            <div class="todoContent" @click="showDetails(index)">
              <p class="todoTitle">{{todo.title}}</p>
              <p class="todo-category">{{todo.category}}</p>
            </div>
          </div>
          <div class="importantStarIcon">
            <label class="importantChkBx-wrap">
              <input type="checkbox" class="importantChkBx-main" />
              <div class="importantChkBx"></div>
            </label>
          </div>
        </li>
      </ul>
      <div class="addNewTodo-wrap">
        <span class="addNewTodo-symbol">{{addNewSymbol}}</span>
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
  </div>
</template>

<script>
import { dateTime } from "../../main.js";
export default {
  data() {
    return {
      addNewSymbol: "+",
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
      console.log("Current date is : ", this.$store.getters.currentDate);
      return this.$store.getters.currentDate;
    },
    todos() {
      return this.$store.state.todos;
    },
  },
  methods: {
    addNew() {
      let todo = {
        title: this.newTodo,
        category: "My Day",
        completed: this.completed,
        note: "",
        dateCreated: dateTime.getTime(),
        dueDate: dateTime.getTime() + 86400000,
        important: this.important,
      };
      //store this data
      this.$store.dispatch("storeTodo", todo);
      this.newTodo = "";
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
  },
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
  text-shadow: 0 0 3px #000000;
}
.allLists-date {
  font-size: smaller;
  color: rgb(255, 255, 255);
  text-shadow: 0 0 3px #000000;
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
  background-color: #009578;
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
}
.todoItem:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
.todoTitle {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 900;
}
.todo-category {
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
.completedCheckbox {
  margin-right: 10px;
}
</style>
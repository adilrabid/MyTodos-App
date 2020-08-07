<template>
  <div class="allLists" :style="showBg">
    <div class="allLists-contents">
      <div>
        <span>
          <h2 class="allLists-title">{{allListsTitle}}</h2>
          <p class="allLists-date">{{currentDate}}</p>
        </span>
        <span>
          <button class="allLists-menuBtn">...</button>
        </span>
      </div>

      <ul class="todoItems">
        <!-- <li v-for="(todo,index) in todos" :key="index" > -->
        <li v-for="(singleData,index) in getNewData" :key="index" class="todoItem">
          <div class="todoCompleteTitle">
            <input type="checkbox" class="completedCheckbox" />
            <div @click="showDetails(index)" class="todoContent">
              <p class="todoTitle">{{singleData.name}}</p>
              <p class="todo-category">{{singleData.type}}</p>
            </div>
          </div>
          <div class="importantStarIcon">⁂</div>
        </li>
      </ul>

      <p style="color: white" v-for="(singleData,index) in getNewData" :key="index">
        <br />
      </p>

      <div class="addNewTodo-wrap">
        <span class="addNewTodo-symbol">{{addNewSymbol}}</span>
        <input
          @keyup.enter="addItem"
          @focus="addNewSymbol = 'O'"
          @blur="addNewSymbol = '+'"
          v-model="newItem"
          class="addNewTodo"
          type="text"
          placeholder="Add new"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus, today } from "../../main.js";
import img1 from "../../assets/img/sky.jpg";
import img2 from "../../assets/img/alone.jpeg";
export default {
  data() {
    return {
      newItem: "",
      allListsTitle: "My Day",
      category: "My Day",
      completed: false,
      note: "",
      image: [img1, img2],
      test: ["lol"],
      todos: [],
      addNewSymbol: "+",
    };
  },
  watch: {},
  computed: {
    currentDate() {
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let currentDate = date + " " + time;
      return currentDate;
    },
    showBg() {
      return { backgroundImage: "url(" + this.image[1] + ")" };
    },
    getNewData() {
      let getSavedData = JSON.parse(localStorage.getItem("User1", "User1"));
      return getSavedData;
    },
  },
  methods: {
    addItem() {
      this.todos.push({
        name: this.newItem,
        type: this.category,
        completed: this.completed,
        note: this.note,
        dateCreated: "24 July, 2020",
        dueDate: "30 July, 2020",
      });
      this.newItem = "";
    },
    setNewData(value) {
      // Setting data to localStorage
      localStorage.setItem("User1", JSON.stringify(value));
    },
    showDetails(index) {
      eventBus.$emit("showDetails", index);
      eventBus.$emit("sendData", this.todos[index]);
    },
  },
  // created: {
  //   getPrevData() {},
  // },
};
</script>

<style scoped>
.allLists {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
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
}
.allLists-menuBtn {
  font-size: smaller;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.246);
  backdrop-filter: blur(10px);
  outline: none;
  color: white;
  border: 0.1px solid rgb(34, 34, 34);
  text-shadow: 0 0 3px #000000;
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
  padding: 0;
}
.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  background-color: rgba(255, 255, 255, 0.678);
  margin: 8px 0px;
  border-radius: 3px;
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
  padding: 10px 15px;
  width: 100%;
}
.completedCheckbox {
  margin-right: 10px;
}
</style>
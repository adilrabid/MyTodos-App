<template>
  <div class="dashboard">
    <!------------------------------------Side Panel -------------------------------------->
    <div class="sidePanel">
      <div class="appLogo">
        <img
          src="../../assets/logo.jpg"
          alt="applogo"
          height="50px"
          width="auto"
          style="display: block"
        />
      </div>
      <div class="userProfile">
        <div class="userMeta">
          <p class="userMetaName">{{userData.username}}</p>
          <p class="userMetaEmail">{{userData.email}}</p>
        </div>
      </div>
      <!-- <div>
        <div class="listOption listOption-myday">
          <p>My Day</p>
          <span>{{ todoCount }}</span>
        </div>
        <div class="listOption listOption-important">
          <p>Important</p>
          <span>{{ todoCount }}</span>
        </div>
        <div class="listOption listOption-tasks">
          <p>Tasks</p>
          <span>{{ todoCount }}</span>
        </div>
        <div class="listOption listOption-completed">
          <p>Completed</p>
          <span>{{ todoCount }}</span>
        </div>
        <div class="listOption listOption-due">
          <p>Due</p>
          <span>{{ todoCount }}</span>
        </div>
      </div>-->
      UserData:
      <br />
      {{userData}}
      <div class="listOption listOption-logout" @click="logout">
        <p>Log out</p>
      </div>
    </div>
    <!------------------------------------- All Lists ------------------------------------->
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
    <!----------------------------------- List Details ------------------------------------>
    <transition name="Popup">
      <div v-if="todoClicked" class="todoDetails-wrap">
        <div class="todoDetails">
          <div class="todoDetails-head">
            <div>
              <h2 class="todoDetails-title">Title :</h2>
              <p class="todoDetails-dataCreated">Created on :</p>
            </div>
            <button class="close-btn" @click="todoClicked = false">+</button>
          </div>
          <div class="todoDetails-option">
            <label for>Add note</label>
            <br />
            <textarea class="todoDetails-addNote" rows="3">
            Here is some note
        </textarea>
          </div>
          <div class="todoDetails-option">
            <label for>Add due data</label>
            <br />
            <input type="date" name id />
          </div>
          <div class="todoDetails-option">
            <p>Delete</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { today } from "../../main.js";
import img1 from "../../assets/img/sky.jpg";
import img2 from "../../assets/img/alone.jpeg";
export default {
  data() {
    return {
      todoClicked: false,
      bgUrl: "",
      todoCount: 6,
      title: "hello world",
      // for All list
      newItem: "",
      allListsTitle: "My Day",
      category: "My Day",
      completed: false,
      note: "",
      image: [img1, img2],
      test: ["lol"],
      addNewSymbol: "+",
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
    // for all lists
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
    hideDetails() {
      this.todoClicked = false;
    },
    logout() {
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
      localStorage.removeItem("dbId");
      this.$store.state.tempIdToken = null;
      this.$router.push("/login");
    },
    //For all lists
    addItem() {
      let todos = {
        name: this.newItem,
        type: this.category,
        completed: this.completed,
        note: this.note,
        dateCreated: "24 July, 2020",
        dueDate: "30 July, 2020",
      };
      this.newItem = "";
      //store this data
      this.$store.dispatch("storeTodo", todos);
    },
  },
  created() {
    this.$store.dispatch("getUserData");
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem("idToken")) {
      if (confirm("Confirm leave? you will be logged out")) {
        localStorage.removeItem("idToken");
        localStorage.removeItem("localId");
        this.$store.state.tempIdToken = null;
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>

<style>
.dashboard {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.sidePanel,
.allLists {
  height: 100%;
}
.sidePanel {
  width: 45%;
  padding: 10px 0px;
  position: relative;
}
.appLogo {
  margin-top: 20px;
  width: 100%;
}
.appLogo img {
  display: inline-block;
  margin: 0px auto;
  padding: 5px 0px;
}
.userProfile {
  display: flex;
  align-items: center;
  padding: 12px 20px;
}

.userProfilePic {
  margin-right: 15px;
  border-radius: 50%;
}
.userMeta {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  color: #071a52;
}
.userMetaName {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 5px 0;
}
.userMetaEmail {
  font-size: 12px;
  font-weight: 100;
  margin: 0;
}
.listOption {
  transition: 200ms;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: #071a52;
  font-weight: bold;
  font-size: 18px;
}
.listOption p {
  margin: 0;
}
.listOption-myday:hover {
  color: green;
  background-color: rgba(0, 128, 0, 0.2);
}
.listOption-important:hover {
  color: rgb(24, 127, 230);
  background-color: rgba(30, 143, 255, 0.2);
}
.listOption-tasks:hover {
  color: purple;
  background-color: rgba(128, 0, 128, 0.2);
}
.listOption-completed:hover {
  color: orange;
  background-color: rgba(255, 166, 0, 0.2);
}
.listOption-due:hover {
  color: crimson;
  background-color: rgba(220, 20, 60, 0.2);
}
.listOption-logout {
  color: red;
  background-color: rgb(238, 238, 238);
  position: absolute;
  bottom: 0;
  width: 100%;
}
.listOption-logout:hover {
  background-color: rgba(220, 20, 60, 0.095);
}
.todoDetails-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.349);
}
.todoDetails {
  height: 100%;
  width: 400px;
  background-color: rgb(245, 245, 245);
  float: right;
}
.todoDetails-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.todoDetails-title {
  margin: 0px;
  padding: 15px 40px 10px;
}
.todoDetails-dataCreated {
  padding: 15px 40px 10px;
}
.close-btn {
  margin-top: 10px;
  margin-right: 20px;
  font-size: 40px;
}
.todoDetails-option {
  background-color: #fff;
  padding: 10px 20px;
  margin: 10px 20px;
}
.todoDetails-addNote {
  width: 100%;
  padding: 10px 0px;
  font-size: 18px;
  outline: none;
  border: none;
}
/* for alllists */

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
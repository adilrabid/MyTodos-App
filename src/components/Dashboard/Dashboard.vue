<template>
  <div class="dashboard">
    <div class="sidePanel">
      <div class="appLogo">
        <img src="../../assets/logo.jpg" alt="applogo" height="40px" width="auto" />
      </div>
      <div class="userProfile">
        <div class="userMeta">
          <p class="userMetaName">Mr. Bean</p>
          <p class="userMetaEmail">bean@gmail.com</p>
        </div>
      </div>
      <div>
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
      </div>
      UserData: {{getUserData}}
      <div class="listOption listOption-logout" @click="logout">
        <p>Log out</p>
      </div>
    </div>
    <Lists></Lists>
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
import Lists from "./Lists";
export default {
  components: { Lists },
  data() {
    return {
      userData: null,
      todoClicked: false,
      bgUrl: "",
      todoCount: 6,
      title: "hello world",
    };
  },
  computed: {
    getUserData() {
      return this.$store.state.userData;
    },
  },
  methods: {
    hideDetails() {
      this.todoClicked = false;
    },
    logout() {
      this.$router.push("/signup");
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
    },
  },
  created() {
    this.$store.dispatch("getUserData");
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
.userMetaName {
  font-size: 16px;
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
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.listOption p {
  margin: 0;
  font-size: 16px;
}
.listOption-myday {
  color: green;
}
.listOption-important {
  color: rgb(255, 149, 167);
}
.listOption-tasks {
  color: purple;
}
.listOption-completed {
  color: orange;
}
.listOption-due {
  color: crimson;
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
</style>
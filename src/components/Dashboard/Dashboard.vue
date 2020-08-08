<template>
  <div class="dashboard">
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
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
      this.$store.state.tempIdToken = null;
      this.$router.push("/login");
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
</style>
<template>
  <div class="dashboard">
    <!------------------------------------Side Panel -------------------------------------->
    <div class="sidePanel">
      <div class="appLogo">
        <img
          :src="userData.profilePic"
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
      <div>
        <div class="listOption listOption-myday">
          <p>My Day</p>
          <span></span>
        </div>
        <div class="listOption listOption-important">
          <p>Important</p>
          <span></span>
        </div>
        <div class="listOption listOption-completed">
          <p>Completed</p>
          <span></span>
        </div>
        <div class="listOption listOption-due">
          <p>Due</p>
          <span></span>
        </div>
      </div>
      <!-- <p style="fontSize: 13px">
        UserData:
        <br />
        {{userData}}
      </p>-->
      <div class="place-bottom width-100">
        <div class="listOption listOption-settings" @click="$store.state.settingsClicked= true">
          <p>Settings</p>
        </div>
        <div class="listOption listOption-logout" @click="logout">
          <p>Log out</p>
        </div>
      </div>
    </div>
    <!-----------------------------------AllLists ------------------------------------->
    <AllLists></AllLists>
    <!----------------------------------- Open Settings ------------------------------->
    <transition name="Popup">
      <Settings v-if="settingsClicked"></Settings>
    </transition>
    <transition name="Popup">
      <Details v-if="todoClicked"></Details>
    </transition>
  </div>
</template>

<script>
import AllLists from "./AllLists";
import Details from "./Details";
import Settings from "./Settings";

export default {
  components: { AllLists, Details, Settings },
  data() {
    return {};
  },
  computed: {
    settingsClicked() {
      return this.$store.state.settingsClicked;
    },
    todoClicked() {
      return this.$store.state.todoClicked;
    },
    userData() {
      return this.$store.state.userData;
    },
    getStoredTodos() {
      return this.$store.getters.getStoredTodos;
    },
  },
  methods: {
    openSettings() {
      this.settingsClicked = true;
    },
    logout() {
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
      localStorage.removeItem("dbId");
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
.sidePanel {
  height: 100%;
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
  /* color: #071a52; */
}
.userMetaName {
  font-size: 22px;
  font-weight: 500;
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
  /* color: #071a52;
  font-weight: bold; */
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
}

.listOption-logout:hover {
  background-color: rgba(220, 20, 60, 0.095);
}
.listOption-settings {
  color: black;
  background-color: rgb(238, 238, 238);
}
.listOption-settings:hover {
  color: black;
  background-color: rgb(238, 238, 238);
}
.place-bottom {
  position: absolute;
  bottom: 0;
}
.width-100 {
  width: 100%;
}
.width-adaptive {
  width: calc(100% - 2 * 30px);
}
.todoDetails-wrap,
.settings-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.349);
  z-index: 10;
}
.todoDetails,
.settings {
  position: relative;
  padding: 30px 30px;
  height: 100%;
  width: 400px;
  background-color: #fff;
  float: right;
}
.todoDetails-head,
.settings-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}
.todoDetails-title,
.settings-title {
  margin: 0px;
  /* color: #071a52; */
  font-size: 24px;
}
.close-todoDetails-wrap,
.close-settings-wrap {
}
.close-todoDetails,
.close-settings {
  cursor: pointer;
}

.close-todoDetails:after,
.close-settings:after {
  content: "\26CC";
  color: #2c3e50;
}
.created-on {
  /* color: #071a52; */
  font-weight: bold;
  font-size: 15px;
}
.todoDetails-option,
.settings-option {
  /* background-color: #fff; */
  margin: 15px 0px 0px;
}
.todoDetails-label,
.settings-label {
  display: block;
  /* color: #071a52; */
  margin-bottom: 10px;
  font-weight: bold;
}

/* Settings style starts */
.settings-backgroundImage {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.settings-backgroundImage-option {
  height: 60px;
  width: 90px;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: 200ms;
}
.settings-backgroundImage-option:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0px 2px 10px 1px rgb(135, 135, 135);
}
.settings-backgroundImage-option:focus {
  border: 2px solid dodgerblue;
}
.settings-colorScheme {
  padding: 6px 10px;
  border: 0.5px solid lightgrey;
  outline: none;
  transition: 200ms;
}
.settings-colorScheme option {
  background-color: rgb(255, 255, 255);
}
.settings-username {
  outline: none;
  border: 0px;
  transition: 200ms;
  font-size: 15px;
}
.settings-username:focus {
  padding: 6px 8px;
  border: 0.5px solid lightgrey;
}
</style>
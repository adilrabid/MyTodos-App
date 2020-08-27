<template>
  <div class="dashboard" :class="{darkTheme : darkThemeOn }">
    <!------------------------------------Side Panel -------------------------------------->
    <div class="sidePanel">
      <div class="appLogo">
        <img
          :src="$store.getters.getProfilePic"
          alt="applogo"
          height="50px"
          width="auto"
          style="display: block"
        />
      </div>
      <div class="userProfile">
        <div class="userMeta">
          <p class="userMetaName">{{ userData.username }}</p>
          <p class="userMetaEmail">
            <i class="far fa-envelope"></i>
            {{ userData.email }}
          </p>
        </div>
      </div>
      <div>
        <div
          @click="makeActive('myday')"
          :class="{ active: isActive == 'myday' }"
          class="listOption listOption-myday"
        >
          <div>
            <i class="fas fa-cloud-sun"></i>
            <p>My Day</p>
          </div>
          <span>{{ count.myday }}</span>
        </div>
        <div
          @click="makeActive('completed')"
          :class="{ active: isActive == 'completed' }"
          class="listOption listOption-completed"
        >
          <div>
            <i class="fas fa-check-double"></i>
            <p>Completed</p>
          </div>
          <span>{{ count.completed }}</span>
        </div>
        <div
          @click="makeActive('due')"
          :class="{ active: isActive == 'due' }"
          class="listOption listOption-due"
        >
          <div>
            <i class="far fa-calendar-times"></i>
            <p>Due</p>
          </div>
          <span>{{ count.due }}</span>
        </div>
      </div>
      <div class="place-bottom width-100">
        <div class="listOption listOption-settings" @click="$store.state.settingsClicked = true">
          <div>
            <i class="fas fa-cog"></i>
            <p>Settings</p>
          </div>
        </div>
        <div class="listOption listOption-logout" @click="logout">
          <div>
            <i class="fas fa-sign-out-alt"></i>
            <p>Log out</p>
          </div>
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
    darkThemeOn() {
      if (this.$store.state.theme == "dark") {
        return true;
      }
      return false;
    },
    count() {
      return {
        myday: this.$store.state.todoCount.myday,
        completed: this.$store.state.todoCount.completed,
        due: this.$store.state.todoCount.due,
      };
    },
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
    isActive() {
      return this.$store.state.show_lists;
    },
  },
  methods: {
    makeActive(type) {
      console.log(type);
      if (type === "due") {
        this.$store.state.show_lists = type;
      } else if (type === "completed") {
        this.$store.state.show_lists = type;
      } else {
        this.$store.state.show_lists = type;
      }
    },
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
.listOption:hover {
  background-color: rgba(238, 238, 238, 0.6);
}
.listOption > div {
  display: flex;
}
.listOption > div p {
  margin: 0;
}
.listOption > div svg {
  margin-right: 15px;
}
.listOption-myday:hover {
  color: dodgerblue;
}
.listOption-myday.active {
  border-right: 3px solid dodgerblue;
  color: dodgerblue;
}
.listOption-completed:hover {
  color: green;
}
.listOption-completed.active {
  border-right: 3px solid green;
  color: green;
}
.listOption-due:hover {
  color: crimson;
}
.listOption-due.active {
  border-right: 3px solid crimson;
  color: crimson;
}

.listOption-logout:hover {
  color: crimson;
}
.listOption-settings:hover {
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
  align-items: center;
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
  cursor: pointer;
  font-size: 24px;
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

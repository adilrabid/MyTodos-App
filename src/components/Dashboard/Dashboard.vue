<template>
  <div class="dashboard" :class="{darkTheme : darkThemeOn }">
    <!------------------------------------Side Panel -------------------------------------->
    <div class="sidePanel_wrap" :class="{sidePanel_wrap_responsive : $store.state.showSidepanel}">
      <div class="sidePanel" :class="{sidepanelResponsive : $store.state.showSidepanel}">
        <div class="profilePic">
          <img :src="$store.getters.getProfilePic" alt="Profile Picture" />
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
          <!-- Myday todo link -->
          <div
            @click="makeActive('myday')"
            :class="{ active: isActive == 'myday' }"
            class="listOption listOption-myday"
          >
            <div>
              <span class="icon-container">
                <i class="fas fa-cloud-sun"></i>
              </span>
              <p>My Day</p>
            </div>
            <span>{{ count.myday }}</span>
          </div>
          <!-- Important todo link -->
          <div
            @click="makeActive('important')"
            :class="{ active: isActive == 'important' }"
            class="listOption listOption-important"
          >
            <div>
              <span class="icon-container">
                <i class="fas fa-star"></i>
              </span>
              <p>Important</p>
            </div>
            <span>{{ count.important }}</span>
          </div>
          <!-- Completed todo link -->
          <div
            @click="makeActive('completed')"
            :class="{ active: isActive == 'completed' }"
            class="listOption listOption-completed"
          >
            <div>
              <span class="icon-container">
                <i class="fas fa-check-double"></i>
              </span>
              <p>Completed</p>
            </div>
            <span>{{ count.completed }}</span>
          </div>
          <!-- Due todo link -->
          <div
            @click="makeActive('due')"
            :class="{ active: isActive == 'due' }"
            class="listOption listOption-due"
          >
            <div>
              <span class="icon-container">
                <i class="far fa-calendar-times"></i>
              </span>
              <p>Due</p>
            </div>
            <span>{{ count.due }}</span>
          </div>
        </div>
        <div class="place-bottom width-100">
          <div class="listOption listOption-settings" @click="setingsMenuClicked">
            <div>
              <span class="icon-container">
                <i class="fas fa-cog"></i>
              </span>
              <p>Settings</p>
            </div>
          </div>
          <div class="listOption listOption-logout" @click="logout">
            <div>
              <span class="icon-container">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="$store.state.showSidepanel"
        @click="$store.state.showSidepanel = false"
        :class="{sidePanel_hide: $store.state.showSidepanel }"
      >
        <i class="fas fa-chevron-left"></i>
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
        important: this.$store.state.todoCount.important,
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
    setingsMenuClicked() {
      this.$store.state.settingsClicked = true;
      this.$store.state.showSidepanel = false;
    },
    makeActive(type) {
      if (type === "due") {
        this.$store.state.show_lists = type;
      } else if (type === "completed") {
        this.$store.state.show_lists = type;
      } else if (type === "important") {
        this.$store.state.show_lists = type;
      } else {
        this.$store.state.show_lists = type;
      }
      this.$store.state.showSidepanel = false;
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
  color: #2c3e50;
}
.sidePanel_wrap {
  width: 45%;
  height: 100%;
}
.sidePanel {
  height: 100%;
  width: 100%;
  padding: 10px 0px;
  position: relative;
  background-color: #fff;
}
.profilePic {
  margin-top: 20px;
  width: 100%;
}
.profilePic img {
  display: block;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  object-fit: cover;
  margin: 0px auto;
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
.listOption-important:hover {
  color: orange;
}
.listOption-important.active {
  border-right: 3px solid orange;
  color: orange;
}
.listOption-completed:hover {
  color: #009578;
}
.listOption-completed.active {
  border-right: 3px solid #009578;
  color: #009578;
}
.listOption-due:hover {
  color: #e60023;
}
.listOption-due.active {
  border-right: 3px solid #e60023;
  color: #e60023;
}

.listOption-logout:hover {
  color: #e60023;
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
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.todoDetails,
.settings {
  position: relative;
  padding: 30px 30px;
  height: 100%;
  width: 400px;
  background-color: #fff;
  margin-left: 10px;
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
  width: 100%;
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
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.503);
}
.settings-backgroundImage-option:focus {
  border: 2px solid dodgerblue;
}
.settings-colorScheme {
  padding: 6px 10px;
  border: 0.5px solid lightgrey;
  outline: none;
  transition: 200ms;
  margin-left: 5px;
}
.settings-colorScheme option {
  background-color: rgb(255, 255, 255);
}
.settings-username {
  outline: none;
  border: 0.5px solid lightgrey;
  transition: padding 200ms;
  font-size: 15px;
  margin: 10px 0 10px 5px;
  font-family: inherit;
  padding: 5px 8px;
}

/* animation */
.slidePopupSettings-enter-active {
  transition: all 0.3s ease;
}
.slidePopupSettings-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slidePopupSettings-enter,
.slidePopupSettings-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.sidePanel_hide {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100px;
  width: 40px;
  margin-left: 10px;
  border-radius: 20px;
  cursor: pointer;
}
@media only screen and (max-width: 667px) {
  .sidePanel {
    display: none;
  }
  .sidePanel_wrap {
    display: none;
  }
  .sidePanel_wrap_responsive {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    animation-name: slidein;
    animation-duration: 100ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
  }
  .sidepanelResponsive {
    display: block !important;
    width: 80%;
    height: 100%;
  }
  @keyframes slidein {
    to {
      opacity: 1;
      transform: translateX(0px);
    }
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
  }

  .todoDetails,
  .settings {
    width: 80%;
    backdrop-filter: blur(5px);
  }
}
</style>

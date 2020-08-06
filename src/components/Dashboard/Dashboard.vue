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
      UserData: {{userData}}
      <div class="listOption listOption-logout" @click="logout">
        <p>Log out</p>
      </div>
    </div>
    <Lists></Lists>
    <transition name="Popup">
      <Details @hideDetails="hideDetails" v-if="todoClicked"></Details>
    </transition>
  </div>
</template>

<script>
import Details from "./Details";
import Lists from "./Lists";
import { eventBus } from "../../main.js";
export default {
  components: { Details, Lists },
  data() {
    return {
      todoClicked: false,
      bgUrl: "",
      userData: null,
      todoCount: 6,
    };
  },
  computed: {},
  methods: {
    hideDetails() {
      this.todoClicked = false;
    },
    logout() {
      this.$router.push("/signup");
    },
  },
  created() {
    eventBus.$on("showDetails", (todoIndex) => {
      this.todoClicked = true;
      console.log(todoIndex);
    });
    this.$store.dispatch("getUserData");
    this.userData = this.$store.state.userData;
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
</style>
<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div v-if="loadingState" class="loadingState">
        <div>{{ loadingStateMsg }}</div>
      </div>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    loadingState() {
      return this.$store.state.loadingState;
    },
    loadingStateMsg() {
      return this.$store.state.loadingStateMsg;
    },
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  /* color: #2c3e50; */
  color: rgb(46, 46, 46);
  height: 100%;
  width: 100vw;
  overflow: auto;
  overflow-x: hidden;
}
.loadingState {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  /* color: black; */
  font-size: 50px;
  z-index: 100;
}
.loadingState div {
  padding-bottom: 15px;
  position: relative;
}
.loadingState div:after {
  position: absolute;
  bottom: 0;
  content: "";
  height: 5px;
  width: 20%;
  background-color: var(--primaryColor);
  border-radius: 20px;
  animation-name: loading;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes loading {
  0% {
    left: 0%;
  }
  25% {
    width: 30%;
  }
  50% {
    left: 80%;
    width: 20%;
  }
  75% {
    width: 30%;
  }
  100% {
    left: 0%;
  }
}
a {
  color: var(--primaryColorLighten);
}
.close-btn {
  display: inline-block;
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: 100;
  outline: none;
  cursor: pointer;
}
.close-btn:focus {
  border: none;
  outline: none;
}
.Popup-enter {
  /* transform: translateY(-10px); */
  opacity: 0;
}
.Popup-enter-active {
  transition: all 0.1s;
}
.Popup-leave-active {
  transition: all 0.1s;
}
.Popup-leave-to {
  /* transform: translateY(-10px); */
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(50px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 100ms ease;
}
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all 100ms ease;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 70ms;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 70ms;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 40px;
}
/* For dark theme */
.darkTheme .sidePanel .listOption:hover {
  background-color: rgba(81, 81, 81, 0.1);
}
.darkTheme .sidePanel,
.darkTheme .settings,
.darkTheme .todoDetails {
  background-color: rgb(34, 34, 34) !important;
  color: rgb(174, 174, 174);
}
.darkTheme .allLists .todoItem {
  color: rgb(174, 174, 174);
  background-color: rgba(34, 34, 34, 0.551);
}
.darkTheme .allLists .todoTitle {
  color: rgb(220, 220, 220);
}
.darkTheme .settings .btn,
.darkTheme .todoDetails .btn {
  background-color: rgba(73, 73, 73, 0.109) !important;
}
.darkTheme .todoDetails .todoDetails-dueDatePicker .dueDatePicker-cancel {
  background-color: rgba(73, 73, 73, 0.109) !important;
  color: inherit !important;
}
.darkTheme .settings input,
.darkTheme .settings textarea,
.darkTheme .settings select,
.darkTheme .settings select option,
.darkTheme .todoDetails input,
.darkTheme .todoDetails textarea {
  background-color: rgb(34, 34, 34) !important;
  color: rgb(174, 174, 174);
  border-color: rgb(41, 41, 41);
}

.darkTheme .settings input:hover,
.darkTheme .settings textarea:hover,
.darkTheme .todoDetails input:hover,
.darkTheme .todoDetails textarea:hover {
  border-color: rgb(64, 64, 64);
}
.darkTheme .settings select option {
  display: inline-block !important;
  padding: 50px !important;
}

.darkTheme .sidePanel_hide {
  background-color: rgb(34, 34, 34) !important;
  color: rgb(174, 174, 174);
}
</style>

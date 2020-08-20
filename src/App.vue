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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100vw;
  overflow: hidden;
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
  background-color: #009578;
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
  color: #009578;
}
.close-btn {
  display: inline-block;
  background: transparent;
  border: none;
  transform: rotate(45deg);
  font-size: 30px;
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
  transition: all 0.3s;
}
.Popup-leave-active {
  transition: all 0.2s;
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
</style>

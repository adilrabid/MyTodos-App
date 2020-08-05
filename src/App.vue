<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
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
  width: 100%;
}

a {
  color: #17b978;
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
</style>

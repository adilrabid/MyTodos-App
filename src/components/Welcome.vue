<template>
  <div class="welcome-wrap">
    <img class="applogo" src="../assets/logo.jpg" alt="Logo" />
    <div class="welcome">
      <h1 class="welcome-heading">My Todo Lists</h1>
      <h3
        class="welcome-msg"
      >A simple and faster way to keep track of all your work to do in a nutshell.</h3>
      <p class="routeToMsg">Use My Todolist for free</p>
      <button @click="routeToSignUp" class="btn">Sign Up</button>
      <p class="routeToMsg">Already has an account?</p>
      <button @click="routeToLogin" class="btn">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    routeToSignUp() {
      this.$router.push("/signup");
    },
    routeToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.welcome-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.welcome {
  text-align: center;
}
.applogo {
  height: 80px;
  width: auto;
  margin-bottom: 20px;
}
.welcome-heading {
  color: #17b978;
  margin-top: 0;
}
.welcome-msg {
  padding: 0 15%;
}

.btn {
  background-color: #17b978;
  width: 250px;
  padding: 10px 0px;
  color: white;
  border: none;
  outline: none;
  margin: 10px auto;
  font-size: 20px;
  border-radius: 20px;
  transition: 100ms;
  cursor: pointer;
  box-shadow: 0px 5px 10px 0.5px #41b98977;
}
.btn:hover {
  background-color: #14a169;
}
.routeToMsg {
  margin-top: 30px;
}
</style>
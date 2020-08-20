<template>
  <div class="welcome-wrap">
    <img class="applogo" src="../assets/logo.jpg" alt="Logo" />
    <div class="welcome">
      <h1 class="welcome-heading">My Todo Lists</h1>
      <p
        class="welcome-msg"
      >A simple and faster way to keep track of all your work to do in a nutshell.</p>
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
  color: #009578;
  margin-top: 0;
}
.welcome-msg {
  padding: 0 15%;
  font-size: 22px;
}

.btn {
  background-color: #009578;
  width: 250px;
  padding: 10px 0px;
  color: white;
  border: none;
  outline: none;
  margin: 10px auto;
  font-size: 20px;
  border-radius: 5px;
  transition: 100ms;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px rgba(228, 228, 228, 0.5);
}
.btn:hover {
  background-color: #009578;
}
.routeToMsg {
  margin-top: 30px;
}
</style>
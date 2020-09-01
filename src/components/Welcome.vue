<template>
  <div class="welcome-wrap">
    <nav class="welcome-nav">
      <div class="welcome-menuItems">
        <img :src="favicon" alt="Logo" height="50px" width="50px" />
        <span>
          <button @click="routeToSignUp">Sign up</button>
          <span class="or">
            <b>or</b>
          </span>
          <button @click="routeToLogin">Login</button>
        </span>
      </div>
    </nav>
    <!-- <img class="applogo" src="../assets/logo.jpg" alt="Logo" /> -->
    <div class="welcome" :style="cover">
      <h1 class="welcome-heading">Welcome to Mytodos</h1>
      <p class="welcome-msg" style="maxWidth : 700px">
        A simple and faster way to keep track of all your daily tasks to do.
        Get a clear overview of everything on your plate and never lose track
        of the important tasks.
      </p>
      <br />

      <button @click="routeToSignUp" class="routeToSignUp-btn">Create an account</button>
    </div>
    <div class="welcome-features">
      <h2 class="welcome-features-title">Features</h2>
      <hr class="welcome-features-hr" />
      <ul class="welcome-features-options">
        <li
          v-for="(featureList,index) in featureLists"
          class="welcome-features-option"
          :key="index"
        >
          <span v-html="featureList.icon"></span>
          <h3>{{featureList.head}}</h3>
          <p>{{featureList.text}}</p>
        </li>
      </ul>
    </div>
    <div class="welcome-builtWith">
      <h2 class="welcome-builtWith-title">Built With</h2>
      <hr class="welcome-builtWith-hr" />
      <div class="welcome-builtWith-logos">
        <div class="welcome-builtWith-option">
          <img :src="logos[0]" alt />
        </div>
        <div class="welcome-builtWith-option">
          <img :src="logos[1]" alt />
        </div>
        <div class="welcome-builtWith-option">
          <img :src="logos[2]" alt />
        </div>
        <div class="welcome-builtWith-option">
          <img :src="logos[5]" alt />
        </div>
        <div class="welcome-builtWith-option">
          <img :src="logos[3]" alt />
        </div>
        <div class="welcome-builtWith-option">
          <img :src="logos[4]" alt />
        </div>
      </div>
    </div>
    <div class="welcome-quote">
      <h2 class="welcome-quote-title">Free up your mental space</h2>
      <hr class="welcome-quote-hr" />
      <p class="welcome-quote-msg">
        Regain clarity and calmness by getting all those tasks out of your head and onto your
        todolist.
        <br />(no matter where you are or what device you use).
      </p>
      <br />
      <button @click="routeToSignUp" class="routeToSignUp-btn">Create an account</button>
    </div>
    <div class="welcome-footer">
      <p>Copyrignt © 2020 | Mytodos</p>
    </div>
  </div>
</template>

<script>
import favicon from "../assets/favicon.png";
export default {
  data() {
    return {
      favicon: favicon,
      featureLists: [
        {
          head: "Hot Reload",
          text:
            "Hot reload provides a great user experience by changing dom elements without refreshing page.",
          icon: "<i class='fab fa-hotjar'></i>",
        },
        {
          head: "Dark Theme",
          text:
            "You can switch between light or dark theme. Switching to dark theme will provide more eye comfort.",
          icon: "<i class='fas fa-adjust'></i>",
        },
        {
          head: "Preference",
          text:
            "By changing list's background image you can set up your own preferences.",
          icon: "<i class='fas fa-quidditch'></i>",
        },
        {
          head: "Lists Management",
          text:
            "Manage your todo lists by marking theme as completed, important adding a duedate and even can change their title, description etc.",
          icon: " <i class='fas fa-clipboard-list'></i>",
        },
        {
          head: "Security",
          text:
            "The whole system is protected by Google firebase authentication system, that ensures your accounts safety and protect illegal routing.",
          icon: "<i class='fas fa-shield-alt'></i>",
        },
        {
          head: "Responsive",
          text:
            "Use this across all the smart devices. Provides a great user experience whether yo're in pc or smartphone.",
          icon: "  <i class='fas fa-mobile-alt'></i>",
        },
      ],
    };
  },
  computed: {
    cover() {
      return { backgroundImage: "url(" + this.$store.state.CoverPic + ")" };
    },
    logos() {
      return this.$store.state.logos;
    },
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

<style>
:root {
  /* --primaryColor: #2962ff; */
  --primaryColor: rgb(30, 105, 255);
  --primaryColorLighten: rgb(30, 150, 255);
  --primaryColorDisabled: rgb(100, 183, 255);
  --primaryColorDarken: rgb(31, 101, 241);
  --btnBoxShadow: 2px 2px 10px 1px rgba(35, 35, 35, 0.272);
  --textShadow: 0px 1px 3px rgba(35, 35, 35, 0.2);
}
.or {
  color: #f2f3f7;
  text-shadow: 0px 1px 5px rgba(35, 35, 35, 0.66);
}
.welcome-wrap {
  height: 100%;
  width: 100%;
  position: relative;
}
.welcome-nav {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 50px;
  /* background-color: rgba(255, 255, 255, 0.673); */
  position: absolute;
  top: 0;
  left: 0;
}
.welcome-nav .welcome-menuItems {
  margin: 0 !important;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.welcome-nav .welcome-menuItems button {
  background-color: var(--primaryColor);
  box-shadow: var(--btnBoxShadow);
  text-shadow: var(--textShadow);
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  /* display: inline-block; */
  margin: 0 15px;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: normal;
  cursor: pointer;
}
.welcome-nav .welcome-menuItems button:hover {
  background-color: var(--primaryColorDarken);
}
.welcome {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  height: 100vh;
  background-size: cover;
}
.applogo {
  height: 80px;
  width: auto;
  margin-bottom: 20px;
}
.welcome-heading {
  font-weight: normal;
  margin: 0 0 20px 10px;
}
.welcome-msg {
  font-size: 22px;
  font-weight: 100;
  margin: 0 0 0 10px;
}

.routeToSignUp-btn,
.routeToLogin-btn {
  box-shadow: var(--btnBoxShadow);
  background-color: var(--primaryColor);
  text-shadow: var(--textShadow);
  width: 250px;
  padding: 10px 0px;
  color: white;
  border: none;
  outline: none;
  margin: 10px 0;
  font-size: 20px;
  border-radius: 20px;
  transition: 200ms;
  cursor: pointer;
}
.routeToSignUp-btn:hover,
.routeToLogin-btn:hover {
  background-color: var(--primaryColorDarken);
}
.welcome-features-title,
.welcome-builtWith-title {
  font-weight: normal;
  text-align: center;
  margin-bottom: 10px;
}
.welcome-features-hr,
.welcome-builtWith-hr,
.welcome-quote-hr {
  background-color: var(--primaryColor);
  padding: 1px;
  border: none;
  outline: none;
  width: 150px;
  margin-bottom: 50px;
  border-radius: 50%;
}

.welcome-builtWith-logos {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.welcome-builtWith-option {
  margin: 0px 20px 50px;
}
.welcome-builtWith-option img {
  height: 150px;
  width: auto;
}
.welcome-builtWith,
.welcome-features {
  padding: 50px 0 0;
}
.welcome-features-options {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 0;
  list-style: none;
  list-style-position: inside;
}
.welcome-features-option {
  display: inline-block;
  text-align: center;
  max-width: 300px;
  margin: 0px 10px 50px;
}
.welcome-features-option svg {
  font-size: 40px;
}
.welcome-features-option h3 {
  font-weight: normal;
  margin-bottom: 10px;
}
.welcome-features-option p {
  font-weight: 100;
}
.welcome-quote {
  padding: 50px 0px 10px;
  text-align: center;
}
.welcome-quote-hr {
  margin-bottom: 30px;
}
.welcome-quote-title {
  font-weight: normal;
}
.welcome-quote-msg {
  font-weight: 100;
  margin: 0 15px 0px;
}
.welcome-footer {
  /* background-color:; */
  padding: 50px 0;
  text-align: center;
}
@media only screen and (max-width: 667px) {
  .welcome {
    padding: 15px;
  }
  .welcome-nav {
    padding: 15px 10px;
  }
}
</style>
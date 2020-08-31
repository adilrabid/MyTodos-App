<template>
  <div class="container">
    <div class="form-wrap">
      <form class="form" @submit.prevent="submitted">
        <h2 class="form-heading">Login</h2>
        <div :class="{ invalid: $v.email.$error }">
          <label for="email-l">Email :</label>
          <input
            @blur="$v.email.$touch()"
            v-model.trim="email"
            type="email"
            id="email-l"
            class="email"
          />
          <p v-if="!$v.email.email" class="errorMsg error">Please enter a valid email!</p>
        </div>
        <div :class="{ invalid: $v.password.$error }">
          <label for="password-l">Password :</label>
          <input
            @blur="$v.password.$touch()"
            v-model="password"
            type="password"
            id="password-l"
            class="password"
            autocomplete="false"
          />
        </div>
        <button :disabled="validationSuccess" type="submit" class="submit">Login</button>
        <transition name="fade">
          <p v-if="loginError" class="errorMsg error" style="marginTop: 0.1px">{{ errorMsg }}</p>
        </transition>
      </form>
    </div>
    <p class="suggession">
      Don't Have an account?
      <a @click="routeToSignUp">Create one</a>
    </p>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: null,
      password: null,
      errorMsg: "Wrong email or passord, please try again!",
    };
  },
  watch: {
    loginError(value) {
      setTimeout(() => {
        this.$store.state.loginError = false;
        return value;
      }, 5000);
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    validationSuccess() {
      if (
        this.email != null &&
        this.password != null &&
        this.$v.$error == false
      ) {
        return false;
      } else {
        return true;
      }
    },
    loginError() {
      return this.$store.state.loginError;
    },
  },
  methods: {
    submitted() {
      if (!this.email || !this.password) {
        alert("Please fillup all the fields first!");
        return;
      }
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    routeToSignUp() {
      this.$router.push("/signup");
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scaleY(0);
}
</style>

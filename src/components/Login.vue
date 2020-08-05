<template>
  <div class="container">
    <div class="form-wrap">
      <form class="form" @submit.prevent="submitted">
        <h2 class="form-heading">Login</h2>

        <div :class="{ invalid: $v.email.$error }">
          <label for="email-s">Email :</label>
          <input @blur="$v.email.$touch()" v-model="email" type="email" id="email-s" class="email" />
          <p v-if="!$v.email.email" class="errorMsg error">Please enter a valid email!</p>
        </div>
        <div :class="{ invalid: $v.password.$error }">
          <label for="password-s">Password :</label>
          <input
            @blur="$v.password.$touch()"
            v-model="password"
            type="password"
            id="password-s"
            class="password"
          />
          <p
            v-if="$v.password.$error"
            class="errorMsg error"
          >Password must be at least 6 characters!</p>
        </div>
        <input :disabled="validationSuccess" type="submit" value="SIGN UP" class="submit" />
      </form>
    </div>
    <p class="suggession">
      Don't Have an account?
      <a @click="routeToSignUp">Create one</a>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: null,
    };
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
      if (this.$v.$error == false) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    submitted() {
      axios
        .post("https://mytodos-7797f.firebaseio.com/lgin.json", {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // this.$store.dispatch("login", {
    //   email: this.email,
    //   password: this.password,
    // });
    routeToSignUp() {
      this.$router.push("/signup");
    },
  },
};
</script>
<style scoped>
</style>

<template>
  <div class="container">
    <div class="form-wrap">
      <transition name="Popup">
        <Terms @hideTnc="showTnc = $event" v-if="showTnc"></Terms>
      </transition>
      <form class="form" @submit.prevent="submitted">
        <h2 class="form-heading">SIGN UP</h2>
        <div :class="{ invalid: $v.username.$error }">
          <label for="username-s">Username :</label>
          <input
            @blur="$v.username.$touch()"
            v-model="username"
            type="text"
            id="username-s"
            class="username"
          />
          <p v-if="$v.username.$error" class="errorMsg error">Please enter a username!</p>
        </div>
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
            autocomplete="false"
          />
          <p
            v-if="$v.password.$error"
            class="errorMsg error"
          >Password must be at least 6 characters!</p>
        </div>
        <div :class="{ invalid: $v.confirmPassword.$error }">
          <label for="cPassword-s">Confirm password :</label>
          <input
            @blur="$v.confirmPassword.$touch()"
            v-model="confirmPassword"
            type="password"
            id="cPassword-s"
            class="password"
            autocomplete="false"
          />
          <p v-if="$v.confirmPassword.$error" class="errorMsg error">Passwords didn't matched!</p>
        </div>
        <div class="tnc">
          <div>
            <input
              @change="$v.tnc.$touch()"
              v-model="tnc"
              type="checkbox"
              id="tnc-s"
              class="tncCheckbox"
            />
            <label for="tnc-s" :class="{ error: $v.tnc.$dirty & !$v.tnc.$model }">I agree to the</label>
            <span class="tncLink" @click="showTnc = true">terms and condition</span>.
          </div>
        </div>
        <input :disabled="validationSuccess" type="submit" value="SIGN UP" class="submit" />
      </form>
    </div>
    <p class="suggession">
      Already have an account?
      <a @click="routeToLogin">Login</a>
      instead
    </p>
  </div>
</template>

<script>
import Terms from "./Terms";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  components: { Terms },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      tnc: false,
      showTnc: false,
    };
  },
  validations: {
    tnc: {
      required,
    },
    username: {
      required,
    },
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password"),
    },
  },
  methods: {
    submitted() {
      if (this.validationSuccess) {
        alert("Please fillup all the fields first!");
        return;
      }
      this.$store.dispatch("signup", {
        email: this.email,
        username: this.username,
        password: this.password,
        tnc: this.tnc,
      });
    },
    routeToLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    validationSuccess() {
      if (
        this.username != null &&
        this.email != null &&
        this.password != null &&
        this.$v.tnc.$model == true &&
        this.$v.$error == false
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-wrap {
  display: flex;
  align-items: center;
}

form.form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0px 3px 5px 2px rgba(228, 228, 228, 0.5);
  padding: 30px 40px;
}
.form-heading {
  display: block;
  margin: 0 auto 10px;
}
label,
.tnc {
  font-size: 15px;
}
label[for="tnc-s"] {
  margin-right: 5px;
}
.tncLink {
  color: #17b978;
  cursor: pointer;
  transition: all 200ms;
  font-weight: bold;
}

.email,
.password,
.username {
  width: 100%;
  margin-bottom: 15px;
  margin-top: 6px;
  padding: 8px 15px;
  font-size: 15px;
  border: 0.1px solid lightgrey;
  outline: none;
  border-radius: 5px;
}
.tnc {
  display: flex;
}
.tncCheckbox {
  margin-right: 10px;
}
.submit {
  margin: 15px 0 10px;
  padding: 8px 30px;
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #17b978;
  color: white;
  transition: background-color 200ms;
}
.submit:hover {
  background-color: #3fae7c;
  cursor: pointer;
}
.submit:disabled {
  background-color: #4dca9292;
  cursor: not-allowed;
}
.invalid input {
  transition: 300ms;
  border-color: red;
}
.error {
  color: red;
}
.errorMsg {
  padding: 0;
  font-size: 10px;
  margin-top: -12px;
  margin-bottom: 3px;
}
.suggession {
  margin-top: 20px;
}
.suggession a {
  cursor: pointer;
}
</style>

<template>
  <div class="form-container">
    <vee-form :validation-schema="schema" class="register-form" @submit="register">
      <!--  -->
      <div class="logo-wrapper">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
      </div>

      <p class="login-register__text">Never forget the important things again.</p>

      <!-- Message of the login Status: Failed, Loadings, Success -->
      <p v-if="reg_show_alert" class="error-text reg-error-text">
        {{ reg_alert_msg }}
      </p>

      <div class="inputs">
        <!-- Username -->
        <div class="input">
          <vee-field name="username" type="text" placeholder="Username" />
        </div>
        <ErrorMessage class="error-text" name="username" />
        <!-- Email -->
        <div class="input">
          <vee-field name="email" type="email" placeholder="Email" />
        </div>
        <ErrorMessage class="error-text" name="email" />
        <!-- Password -->
        <div class="input">
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <input type="password" placeholder="Password" v-bind="field" />
            <div class="error-text" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
        </div>
        <!-- Confirm Password -->
        <div class="input">
          <vee-field
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <ErrorMessage class="error-text" name="confirm_password" />
        <base-button class="login-register-btn purple" type="submit">Sign up</base-button>
      </div>

      <div class="signin-signup__wrapper">
        <p>Already have an account?</p>
        <router-link :to="{ name: 'Login' }">Sign in</router-link>
      </div>
    </vee-form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";
import router from "../router/index";

export default {
  name: "Register",
  data() {
    return {
      schema: {
        username: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:9|max:100",
        confirm_password: "password_mismatch:@password",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_msg: "Please wait! Your account is being created.",
    };
  },
  methods: {
    // to use the actions from '../stores/user.js'
    // using an alias for this "createUser" is the alias for register
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_msg = "Please wait! Your account is being created.";

      // all the data from the inputs will be in the 'values' parameter
      try {
        // actions used from "../stores/user"
        await this.createUser(values);
        router.push("/login");
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            this.reg_alert_msg = "Email already in use";
            break;
          case "auth/invalid-email":
            this.reg_alert_msg = "Invalid email";
            break;
          case "auth/operation-not-allowed":
            this.reg_alert_msg = "Operation not allowed";
            break;
          case "auth/weak-password":
            this.reg_alert_msg = "Weak password";
            break;
          case "auth/missing-email":
            this.reg_alert_msg = "Please input an email address";
            break;
          case "auth/missing-password":
            this.reg_alert_msg = "Please input a password";
            break;
          case "auth/admin-restricted-operation":
            this.reg_alert_msg = "Please input necessary details";
            break;
          default:
            this.reg_alert_msg = "Something went wrong";
        }
        return;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.register-form {
  @apply grid place-items-center w-[90%] max-w-[22.5rem] m-auto;
}

.signin-signup__wrapper a {
  @apply text-sm text-purple-500 font-medium md:text-base;
}

.reg-error-text {
  @apply text-base mb-3;
}
</style>

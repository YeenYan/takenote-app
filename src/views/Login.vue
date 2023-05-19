<template>
  <div class="form-container">
    <vee-form :validation-schema="loginSchema" class="login-form" @submit="login">
      <div class="logo-wrapper">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
      </div>

      <p class="login-register__text">Never forget the important things again.</p>

      <!-- Message of the login Status: Failed, Loadings, Success -->
      <p v-if="login_show_alert" class="error-text login-error-text">
        {{ login_alert_msg }}
      </p>

      <div class="inputs">
        <!-- email -->
        <div class="input">
          <vee-field name="email" type="email" placeholder="Email" />
        </div>
        <ErrorMessage class="error-text" name="email" />
        <!-- password -->
        <div class="input">
          <vee-field name="password" type="password" placeholder="Password" />
        </div>
        <ErrorMessage class="error-text" name="password" />
        <base-button class="login-register-btn yellow" type="submit" @click="login"
          >Log in</base-button
        >
      </div>

      <router-link class="forgotPassword" :to="{ name: 'ForgotPassword' }"
        >Forgot Password</router-link
      >

      <div class="signin-signup__wrapper">
        <p>Don't have an account?</p>
        <router-link :to="{ name: 'Register' }">Sign up</router-link>
      </div>
    </vee-form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";
import router from "../router/index";

export default {
  name: "Login",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      //Used to disable the button while the form is submitting
      login_in_submission: false,
      // used to toggle the alerts visibility
      login_show_alert: false,
      // message inside the alert
      login_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_msg = "Please wait! We are logging you in.";

      try {
        // the "values" argument is where we're keeping the email & password input values
        await this.authenticate(values);
        router.push("/TakeNote");
        console.log("login");
      } catch (error) {
        this.login_in_submission = false;
        // this.login_alert_msg = "Invalid login details";
        console.log(error.code);

        switch (error.code) {
          case "auth/user-not-found":
            this.login_alert_msg = "User not found";
            break;
          case "auth/wrong-password":
            this.login_alert_msg = "Wrong password";
            break;
          case "auth/missing-email":
            this.login_alert_msg = "Please input an email address";
            break;
          case "auth/missing-password":
            this.login_alert_msg = "Please input a password";
            break;
          case "auth/admin-restricted-operation":
            this.login_alert_msg = "Please input necessary details";
            break;
          default:
            this.login_alert_msg = "Something went wrong";
        }
        return;
      }

      // window.location.reload();
    },
  },
};
</script>

<style lang="postcss">
.form-container {
  @apply grid place-items-center h-screen;
}

.login-form {
  @apply grid place-items-center w-[90%] max-w-[22.5rem] m-auto;
}

.login-register__text {
  @apply text-sm text-neutral-600 text-center font-medium my-9 md:text-base;
}

.logo-wrapper {
  @apply w-full max-w-[14rem];
}

.inputs {
  @apply flex flex-col gap-3 w-full;
}

.input {
  @apply w-full px-2.5 py-3.5 border-[.5px] border-neutral-400 rounded;
}

.input input {
  @apply w-full text-neutral-600;
}

.input input:focus {
  @apply outline-none;
}

.login-register-btn {
  @apply md:w-full;
}

.forgotPassword {
  @apply text-xs text-primary-500 mt-6;
}

.signin-signup__wrapper {
  @apply text-center mt-12;
}

.signin-signup__wrapper p {
  @apply text-xs text-neutral-500 md:text-sm;
}

.signin-signup__wrapper a {
  @apply text-sm text-primary-500 font-medium md:text-base;
}

.login-error-text {
  @apply text-base mb-3;
}
</style>

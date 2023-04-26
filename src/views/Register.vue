<template>
  <div class="form-container">
    <vee-form :validate-schema="schema" class="register-form" @submit="register">
      <div class="logo-wrapper">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
      </div>

      <p class="login-register__text">Never forget the important things again.</p>

      <div class="inputs">
        <!-- Username -->
        <div class="input">
          <vee-field name="username" type="text" placeholder="Username" />
          <ErrorMessage class="text-error-500" name="username" />
        </div>
        <!-- Email -->
        <div class="input">
          <vee-field name="email" type="email" placeholder="Email" />
          <ErrorMessage class="text-error-500" name="email" />
        </div>
        <!-- Password -->
        <div class="input">
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <input type="password" placeholder="Password" v-bind="field" />
            <div class="text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
        </div>
        <!-- Confirm Password -->
        <div class="input">
          <vee-field name="confirm_password" type="text" placeholder="Confirm Password" />
          <ErrorMessage class="text-error-500" name="confirm_password" />
        </div>
        <base-button color="purple" class="login-register-btn" type="submit"
          >Sign up</base-button
        >
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
// import useUserStore from "../stores/user";

export default {
  name: "Register",
  data() {
    return {
      schema: {
        username: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "password_mismatch:@password",
      },
    };
  },
  methods: {
    // // to use the actions from '../stores/user.js'
    // // using an alias for this "createUser" is the alias for register
    // ...mapActions(useUserStore, {
    //   createUser: "register",
    // }),
    // async register(values) {
    //   // all the data from the inputs will be in the 'values' parameter
    //   try {
    //     // actions used from "../stores/user"
    //     await this.createUser(values);
    //   } catch (error) {
    //     return;
    //   }
    //   window.location.reload();
    // },
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
</style>

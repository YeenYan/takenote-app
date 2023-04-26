<template>
  <div class="form-container">
    <form class="login-form" @submit.prevent="login">
      <div class="logo-wrapper">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
      </div>

      <p class="login-register__text">Never forget the important things again.</p>

      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" />
        </div>
        <base-button color="yellow" class="login-register-btn" type="submit"
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
    </form>
  </div>
</template>

<script>
export default {};
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
</style>

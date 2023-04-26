<template>
  <div class="form-container">
    <form class="reset-form">
      <h3>Reset Password</h3>
      <p>Enter your email to reset it</p>

      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <base-button color="gray" class="login-register-btn">Reset</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.reset-form {
  @apply grid place-items-center w-[90%] max-w-[22.5rem] m-auto;
}

.reset-form h3 {
  @apply text-3xl text-neutral-600 font-semibold md:text-4xl;
}

.reset-form p {
  @apply text-base text-neutral-600 mt-2 mb-7;
}
</style>

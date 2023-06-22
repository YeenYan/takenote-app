<template>
  <div class="pageNotFound__container">
    <div>
      <div class="image__wrapper">
        <img src="../assets/images/404.svg" />
      </div>
      <div class="text__wrapper">
        <p class="titleText">Page not found</p>
        <p class="contentText">
          The page you are looking for doesn't exist or an error occurred, go back to home
          page.
        </p>
      </div>
      <router-link :to="{ name: 'Home' }" class="signup">Go Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style lang="postcss" scoped>
.pageNotFound__container {
  @apply flex justify-center items-center w-[90%] h-screen mx-auto;
}

.image__wrapper {
  @apply w-full max-w-[25rem] mx-auto;
}

.text__wrapper {
  @apply my-[2rem];
}

.titleText {
  @apply text-4xl text-neutral-600 font-semibold text-center;
}

.contentText {
  @apply text-base text-neutral-500 text-center mt-[.4rem] w-[90%] max-w-[34rem] mx-auto;
}

.btnBack {
  @apply max-w-[14rem] mx-auto;
}

.signup {
  @apply text-sm font-semibold text-shades-white flex items-center justify-center py-3 px-8 w-full max-w-[14rem] rounded bg-yellow-500 border-0 mx-auto;
}
</style>

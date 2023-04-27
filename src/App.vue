<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

body {
  @apply font-sans p-0 m-0 box-border;
}

.error-text {
  @apply text-red-500 italic text-sm leading-none;
}

/* .guide {
  @apply outline-1 outline-red-500 outline;
} */
</style>

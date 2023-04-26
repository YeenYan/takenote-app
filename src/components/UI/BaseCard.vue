<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.card-wrapper {
  @apply w-full max-w-[18.5rem] bg-blue-500;
}
</style>

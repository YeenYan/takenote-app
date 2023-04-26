<template>
  <button :class="[color, 'btn']">
    <slot name="icon" v-if="!show"></slot>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["color"],
};
</script>

<style lang="postcss" scoped>
.btn :deep(.btn-icon) {
  @apply mr-4;
}

.btn {
  @apply text-shades-white text-base flex items-center justify-center py-3 px-8 rounded w-full;
  /* md:max-w-fit */
}

.purple {
  @apply bg-purple-500;
}

.yellow {
  @apply bg-primary-500;
}

.blue {
  @apply bg-blue-500;
}

.gray {
  @apply bg-gray-700;
}
</style>

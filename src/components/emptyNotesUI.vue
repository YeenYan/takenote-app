<template>
  <div class="emptyNote__container">
    <div class="emptyNote__wrapper">
      <img src="../assets/images/emptynote.svg" alt="" />
    </div>
    <p>You don't have any notes yet.</p>
  </div>
</template>

<script>
// import sadasd from "../assets/images/emptynote.svg";

export default {
  name: "emptyNotesUI",
};
</script>

<style lang="postcss" scoped>
.emptyNote__container {
  @apply flex flex-col items-center;
}

.emptyNote__container > p {
  @apply text-neutral-500;
}

.emptyNote__wrapper {
  @apply w-full max-w-[23rem] mx-auto mt-[4rem];
}
</style>

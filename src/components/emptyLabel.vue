<template>
  <div class="emptyLabel__container">
    <div class="emptyLabel__wrapper">
      <img src="../assets/images/emptylabel.svg" alt="" />
    </div>
    <h2>Add your first note</h2>
    <p>Relax and note something beautiful</p>
    <base-button class="yellow btnAdd" @click.prevent="addLabel">Add Folder</base-button>
  </div>
</template>

<script>
export default {
  name: "emptyLabel",
  methods: {
    addLabel() {
      this.$emit("add-label");
    },
  },
};
</script>

<style lang="postcss" scoped>
.emptyLabel__container {
  @apply flex flex-col items-center justify-center;
}

.emptyLabel__wrapper {
  @apply w-full max-w-[30rem];
}

h2 {
  @apply text-[2rem] text-neutral-500 text-center font-semibold mt-[2rem];
}

p {
  @apply text-[1rem] text-center text-neutral-400 mt-[.5rem];
}

.btnAdd {
  @apply max-w-[13rem] mt-[2rem];
}
</style>

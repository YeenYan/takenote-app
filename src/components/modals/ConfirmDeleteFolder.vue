<template>
  <modal-wrapper>
    <div class="deleteFolder__container">
      <p class="headingText">Folder Deletion</p>
      <p class="contentText">
        By deleting this folder, all associated notes within it will be permanently
        deleted as well. This action cannot be undone.
      </p>
      <div class="btn__wrapper">
        <button class="btnDelete" @click.prevent="deleteFolder">Delete</button>
        <button class="btnCancel" @click.prevent="closeAll">Cancel</button>
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapActions } from "pinia";
import useModalStore from "../../stores/modal";
import ModalWrapper from "../modals/ModalWrapper.vue";

export default {
  name: "ConfirmDeleteFolder",
  components: {
    ModalWrapper,
  },
  methods: {
    ...mapActions(useModalStore, ["closeAll"]),
    deleteFolder() {
      this.closeAll();
      this.$emit("delete-folder");
    },
  },
};
</script>

<style lang="postcss" scoped>
:deep(.modal-container) {
  @apply max-w-[26.25rem];
}

.deleteFolder__container {
  @apply flex flex-col items-center gap-4 w-full bg-shades-white px-[1.8rem] py-[1.25rem] rounded-lg;
}

p {
  @apply text-center;
}

.headingText {
  @apply text-[1.4rem] text-red-500 font-medium;
}

.contentText {
  @apply text-sm text-neutral-400 mb-[1rem];
}

.btn__wrapper {
  @apply grid grid-cols-2 w-full;
}

button {
  @apply text-sm font-medium py-[.4rem];
}

.btnDelete {
  @apply text-red-500;
}

.btnCancel {
  @apply text-neutral-400 border-l-[.3px] border-neutral-200;
}
</style>

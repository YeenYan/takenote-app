<template>
  <div class="modalWrapper__container" :class="hiddenClass">
    <!-- Background/Blanket -->
    <div class="blanket-wrapper">
      <div></div>
    </div>

    <div class="modal-container" :class="{ show: modalAnimation, '': !modalAnimation }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useModalStore from "../../stores/modal";

export default {
  name: "ModalWrapper",
  computed: {
    ...mapState(useModalStore, ["hiddenClass", "modalAnimation"]),
  },
};
</script>

<style lang="postcss" scoped>
.modalWrapper__container {
  @apply flex justify-center fixed z-10 inset-0 overflow-y-auto;
}

@media (max-width: 450px) {
  .modalWrapper__container {
    min-height: 100vh;
  }
}

.blanket-wrapper {
  @apply fixed inset-0 transition-opacity;
}

.blanket-wrapper div {
  @apply absolute inset-0 bg-neutral-900 opacity-75;
}

.modal-container {
  @apply absolute top-[20%] w-[90%] z-20;
}

.hidden {
  display: none;
}

/* Modal Animation */

.modal-container.show {
  animation: slideIn-animation 0.2s ease-in-out;
}

@keyframes slideIn-animation {
  0% {
    opacity: 0;
    transform: translateY(30%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

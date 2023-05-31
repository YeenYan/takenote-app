import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    modalAnimation: false,

  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    }
  },
  actions: {
    closeAll() {
      this.isOpen = false;
      this.modalAnimation = false;
    },
    showInputLabelModal() {
      this.isOpen = true;
      this.modalAnimation = true;
    }
  }
});
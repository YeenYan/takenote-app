import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    modalAnimation: false,

    inputLabelModal: false,

    inputNoteModal: false,

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
      this.inputLabelModal = false;
      this.inputNoteModal = false;
    },
    showInputLabelModal() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.inputLabelModal = true;
    },
    showInputNoteModal() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.inputNoteModal = true;
    }
  }
});
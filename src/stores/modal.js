import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    modalAnimation: false,

    inputLabelModal: false,
    updateLabelModal: false,
    updateLabelID: null,
    updateLabelText: '',

    inputNoteModal: false,

    updateNoteModal: false,
    updateID: null,
    updateColor: 'yellow',
    updateNoteTitle: '',
    updateDate: '',
    updateContent: '',

    confirmDeleteFolder: false,

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
      this.updateLabelModal = false;
      this.inputNoteModal = false;
      this.updateNoteModal = false;
      this.confirmDeleteFolder = false;
    },
    showInputLabelModal() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.inputLabelModal = true;
    },
    showUpdateLabelModal() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.updateLabelModal = true;
      // this.updateLabelID = id;
      // this.updateLabelText = label;
    },
    showInputNoteModal() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.inputNoteModal = true;
    },
    showUpdateNoteModal(id, color, noteTitle, date, content) {
      this.isOpen = true;
      this.modalAnimation = true;
      this.updateNoteModal = true;
      this.updateID = id;
      this.updateColor = color;
      this.updateNoteTitle = noteTitle;
      this.updateDate = date;
      this.updateContent = content;
    },
    showConfirmDeleteFolder() {
      this.isOpen = true;
      this.modalAnimation = true;
      this.confirmDeleteFolder = true;
    }
  }
});
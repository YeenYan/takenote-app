<template>
  <modal-wrapper>
    <vee-form :validation-schema="schema" @submit="upload">
      <div class="inputLabel__container">
        <p>Input Folder Name</p>

        <ErrorMessage class="error-text" name="foldername" />
        <div class="input">
          <vee-field
            ref="labelInput"
            name="foldername"
            type="text"
            placeholder="Enter folder name"
            v-model="labelTitle"
          />
        </div>

        <div class="btn__wrapper">
          <button class="btnSave" type="submit">Save</button>
          <button class="btnCancel" @click.prevent="closeAll">Cancel</button>
        </div>
      </div>
    </vee-form>
  </modal-wrapper>
</template>

<script>
import { mapActions } from "pinia";
import useModalStore from "../../stores/modal";

import { labelsCollection, auth } from "../../includes/firebase";

import ModalWrapper from "../modals/ModalWrapper.vue";

export default {
  name: "InputLabel",
  components: {
    ModalWrapper,
  },
  data() {
    return {
      schema: {
        foldername: "required|alpha_spaces",
      },

      labelTitle: "",
      labels: [],
    };
  },
  methods: {
    ...mapActions(useModalStore, ["closeAll"]),
    async upload(values) {
      // For todays Date & time
      const currentDate = new Date();

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        weekday: "short",
      };

      const formattedDate = currentDate.toLocaleString("en-US", options);

      const label = {
        uid: auth.currentUser.uid,
        labelTitle: values.foldername,
        date: formattedDate,
      };

      this.labels.push(label);

      console.log(this.labels);

      // SAVE DATA TO THE FIRESTORE
      await labelsCollection.add(label);

      // Clear the input field
      this.labelTitle = "";

      // Close Modal
      this.closeAll();

      this.$emit("display-label");
    },
  },
};
</script>

<style lang="postcss" scoped>
:deep(.modal-container) {
  @apply max-w-[26.25rem];
}

.inputLabel__container {
  @apply flex flex-col items-center gap-4 w-full bg-shades-white px-[1.8rem] py-[1.25rem] rounded-lg;
}

p {
  @apply text-lg text-neutral-600 font-medium;
}

.input {
  @apply text-sm text-neutral-500 w-full px-[.5rem] py-[.7rem] bg-neutral-100 outline-0 rounded;
}

.input > input {
  @apply bg-neutral-100;
}

.btn__wrapper {
  @apply grid grid-cols-2 w-full;
}

button {
  @apply text-sm font-medium py-[.4rem];
}

.btnSave {
  @apply text-blue-500;
}

.btnCancel {
  @apply text-red-500 border-l-[.3px] border-neutral-200;
}
</style>

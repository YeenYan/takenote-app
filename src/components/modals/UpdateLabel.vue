<template>
  <modal-wrapper>
    <vee-form :validation-schema="schema" @submit="upload">
      <div class="inputLabel__container">
        <p>Update Folder Name</p>

        <div class="input">
          <vee-field
            ref="labelInput"
            name="labelTitle"
            type="text"
            placeholder="Enter folder name"
            v-model="labelTitle"
          />
        </div>

        <div class="btn__wrapper">
          <button class="btnSave" type="submit">Update</button>
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
  props: ["labelID", "updateTitle"],
  name: "UpdateLabel",
  components: {
    ModalWrapper,
  },
  data() {
    return {
      schema: {
        labelTitle: "required|alpha_spaces",
      },

      labelTitle: this.updateTitle,
      labels: [],
    };
  },
  created() {
    console.log(this.labelID);
    console.log(this.updateTitle);
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
        labelTitle: values.labelTitle,
        date: formattedDate,
      };

      this.labels.push(label);

      console.log(this.labels);

      // UPDATE DATA TO THE FIRESTORE
      await labelsCollection.doc(this.labelID).update(label);

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

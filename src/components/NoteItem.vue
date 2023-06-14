<template>
  <li
    class="noteList__wrapper"
    v-for="note in notes"
    :key="note.docID"
    @click.prevent="
      showUpdateNoteModal(note.docID, note.color, note.noteTitle, note.date, note.content)
    "
  >
    <div class="top-color" :class="note.color"></div>

    <div class="noteList-header__wrapper">
      <p class="notelist-title">{{ note.noteTitle }}</p>
      <p class="notelist-date">{{ note.date }}</p>
    </div>

    <div class="noteList-content__wrapper">
      <div v-html="note.content"></div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "pinia";
import useModalStore from "../stores/modal";

export default {
  props: ["notes"],
  name: "NoteItem",
  methods: {
    ...mapActions(useModalStore, ["showUpdateNoteModal"]),
  },
};
</script>

<style lang="postcss" scoped>
.noteList__wrapper {
  @apply bg-shades-white drop-shadow-lg w-full max-w-[18rem] pt-[2.5rem] px-[.938rem] pb-[2rem] rounded-lg overflow-hidden cursor-pointer h-[10rem];
}

.top-color {
  @apply absolute top-0 left-0 w-full h-[1.5rem];
}

.top-color.yellow {
  @apply bg-primary-500;
}

.top-color.green {
  @apply bg-green-500;
}

.top-color.red {
  @apply bg-red-500;
}

.top-color.blue {
  @apply bg-blue-500;
}

.top-color.purple {
  @apply bg-purple-500;
}

.top-color.gray {
  @apply bg-gray-500;
}

.noteList-header__wrapper {
  @apply mb-[1.5rem];
}

.notelist-title {
  @apply text-xl text-neutral-700 font-semibold;
}

.notelist-date {
  @apply text-[.6rem] text-neutral-500;
}

.noteList-content__wrapper {
  @apply text-sm text-neutral-600 h-[50%] max-h-[4rem] overflow-y-hidden;
}
</style>

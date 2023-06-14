<template>
  <modal-wrapper>
    <vee-form class="noteList__wrapper" @submit="update">
      <div class="top-color" :class="colorActive">
        <span class="material-symbols-outlined" @click.prevent="toggleNoteOptions">
          more_horiz
        </span>
        <span class="material-symbols-outlined" @click.prevent="update"> close </span>
      </div>

      <div class="noteOption__wrapper" v-if="noteOption">
        <div class="color__wrapper">
          <div class="yellow" @click.prevent="pickColor('yellow')"></div>
          <div class="green" @click.prevent="pickColor('green')"></div>
          <div class="red" @click.prevent="pickColor('red')"></div>
          <div class="blue" @click.prevent="pickColor('blue')"></div>
          <div class="purple" @click.prevent="pickColor('purple')"></div>
          <div class="gray" @click.prevent="pickColor('gray')"></div>
        </div>
        <div class="deleteNote__wrapper" @click.prevent="deleteNote">
          <span class="material-symbols-outlined"> delete </span>
          <p>Delete Note</p>
        </div>
      </div>

      <div class="noteList-header__wrapper">
        <textarea
          ref="myTextarea"
          v-model="titleContent"
          class="title-textarea"
          @input="autoResize"
          @keydown="autoResize"
          placeholder="Input Title"
        ></textarea>
        <!-- <p class="notelist-date">February 1, 2023 4:00 PM Wed</p> -->
      </div>

      <div
        ref="editableText"
        class="noteList-content__wrapper"
        contenteditable
        id="editable-text"
        v-html="noteContent"
      ></div>

      <div class="btnStyling__wrapper">
        <button @click.prevent="applyEdit('bold')">
          <span class="material-symbols-outlined"> format_bold </span>
        </button>
        <button @click.prevent="applyEdit('italic')">
          <span class="material-symbols-outlined"> format_italic </span>
        </button>
        <button @click.prevent="applyEdit('underline')">
          <span class="material-symbols-outlined"> format_underlined </span>
        </button>
        <button @click.prevent="applyEdit('strikethrough')">
          <span class="material-symbols-outlined"> strikethrough_s </span>
        </button>
      </div>
    </vee-form>
  </modal-wrapper>
</template>

<script>
import { mapActions } from "pinia";
import useModalStore from "../../stores/modal";

import { notesCollection } from "../../includes/firebase";

import ModalWrapper from "../modals/ModalWrapper.vue";

export default {
  props: ["noteID", "color", "title", "date", "noteContent"],
  components: { ModalWrapper },
  name: "UpdateNote",
  data() {
    return {
      noteOption: false,
      colorActive: this.color,
      titleContent: this.title,
      previousTitle: this.title,
      content: this.noteContent,
      labelId: this.noteID,
    };
  },
  created() {
    console.log(this.content);
  },
  computed: {},
  methods: {
    ...mapActions(useModalStore, ["closeAll"]),
    toggleNoteOptions() {
      this.noteOption = !this.noteOption;
    },
    pickColor(color) {
      this.colorActive = color;
      this.noteOption = false;
    },
    // auto height resize the Title Textarea
    autoResize() {
      const textarea = this.$refs.myTextarea;

      textarea.style.height = "1.5rem";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    // fot the content of the note
    editText(type) {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      const editableText = this.$refs.editableText;

      if (!editableText.contains(selection.anchorNode)) {
        return;
      }

      if (selectedText.length > 0) {
        document.execCommand(type, false, null);
      } else {
        const range = selection.getRangeAt(0);
        const newElement = document.createElement("span");
        newElement.classList.add(type);
        newElement.appendChild(range.extractContents());
        range.insertNode(newElement);
      }
    },
    // To Apply Styling to a specific text
    applyEdit(type) {
      this.editText(type);
    },
    async update() {
      // For the inputted content
      const editableText = this.$refs.editableText;

      // Check if the value is the same as previous data
      if (
        this.previousTitle === this.titleContent &&
        this.content === editableText.innerHTML
      ) {
        this.closeAll();
        return;
      } else {
        // For the inputted content
        const editableText = this.$refs.editableText;
        this.content = editableText.innerHTML;

        // Check if content is Empty
        this.content === ""
          ? (this.content = " ")
          : (this.content = editableText.innerHTML);

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

        // Notes Content Object
        const notesContent = {
          noteTitle: this.titleContent,
          date: formattedDate,
          color: this.colorActive,
          content: this.content,
        };

        const docID = this.noteID;

        // UPDATE DATA TO THE FIRESTORE
        await notesCollection.doc(docID).update(notesContent);

        this.$emit("child");

        this.closeAll();
      }
    },
    async deleteNote() {
      const docID = this.noteID;
      await notesCollection.doc(docID).delete();
      this.$emit("child");
      this.closeAll();
    },
  },
  mounted() {
    // auto focus to the Title Textarea
    this.$refs.myTextarea.focus();

    // this.previousTitle = 'title'

    // Adjust height on mount
    this.autoResize();

    // Check if the editable text is empty and show the placeholder
    const editableText = this.$refs.editableText;
    if (editableText.innerHTML === "") {
      editableText.innerHTML = this.placeholder;
    }
  },
};
</script>

<style lang="postcss" scoped>
:deep(.modal-container) {
  @apply flex justify-center;
}

.noteList__wrapper {
  @apply relative bg-shades-white drop-shadow-lg w-full max-w-[18rem] pt-[2.5rem] px-[.938rem] rounded-lg overflow-hidden;
}

/**********************************************
****
**********************************************/

.top-color {
  @apply absolute top-0 left-0 flex items-center justify-between px-[.938rem] w-full h-[2.5rem];
}

.top-color > span {
  @apply text-2xl font-semibold cursor-pointer;
}

.noteOption__wrapper {
  @apply absolute top-0 left-0 z-40 w-full;
}

.color__wrapper {
  @apply flex justify-stretch h-[3rem];
}

.color__wrapper > div {
  @apply w-full h-full cursor-pointer;
}

/**********************************************
**********************************************/
.top-color.yellow {
  @apply text-primary-700;
}

.top-color.green {
  @apply text-green-700;
}

.top-color.red {
  @apply text-red-800;
}

.top-color.blue {
  @apply text-blue-800;
}

.top-color.purple {
  @apply text-purple-800;
}

.top-color.gray {
  @apply text-gray-700;
}

/**********************************************
**********************************************/

.top-color.yellow,
.color__wrapper > .yellow {
  @apply bg-primary-500;
}

.top-color.green,
.color__wrapper > .green {
  @apply bg-green-500;
}

.top-color.red,
.color__wrapper > .red {
  @apply bg-red-500;
}

.top-color.blue,
.color__wrapper > .blue {
  @apply bg-blue-500;
}

.top-color.purple,
.color__wrapper > .purple {
  @apply bg-purple-500;
}

.top-color.gray,
.color__wrapper > .gray {
  @apply bg-gray-500;
}

.deleteNote__wrapper {
  @apply flex items-center bg-neutral-600 h-[3rem] cursor-pointer;
}

.deleteNote__wrapper > span,
.deleteNote__wrapper > p {
  @apply text-shades-white ml-[1rem];
}

/**********************************************
**********************************************/

.noteList-header__wrapper {
  @apply mt-[.8rem] mb-[1rem];
}

/**********************************************
**********************************************/
textarea {
  resize: none;
  overflow: hidden;
  box-sizing: border-box; /* Ensure padding and border are included in height calculation */
  height: 100%; /* Use full height of parent container */
}

.title-textarea {
  @apply text-neutral-600 text-2xl font-medium w-full  outline-0;
}

.title-textarea::placeholder {
  @apply text-neutral-400 opacity-[75%];
}

/**********************************************
**********************************************/

.noteList-content__wrapper {
  @apply text-sm text-neutral-600 outline-0 mb-[4rem];
}

.btnStyling__wrapper {
  @apply absolute bottom-0 w-full left-0 py-[.4rem] border-t-[.5px] border-neutral-300;
}

.btnStyling__wrapper > button {
  @apply ml-[1rem] cursor-pointer;
}

.btnStyling__wrapper > button > span {
  @apply text-2xl text-neutral-400 font-medium;
}
</style>

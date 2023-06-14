<template>
  <div class="mainApp__container">
    <div class="side__container">
      <header class="header__container mobile-margin">
        <div class="logo__wrapper">
          <img src="../assets/logo.png" alt="" />
        </div>

        <!-- CTA -->
        <div class="cta__wrapper">
          <base-button class="purple" @click.prevent="showInputLabelModal"
            >New Note</base-button
          >
          <p>Total Notes: {{ labels.length }}</p>
        </div>
      </header>

      <!-- Label Notes -->
      <nav class="labels__container">
        <div class="labels__wrapper">
          <div class="label-text__wrapper mobile-margin" @click.prevent="toggleLabelList">
            <p>LABELS</p>
            <span
              class="material-symbols-outlined"
              :class="labelList ? 'active' : ''"
              v-if="mobile"
            >
              expand_more
            </span>
          </div>
        </div>
        <ul class="label-lists__wrapper" v-if="labelList">
          <li
            class="label-list"
            v-for="label in labels"
            :key="label.docID"
            @click.prevent="displayNote(label.docID, label.labelTitle)"
          >
            <div class="mobile-margin">{{ label.labelTitle }}</div>
          </li>
        </ul>
      </nav>

      <!-- Footer for medium/large screen size -->
      <footer class="footer__wrapper" v-if="!mobile">
        <p>Copyright: © {{ getCurrentYear }}</p>
        <p>Design & Built by Mark Ian Reyes</p>
      </footer>
    </div>

    <main class="main__container">
      <div class="main-header__container">
        <div class="main-header__wrapper mobile-margin">
          <!-- Note Title -->
          <div class="title-note__wrapper">
            <h2>{{ labelTitle }}</h2>
            <div class="cta-icon__wrapper">
              <span
                class="material-symbols-outlined"
                @click.prevent="showUpdateLabelModal()"
              >
                edit
              </span>
              <span class="material-symbols-outlined" @click.prevent="deleteLabel">
                delete
              </span>
            </div>
          </div>

          <!-- Search & Buttons -->
          <div class="action-note__wrapper">
            <!-- Search Box -->
            <div class="search-input__wrapper">
              <span class="material-symbols-outlined"> search </span>
              <input type="text" placeholder="Search" />
            </div>

            <!-- Buttons -->
            <div class="btn__wrapper">
              <base-button class="yellow" @click.prevent="showInputNoteModal"
                >Create Note</base-button
              >
              <base-button class="blue">Create List</base-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Note Lists -->
      <div class="main-noteList__container mobile-margin">
        <!-- Note List -->
        <ul>
          <NoteItem :notes="notes" />
        </ul>
      </div>
    </main>

    <!-- Footer for mobile size -->
    <footer class="footer__wrapper" v-if="mobile">
      <p>Copyright: © {{ getCurrentYear }}</p>
      <p>Design & Built by Mark Ian Reyes</p>
    </footer>
  </div>

  <teleport to="body">
    <InputLabelModal v-if="inputLabelModal" @display-label="fetchLabel" />
    <UpdateLabelModal
      v-if="updateLabelModal"
      :labelID="labelID"
      :updateTitle="labelTitle"
      @display-label="fetchLabel"
    />
    <InputNoteModal v-if="inputNoteModal" :noteLabelID="labelID" @child="fetchNotes" />
    <UpdateNoteModal
      v-if="updateNoteModal"
      :noteID="updateID"
      :color="updateColor"
      :title="updateNoteTitle"
      :date="updateDate"
      :noteContent="updateContent"
      @child="fetchNotes"
    />
  </teleport>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useModalStore from "../stores/modal";

import { labelsCollection, notesCollection, auth } from "../includes/firebase";

import InputLabelModal from "../components/modals/InputLabel.vue";
import UpdateLabelModal from "../components/modals/UpdateLabel.vue";
import InputNoteModal from "../components/modals/InputNote.vue";
import UpdateNoteModal from "../components/modals/UpdateNote.vue";
import NoteItem from "../components/NoteItem.vue";

export default {
  name: "MainApp",
  components: {
    InputLabelModal,
    UpdateLabelModal,
    InputNoteModal,
    UpdateNoteModal,
    NoteItem,
  },
  data() {
    return {
      isToggleClickable: false,
      year: "",
      mobile: true,
      labelList: false,
      labels: [],
      notes: [],
      labelTitle: "",
      labelID: null,
    };
  },
  computed: {
    ...mapState(useModalStore, [
      "inputLabelModal",
      "updateLabelModal",
      "updateLabelText",
      "inputNoteModal",
      "updateNoteModal",
      "updateID",
      "updateColor",
      "updateNoteTitle",
      "updateDate",
      "updateContent",
    ]),
    getCurrentYear() {
      return (this.year = new Date().getFullYear());
    },
  },
  mounted() {
    this.updateScreenSize(); // Call the method initially to set the initial screen size

    this.fetchNotes();

    window.addEventListener("resize", this.updateScreenSize); // Listen for window resize events
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize); // Remove the resize event listener before component is unmounted
  },
  async created() {
    // Retreive Label title from firestore base on UID
    const snapshot = await labelsCollection
      .where("uid", "==", auth.currentUser.uid)
      .orderBy("date", "desc")
      .get();
    snapshot.forEach(this.addLabel);

    this.fetchNotes();
  },
  methods: {
    ...mapActions(useModalStore, [
      "showInputLabelModal",
      "showUpdateLabelModal",
      "showInputNoteModal",
      "showUpdateNoteModal",
    ]),
    addLabel(document) {
      const label = {
        ...document.data(),
        docID: document.id,
      };
      this.labels.push(label);

      // Retrieve the latest/first element in the array
      const firstLabel = this.labels[0];

      this.labelTitle = firstLabel.labelTitle;
      this.labelID = firstLabel.docID;
    },
    async deleteLabel() {
      // Retrieve all notes with the specified labelID
      const notesQuerySnapshot = await notesCollection
        .where("lid", "==", this.labelID)
        .get();

      await labelsCollection.doc(this.labelID).delete();

      // Delete each note document
      notesQuerySnapshot.forEach((noteDoc) => {
        notesCollection.doc(noteDoc.id).delete();
      });

      this.labelTitle = "";

      this.fetchLabel();
      this.fetchNotes();
    },
    async fetchLabel() {
      this.labels = []; //clear the existing labels array
      // Retreive Label title from firestore base on UID
      const snapshot = await labelsCollection
        .where("uid", "==", auth.currentUser.uid)
        .orderBy("date", "desc")
        .get();
      snapshot.forEach(this.addLabel);
    },
    async fetchNotes() {
      try {
        const notesSnapshot = await notesCollection
          .where("lid", "==", this.labelID)
          .orderBy("date", "desc")
          .get();

        this.notes = []; //clear the existing notes array

        notesSnapshot.forEach((doc) => {
          const noteData = doc.data();
          const note = {
            ...noteData,
            docID: doc.id,
          };
          this.notes.push(note);
        });

        console.log(this.notes);
      } catch (error) {
        console.error(error);
      }
    },
    displayNote(docId, title) {
      this.labelTitle = title;
      this.labelID = docId;
      this.fetchNotes();

      if (this.mobile) {
        this.labelList = false;
      }
      console.log(this.notes);
    },
    toggleLabelList() {
      if (this.mobile) {
        this.labelList = !this.labelList;
      }
    },
    updateScreenSize() {
      // Update the screenSize data property based on the current window inner width
      this.mobile = window.innerWidth > 600 ? false : true;
      this.labelList = window.innerWidth > 600 ? true : false;
    },
  },
};
</script>

<style lang="postcss" scoped>
/* .mainApp__container {

} */

.mobile-margin {
  @apply w-[85%] mx-auto;
}

/**********************************************
**** Header Properties
**********************************************/

.logo__wrapper {
  @apply w-full max-w-[11.5rem] mx-auto;
}

.header__container {
  @apply my-[1.5rem];
}

.cta__wrapper {
  @apply mt-[1.625rem];
}

.cta__wrapper p {
  @apply text-sm text-neutral-400 mt-[1.2rem];
}

/**********************************************
**** Nav Properties
**********************************************/

.labels__container {
  /* @apply ; */
}

.labels__wrapper {
  @apply border-y-[.5px] border-neutral-300;
}

.label-text__wrapper {
  @apply flex justify-between items-center text-neutral-600 text-sm font-medium py-[.938rem];
}

.label-text__wrapper span {
  transition: all 0.3s ease-in-out;
}

.label-text__wrapper span.active {
  rotate: 180deg;
}

.label-list {
  @apply text-base text-neutral-600 font-semibold py-[.938rem] border-b-[.5px] border-neutral-300 cursor-pointer;
}

/**********************************************
**** Main Header Properties
**********************************************/

.main-header__container {
  @apply py-[2rem] border-b-[.5px] border-neutral-300;
}

.title-note__wrapper {
  @apply flex justify-between items-center;
}

.title-note__wrapper h2 {
  @apply text-2xl text-neutral-600 font-medium;
}

.title-note__wrapper .cta-icon__wrapper span {
  @apply text-neutral-400 font-medium ml-[.7rem];
}

.action-note__wrapper {
  @apply flex flex-col gap-6 mt-[1rem];
}

.search-input__wrapper {
  @apply flex items-center bg-neutral-100 p-[.625rem] rounded;
}

.search-input__wrapper input {
  @apply ml-[1rem] bg-transparent border-none outline-none;
}

.btn__wrapper {
  @apply flex flex-col gap-2;
}

/**********************************************
**** Note Per List Properties
**********************************************/

.main-noteList__container {
  @apply flex flex-col items-center mt-[2.375rem] h-auto;
}

.main-noteList__container > ul {
  @apply flex flex-col gap-6 items-center w-full;
}

/**********************************************
**** Footer Properties
**********************************************/

.footer__wrapper {
  @apply text-center text-xs text-neutral-500 py-[1rem] w-full mt-auto;
}

/***********************************************************
***********************************************************/

/**********************************************
**** Media Queries Properties
**********************************************/

@media (min-width: 600px) {
  .mainApp__container {
    /* display: grid;
    grid-template-columns: 1fr 1.5fr; */
    display: flex;
    height: 100vh;
    /* @apply justify-items-stretch; */
  }

  /**********************************************
**** Main Header Properties
**********************************************/

  .main__container {
    @apply w-full;
  }

  .main-header__wrapper {
    @apply max-w-[62.5rem] ml-[2rem];
  }

  /**********************************************
**** Note Per List Properties
**********************************************/
  .main-noteList__container {
    @apply items-start max-w-[62.5rem] ml-[2rem] h-fit;
  }

  .main-noteList__container > ul {
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18.5rem, 1fr));
    justify-content: flex-start; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  }

  /**********************************************
**** SideBar Properties
**********************************************/

  .side__container {
    @apply relative border-r-[.5px] border-neutral-300 w-full max-w-[23rem];
  }

  .footer__wrapper {
    @apply absolute left-0 bottom-0;
  }
}

@media (min-width: 1100px) {
  /**********************************************
**** SideBar Properties
**********************************************/

  .cta__wrapper {
    @apply flex justify-between items-center;
  }

  .cta__wrapper > button {
    @apply w-fit;
  }

  .cta__wrapper > p {
    @apply m-0;
  }

  /**********************************************
**** Main Header Properties
**********************************************/
  .action-note__wrapper {
    @apply flex-row justify-stretch;
  }

  .search-input__wrapper {
    @apply w-full max-w-[32rem];
  }

  .btn__wrapper {
    @apply flex-row w-full;
  }

  .btn__wrapper > button {
    @apply w-full;
  }
}
</style>

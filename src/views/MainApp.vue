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

        <!-- ====================================================== -->
        <!-- Loading -->
        <LabelLoading v-if="label_show_loading" class="labelLoading" />
        <!-- ====================================================== -->

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
        <div class="logout__wrapper">
          <span class="material-symbols-outlined"> logout </span>
          <button @click.prevent="logout" class="logoutBtn">Logout</button>
        </div>
        <p>Copyright: © {{ getCurrentYear }}</p>
        <p>Design & Built by Mark Ian Reyes</p>
      </footer>
    </div>

    <main class="main__container" v-if="labels.length !== 0">
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
              <input type="text" placeholder="Search" v-model="searchQuery" />
            </div>

            <!-- Buttons -->
            <div class="btn__wrapper">
              <base-button class="yellow" @click.prevent="showInputNoteModal"
                >Create Note</base-button
              >
              <!-- <base-button class="blue">Create List</base-button> -->
            </div>
          </div>
        </div>
      </div>

      <EmptyNoteUI class="emptyNote" v-if="emptyNotes" />

      <!-- Note Lists -->
      <div class="main-noteList__container mobile-margin">
        <!-- Note List -->
        <ul>
          <NoteItem :notes="filteredNotes" />
        </ul>

        <NotesLoading class="notesLoader" v-if="notes_show_loading" />
      </div>
    </main>

    <main class="emptyLabel__container" v-else>
      <div>
        <EmptyLabel class="emptyLabel" @add-label="showInputLabelModal" />
      </div>
    </main>

    <!-- Footer for mobile size -->
    <footer class="footer__wrapper" v-if="mobile">
      <div class="logout__wrapper">
        <span class="material-symbols-outlined"> logout </span>
        <button @click.prevent="logout" class="logoutBtn">Logout</button>
      </div>
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
    <InputNoteModal
      v-if="inputNoteModal"
      :noteLabelID="labelID"
      @display-note="fetchNotes"
    />
    <UpdateNoteModal
      v-if="updateNoteModal"
      :noteID="updateID"
      :color="updateColor"
      :title="updateNoteTitle"
      :date="updateDate"
      :noteContent="updateContent"
      @display-note="fetchNotes"
    />
  </teleport>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useModalStore from "../stores/modal";
import router from "../router/index";

import { labelsCollection, notesCollection, auth } from "../includes/firebase";

import InputLabelModal from "../components/modals/InputLabel.vue";
import UpdateLabelModal from "../components/modals/UpdateLabel.vue";
import InputNoteModal from "../components/modals/InputNote.vue";
import UpdateNoteModal from "../components/modals/UpdateNote.vue";
import NoteItem from "../components/NoteItem.vue";

import EmptyNoteUI from "../components/emptyNotesUI.vue";
import EmptyLabel from "../components/emptyLabel.vue";

import LabelLoading from "../components/loader/LabelLoading.vue";
import NotesLoading from "../components/loader/NotesLoading.vue";

export default {
  name: "MainApp",
  components: {
    InputLabelModal,
    UpdateLabelModal,
    InputNoteModal,
    UpdateNoteModal,
    NoteItem,
    EmptyNoteUI,
    EmptyLabel,
    LabelLoading,
    NotesLoading,
  },
  data() {
    return {
      isToggleClickable: false,
      year: "",
      mobile: true,
      labelList: false,
      labels: [],
      notes: [],
      emptyNotes: false,
      labelTitle: "",
      labelID: null,
      searchQuery: "",
      searchResults: [], // Array to store the search results

      label_show_loading: false,
      notes_show_loading: false,
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
    // When searching
    filteredNotes() {
      if (this.searchQuery) {
        const lowercaseQuery = this.searchQuery.toLowerCase();

        return this.notes.filter((note) => {
          const lowercaseTitle = note.noteTitle ? note.noteTitle.toLowerCase() : "";
          const lowercaseContent = note.content ? note.content.toLowerCase() : "";

          return (
            lowercaseTitle.includes(lowercaseQuery) ||
            lowercaseContent.includes(lowercaseQuery)
          );
        });
      } else {
        return this.notes;
      }
    },
  },
  mounted() {
    this.updateScreenSize(); // Call the method initially to set the initial screen size

    this.fetchNotes();

    window.addEventListener("resize", this.updateScreenSize); // Listen for window resize events

    try {
      if (auth.currentUser.uid) {
        console.log("logged user");
      } else {
        console.log("not log");
      }
    } catch (error) {
      router.push("/");
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize); // Remove the resize event listener before component is unmounted
  },
  async created() {
    this.label_show_loading = true;

    try {
      // Retreive Label title from firestore base on UID
      const snapshot = await labelsCollection
        .where("uid", "==", auth.currentUser.uid)
        .orderBy("date", "desc")
        .get();
      snapshot.forEach(this.addLabel);

      this.label_show_loading = false;

      this.fetchNotes();
    } catch (error) {
      console.log(error);
    }
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
    },
    async fetchLabel() {
      this.label_show_loading = true;
      this.labels = []; //clear the existing labels array
      // Retreive Label title from firestore base on UID
      const snapshot = await labelsCollection
        .where("uid", "==", auth.currentUser.uid)
        .orderBy("date", "desc")
        .get();
      snapshot.forEach(this.addLabel);
      this.label_show_loading = false;

      this.fetchNotes();
    },
    async fetchNotes() {
      this.notes_show_loading = true;
      this.emptyNotes = false;

      try {
        this.notes = []; //clear the existing notes array

        const notesSnapshot = await notesCollection
          .where("lid", "==", this.labelID)
          .orderBy("date", "desc")
          .get();

        notesSnapshot.forEach((doc) => {
          const noteData = doc.data();
          const note = {
            ...noteData,
            docID: doc.id,
          };
          this.notes.push(note);
          this.notes_show_loading = false;
        });

        // Perform dynamic search
        this.notes_show_loading = false;
        // this.performSearch();
      } catch (error) {
        console.error(error);
      }
      this.notesAvailability();
    },
    displayNote(docId, title) {
      this.notes = []; //clear the existing notes array
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
    notesAvailability() {
      if (this.notes.length === 0) {
        this.emptyNotes = true;
      } else {
        this.emptyNotes = false;
      }
      this.notes_show_loading = false;
    },
    async logout() {
      try {
        // Add the code to sign out the user from the authentication provider
        await auth.signOut();

        // Perform any additional cleanup or actions required after logout

        // Redirect the user to the login page or any other desired page
        router.push("/");

        console.log("logout");
      } catch (error) {
        console.error(error);
        // Handle any error that occurs during logout
      }
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

.side__container {
  @apply bg-shades-white !important;
}

/**********************************************
**** Header Properties
**********************************************/

.logo__wrapper {
  @apply w-full max-w-[11.5rem] mx-auto;
}

.header__container {
  @apply my-[1.5rem] bg-shades-white;
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
  @apply sticky top-0;
}

.labelLoading {
  @apply mt-[5rem];
}

.labels__wrapper {
  @apply bg-neutral-100 border-y-[.5px] border-neutral-300;
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

.label-lists__wrapper {
  /* @apply bg-neutral-100; */
}

.label-list {
  @apply text-base text-neutral-600 font-semibold py-[.938rem] border-b-[.5px] border-neutral-300 cursor-pointer;
}

/**********************************************
**** Main Header Properties
**********************************************/
.main__container {
  @apply pb-[5rem];
}

.main-header__container {
  @apply py-[2rem] bg-shades-white border-b-[.5px] border-neutral-300 sticky top-0 z-30;
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
  @apply flex items-center w-full bg-neutral-100 p-[.625rem] rounded;
}

.search-input__wrapper input {
  @apply ml-[1rem] bg-transparent border-none outline-none;
}

.btn__wrapper {
  @apply flex flex-col gap-2 w-full;
}

.cta-icon__wrapper > span {
  @apply cursor-pointer;
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

.emptyNote {
  @apply max-w-[62.5rem] ml-[2rem] h-fit;
}

.emptyLabel__container {
  @apply w-[90%] h-screen mx-auto;
}

.emptyLabel {
  @apply w-full mx-auto;
}

.notesLoader {
  @apply mt-[4rem];
}

/**********************************************
**** Footer Properties
**********************************************/

.footer__wrapper {
  @apply text-center bg-shades-white text-xs text-neutral-500 py-[1rem] w-full mt-auto;
}

.logout__wrapper {
  @apply flex items-center justify-center gap-2 mb-[.5rem];
}

.logout__wrapper > span {
  @apply text-neutral-600;
}

.logoutBtn {
  @apply text-[.8rem] text-neutral-600 font-medium;
}

/***********************************************************
***********************************************************/

/**********************************************
**** Media Queries Properties
**********************************************/

@media (min-width: 600px) {
  .mainApp__container {
    @apply relative;
    display: flex;
    min-height: 100vh;
    max-height: fit-content;
  }

  /**********************************************
**** Main Header Properties
**********************************************/

  .main__container {
    @apply flex flex-col w-full overflow-y-auto;
    height: fit-content;
    max-height: 100vh;
  }

  .emptyLabel__container {
    @apply max-w-[62.5rem];
  }

  .main-header__wrapper {
    @apply max-w-[62.5rem] ml-[2rem];
  }

  /**********************************************
**** Note Per List Properties
**********************************************/
  .main-noteList__container {
    @apply items-start max-w-[62.5rem] ml-[2rem];
  }

  .main-noteList__container > ul {
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
    @apply relative border-r-[.5px] border-neutral-300 w-full min-h-screen max-h-fit max-w-[23rem] bg-gray-100;
    /* display: grid; */
    /* grid-template-rows: minmax(auto, 16rem) minmax(auto, 0.8fr); */
    /* grid-template-rows: minmax(10rem, 15rem) minmax(0.8fr, 69vh); */
    /* grid-template-rows: minmax(auto, 16rem) minmax(auto, 4fr) minmax(0.1fr); */
  }

  .header__container {
    @apply h-full max-h-[11rem];
  }

  .labels__container {
    @apply overflow-y-auto;
    height: 55vh;
  }

  .label-lists__wrapper {
    max-height: 100%;
  }

  .footer__wrapper {
    @apply absolute left-0 bottom-0;
  }
}

@media (min-width: 840px) {
  .btn__wrapper {
    @apply max-w-[12rem] self-end;
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

  .btn__wrapper {
    @apply flex-row w-full;
  }

  .btn__wrapper > button {
    @apply w-full;
  }
}
</style>

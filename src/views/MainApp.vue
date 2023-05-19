<template>
  <div class="mainApp__container">
    <header class="header__container mobile-margin">
      <div class="logo__wrapper">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- CTA -->
      <div class="cta__wrapper">
        <base-button class="purple">New Note</base-button>
        <p>4 notes</p>
      </div>
    </header>

    <!-- Label Notes -->
    <nav class="labels__container">
      <div class="labels__wrapper">
        <div class="label-text__wrapper mobile-margin" @click.prevent="toggleLabelList">
          <p>LABELS</p>
          <span class="material-symbols-outlined" :class="labelList ? 'active' : ''">
            expand_more
          </span>
          <!-- {{ labelIcon }} -->
        </div>
      </div>
      <ul class="label-lists__wrapper" v-if="labelList">
        <li class="label-list">
          <div class="mobile-margin">Dessert Ideas</div>
        </li>
        <li class="label-list">
          <div class="mobile-margin">Grocery</div>
        </li>
        <li class="label-list">
          <div class="mobile-margin">Meeting Notes</div>
        </li>
        <li class="label-list">
          <div class="mobile-margin">My Ideas</div>
        </li>
      </ul>
    </nav>

    <!-- Footer for medium/large screen size -->
    <footer class="footer__wrapper" v-if="!mobile">
      <p>Copyright: © {{ getCurrentYear }}</p>
      <p>Design & Built by Mark Ian Reyes</p>
    </footer>

    <main class="main__container">
      <div class="main-header__container">
        <div class="main-header__wrapper mobile-margin">
          <!-- Note Title -->
          <div class="title-note__wrapper">
            <h2>Dessert Ideas</h2>
            <div class="cta-icon__wrapper">
              <span class="material-symbols-outlined"> edit </span>
              <span class="material-symbols-outlined"> delete </span>
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
              <base-button class="yellow">Create Note</base-button>
              <base-button class="blue">Create List</base-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Note Lists -->
      <div class="main-noteList__container mobile-margin">
        <!-- Note List -->
        <ul>
          <li class="noteList__wrapper">
            <div class="top-color"></div>

            <div class="noteList-header__wrapper">
              <p class="notelist-title">Cake Recipe</p>
              <p class="notelist-date">February 1, 2023 4:00 PM Wed</p>
            </div>

            <div class="noteList-content__wrapper">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ad
                repellat debitis nisi iusto ipsum explicabo sint repellendus modi ipsa
                consectetur hic provident, odio impedit odit similique. Sequi, dicta
                similique.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <!-- Footer for mobile size -->
    <footer class="footer__wrapper">
      <p>Copyright: © {{ getCurrentYear }}</p>
      <p>Design & Built by Mark Ian Reyes</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainApp",
  data() {
    return {
      year: "",
      mobile: true,
      labelList: false,
    };
  },
  computed: {
    getCurrentYear() {
      return (this.year = new Date().getFullYear());
    },
    labelIcon() {
      return !this.labelList ? "expand_more" : "expand_less";
    },
  },
  methods: {
    toggleLabelList() {
      this.labelList = !this.labelList;
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
  @apply text-base text-neutral-600 font-semibold py-[.938rem] border-b-[.5px] border-neutral-300;
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
  @apply flex flex-col items-center mt-[2.375rem] h-screen;
}

.noteList__wrapper {
  @apply bg-shades-white drop-shadow-lg w-full max-w-[18rem] pt-[2.5rem] px-[.938rem] pb-[2rem] rounded-lg overflow-hidden;
}

.top-color {
  @apply absolute top-0 left-0 bg-yellow-500 w-full h-[1.5rem];
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
  @apply text-sm text-neutral-600;
}

/**********************************************
**** Footer Properties
**********************************************/

.footer__wrapper {
  @apply text-center text-xs text-neutral-500 py-[1rem] w-full mt-auto;
}
</style>

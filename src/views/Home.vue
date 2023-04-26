<template>
  <header class="header__container">
    <nav class="nav__container">
      <div>
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/logo.png" alt="Logo" class="header-img" />
        </router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link :to="{ name: 'Login' }" class="nav-link login">Log In</router-link>
          <router-link :to="{ name: 'Register' }" class="nav-link signup"
            >Sign Up</router-link
          >
        </ul>
      </div>
      <span
        class="material-symbols-outlined menu-icon"
        v-show="mobile"
        @click="toggleMobileNav"
      >
        menu
      </span>
      <div class="blanket" v-if="mobileNav"></div>
      <transition name="mobileNav">
        <div class="mobileNav" v-if="mobileNav">
          <span class="material-symbols-outlined close-icon" @click="toggleMobileNav">
            close
          </span>
          <ul>
            <router-link :to="{ name: 'Login' }">Log In</router-link>
            <router-link :to="{ name: 'Register' }">Sign Up</router-link>
          </ul>
        </div>
      </transition>
    </nav>
  </header>

  <main>
    <section class="hero-section__container">
      <div class="hero-sec__content-wrapper">
        <h2>Simplify Your Note-Taking</h2>
        <p>Stay Focused and Keep Your Thoughts in Order with TakeNote</p>
        <router-link :to="{ name: 'Register' }" class="cta hero-sec__cta"
          >Sign up now</router-link
        >
      </div>
      <div class="hero-sec__image-wrapper">
        <img src="../assets/images/Devices.webp" alt="Devices Photo" />
      </div>
    </section>

    <section class="contentA-section__container">
      <div class="contentA-sec__wrapper">
        <div class="contentA-sec__image-wrapper">
          <img src="../assets/images/NoteSample.webp" alt="Note Sample Photo" />
        </div>
        <div class="contentA-sec__text-wrapper">
          <p>
            TakeNote is the perfect tool for anyone looking to organize their thoughts,
            ideas, and to-do lists.
          </p>
          <p>
            Whether you're a student, professional, or just someone who wants to stay
            organized. TakeNote is designed to be easy to use, you'll be able to take
            notes anywhere, anytime, on any device.
          </p>
        </div>
      </div>
    </section>

    <section class="contentB-section__container">
      <div class="contentB-sec__wrapper">
        <div class="contentB-sec__image-wrapper">
          <img src="../assets/images/feather.webp" alt="Feather Photo" />
        </div>
        <div class="contentB-sec__text-wrapper">
          <h3>Notes, wherever you go.</h3>
          <p>
            Whether you're at work, school, or on the go, taking notes is an essential
            part of staying organized and productive. It's now easier than ever to access
            your notes from anywhere, at any time.
          </p>
        </div>
      </div>
    </section>

    <section class="cta-section__container">
      <div>
        <h3>Looking for a note-taking tool?</h3>
        <router-link :to="{ name: 'Register' }" class="cta"
          >Try it for yourself</router-link
        >
      </div>
    </section>
  </main>

  <footer class="footer__container">
    <p>Copyright: © {{ getCurrentYear }}</p>
    <p>Design & Built by Mark Ian Reyes</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: "",
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    // Check whenever the screen size changes
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  computed: {
    // For the footer
    getCurrentYear() {
      return (this.year = new Date().getFullYear());
    },
  },
  methods: {
    // Check the screen size of the app
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
      this.mobileNav = false;
      return;
    },

    // toggle to open/close the nav
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style lang="postcss" scoped>
.guide {
  @apply outline-1 outline-red-500 outline;
}

.nav__container,
.hero-sec__content-wrapper,
.contentA-sec__wrapper,
.contentB-sec__wrapper {
  @apply max-w-[68rem] m-auto;
}

.header__container {
  @apply w-[90%] m-auto mt-5;
}

.header-img {
  @apply w-full max-w-[6.75rem] md:max-w-[8.5rem];
}

.nav__container {
  @apply flex items-center justify-between;
}

.nav-links > ul {
  @apply flex gap-6;
}

.nav-link {
  @apply text-sm font-semibold text-neutral-600 px-5 py-3 rounded;
}

.signup {
  @apply border-[1px] border-neutral-600;
}

.cta {
  @apply flex justify-center text-shades-white text-sm font-medium py-3 px-5 rounded bg-primary-500;
}

/* =================================
         Mobile Properties 
================================= */
.menu-icon {
  @apply text-3xl text-neutral-700;
}

.mobileNav {
  @apply fixed top-0 right-0 bg-purple-500 w-4/5 h-full;
}

.blanket {
  @apply absolute top-0 left-0 bg-neutral-900 opacity-70 w-screen h-screen;
}

.mobileNav .close-icon {
  @apply absolute top-7 right-4 text-3xl text-shades-white;
}

.mobileNav ul {
  @apply flex flex-col w-full px-5 mt-24;
}

.mobileNav ul a {
  @apply p-5 text-shades-white border-purple-300 border-b-[1px] border-opacity-50;
}

.mobileNav-enter-active,
.mobileNav-leave-active {
  transition: all 500ms ease-in-out;
}

.mobileNav-enter {
  transform: translateX(250px);
}

.mobileNav-leave {
  transform: translateX(0);
}

.mobileNav-enter-to {
  transform: translateX(0);
}

.mobileNav-leave-to {
  transform: translateX(250px);
}

/* ============================================
============================================ */

.hero-section__container {
  @apply mt-[5.375rem];
}

.hero-section__container .hero-sec__content-wrapper {
  @apply flex flex-col items-center gap-3;
}

.hero-section__container div h2 {
  @apply text-neutral-700 text-4xl text-center font-semibold w-4/5 m-auto md:text-5xl;
}

.hero-section__container div p {
  @apply text-neutral-700 text-base text-center font-medium w-4/6 m-auto md:text-lg md:w-full;
}

.hero-section__container div a {
  @apply mt-4;
}

.hero-section__container .hero-sec__image-wrapper {
  @apply mt-10 mb-24 max-w-[68rem] m-auto;
}

/* .hero-sec__cta {
  @apply max-w-[130px];
} */

/* ============================================
============================================ */

.contentA-section__container {
  @apply bg-neutral-50 border-neutral-400 border-y-[1px] border-opacity-70 py-[10.688rem];
}

.contentA-sec__wrapper {
  @apply w-11/12 m-auto flex flex-col gap-14 md:gap-20 lg:flex-row;
}

.contentA-sec__image-wrapper {
  @apply max-w-[30rem] m-auto;
}

.contentA-sec__text-wrapper {
  @apply grid order-first gap-6 text-center text-base font-medium text-neutral-600 w-[90%] m-auto md:text-lg md:max-w-[28rem] lg:order-last lg:text-left;
}

/* ============================================
============================================ */

.contentB-section__container {
  @apply py-[10.688rem];
}

.contentB-section__container > div {
  @apply grid gap-8 w-11/12 m-auto md:gap-16;
}

.contentB-sec__image-wrapper {
  @apply w-1/2 m-auto max-w-[14rem];
}

.contentB-sec__text-wrapper {
  @apply grid gap-8 text-center w-[90%] m-auto max-w-[40rem];
}

.contentB-sec__text-wrapper > h3 {
  @apply text-3xl text-neutral-700 font-semibold md:text-[2.5rem];
}

.contentB-sec__text-wrapper > p {
  @apply text-base text-neutral-600 font-medium md:text-lg;
}

/* ============================================
============================================ */

.cta-section__container {
  @apply py-[5.5rem] bg-purple-500;
}

.cta-section__container > div {
  @apply grid gap-4 place-items-center;
}

.cta-section__container > div > h3 {
  @apply text-shades-white text-3xl text-center font-semibold w-[65%] md:text-[2.5rem] md:w-full;
}

/* ============================================
============================================ */

.footer__container {
  @apply grid gap-1 text-xs text-center text-neutral-500 font-medium mt-[5.5rem] mb-6 md:flex md:justify-center md:gap-6;
}
</style>

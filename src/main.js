import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validations';
import { auth } from './includes/firebase';

import './assets/css/base.css';

/*================================================
============== Generic Components ==============*/
import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';

/*=============================================*/

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);


    app.component('base-button', BaseButton);
    app.component('base-card', BaseCard);


    app.mount('#app');
  }
});


// Implementing the Tab Title on every page
router.beforeEach((to, from, next) => {
  document.title = `TakeNote | ${to.meta.title}`;

  // if (to.path === '/login' && auth.currentUser) {
  //   next('/');
  //   return;
  // }

  // if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
  //   next('/login');
  //   return;
  // }

  next();
});
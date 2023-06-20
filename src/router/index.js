import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

import MainApp from '../views/MainApp.vue';

import useUserStore from '../stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Create Account'
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Reset Password'
      }
    },
    {
      path: '/TakeNote',
      name: 'mainApp',
      component: MainApp,
      meta: {
        title: 'Main App',
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (!store.userLoggedIn && to.name !== "mainApp") {
    // If the user is not authenticated and tries to access a protected route,
    // redirect them to the main page or any other desired page
    next({ name: "mainApp" });

    // Manipulate the browser history to remove the previous route entry
    window.history.pushState(null, "", "/");
  } else {
    next();
  }
});

export default router;
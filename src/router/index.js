import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

import MainApp from '../views/MainApp.vue';

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

export default router;
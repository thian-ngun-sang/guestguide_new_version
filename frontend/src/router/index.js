import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ChangePassword from '@/views/ChangePassword.vue';

import ProfileView from '@/views/ProfileView.vue';
import EditProfile from '@/views/EditProfile.vue';

import HomeView from '@/views/HomeView.vue';

import CreateService from '@/views/CreateService.vue';
import EditView from '@/views/EditView.vue';
import SavedServices from '@/views/SavedServices.vue';

import TransportationView from '@/views/TransportationView.vue';
import EducationView from '@/views/EducationView.vue';
import AccomodationView from '@/views/AccomodationView.vue';
import Bookmarks from '@/views/Bookmarks.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      authRoute: true,
      unauthenticated: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      authRoute: true,
      unauthenticated: true
    }
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: ChangePassword,
    meta: {
	    authRoute: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: ProfileView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
    meta: {
      authRoute: true,
      loginRequired: true
    }
  },
  {
    path: '/transition',
    name: 'transition',
    component: TransportationView,
    meta: {
      loginRequired: true
    }
  },{
    path: '/courses',
    name: 'courses',
    component: EducationView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/housing',
    name: 'housing',
    component: AccomodationView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/create-service',
    name: 'create-service',
    component: CreateService,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/service/edit/:id',
    name: 'service/edit/:id',
    // component: () => import('../views/EditView.vue'),
    component: EditView,
    meta: {
      loginRequired: true
    }
  },
	{
    path: '/saved-services',
    name: 'saved-services',
    component: SavedServices,
    meta: {
      loginRequired: true
    }
  },
	{
    path: '/bookmarks',
    name: 'bookmarks',
    component: Bookmarks,
    meta: {
      loginRequired: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.loginRequired && !store.getters.isLoggedIn) {
    next('/login')
  } else if (store.getters.isLoggedIn && !store.state.user) {
    await store.dispatch('fetchUser')
    next()
  } else {
    next()
  }
})

export default router

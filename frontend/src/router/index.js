import { createRouter, createWebHistory } from 'vue-router'

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
    component: HomeView
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
    component: TransportationView
  },{
    path: '/courses',
    name: 'courses',
    component: EducationView
  },
  {
    path: '/housing',
    name: 'housing',
    component: AccomodationView
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");

  // some() method loop through an array
  if(to.matched.some(record => record.meta.loginRequired && token === null || token === "" || token === undefined)){
    console.log("You are not authorize for this page");
    next({name: 'login', query: {to: to.path}});
  }else{
    next();
  }
});

export default router

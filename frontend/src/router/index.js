import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HomeView from '../views/HomeView.vue';
import CreateService from '../views/CreateService.vue';

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
    component: () => import('../views/ChangePassword.vue'),
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
    component: () => import('../views/ProfileView.vue'),
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: () => import('../views/EditProfile.vue'),
    meta: {
      authRoute: true,
      loginRequired: true
    }
  },
  {
    path: '/home-page',
    name: 'homePage',
    component: HomeView,
    // beforeEnter: (to, from, next) => {
    //   if(localStorage.getItem('vueAuth') == 'true'){
    //     next();
    //   }else{
    //     next('/');
    //   }
    // }
  },
  {
    path: '/transition',
    name: 'transition',
    component: HomeView
  },{
    path: '/courses',
    name: 'courses',
    component: HomeView
  },
  {
    path: '/housing',
    name: 'housing',
    component: HomeView
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
    component: () => import('../views/EditView.vue'),
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

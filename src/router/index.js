import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import WelcomeAdmon from '@/components/WelcomeAdmon'
import Welcome from '@/components/Welcome'
import ListFleets from '@/components/Fleets/ListFleets'
import ListVehicles from '@/components/Vehicles/ListVehicles'
import EditProfile from '@/components/Profiles/EditProfile'
import EditFleet from '@/components/Fleets/EditFleet'
import EditVehicle from '@/components/Vehicles/EditVehicle'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/r',
      name: 'Register',
      component: Register,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/root',
      name: 'WelcomeAdmon',
      component: WelcomeAdmon,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/home',
      name: 'Welcome',
      component: Welcome,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/fleets',
      name: 'ListFleets',
      component: ListFleets,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/vehicles',
      name: 'ListVehicles',
      component: ListVehicles,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:Id/p-edit',
      name: 'EditProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:Id/f-edit',
      name: 'EditFleet',
      component: EditFleet,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:Id/v-edit',
      name: 'EditVehicle',
      component: EditVehicle,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

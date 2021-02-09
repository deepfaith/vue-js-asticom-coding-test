import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
  
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add.vue')
  },
   {
    path: '/upload',
    name: 'Upload',
    component: () => import('../components/FileUpload.vue')
  },   
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import IssueTable from "../views/IssueTable";
import IssuePost from "../views/IssuePost";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/issue_check'
  },
    {
      path: '/issue_check',
      name: 'issue_check',
      component: IssueTable
    },
    {
      path: '/issue_post',
      name: 'Issue_post',
      component: IssuePost
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

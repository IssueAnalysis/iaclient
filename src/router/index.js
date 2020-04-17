import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import MyIssues from "../views/MyIssues.vue";
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
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/my_issues',
    name: 'my_issues',
    component: MyIssues
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if (to.path === '/login'||to.path === '/signup') {
    next()
  }else if(sessionStorage.getItem('accessToken')){
    next()
  }else{
    next('/login')
  }
})

export default router

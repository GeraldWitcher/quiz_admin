import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/LoginPage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/DashboardPage.vue')
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: () => import('@/views/Subject/SubjectPage.vue')
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import('@/views/Question/QuestionPage.vue')
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/Student/StudentPage.vue')
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('@/views/Group/GroupPage.vue')
  },
  {
    path: '/exams',
    name: 'exams',
    component: () => import('@/views/Exam/ExamPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

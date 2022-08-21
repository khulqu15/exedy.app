import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import RobotTabs from '../layouts/LayoutRobotTab.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/robot/',
    component: RobotTabs,
    children: [
      {
        path: '',
        redirect: '/robot/:robot_id/status',
      },
      {
        path: ':robot_id/status',
        component: () => import('@/views/robot/RobotStatusPage.vue')
      },
      {
        path: ':robot_id/navigation',
        component: () => import('@/views/robot/RobotNavigationPage.vue')
      },
      {
        path: ':robot_id/routing',
        component: () => import('@/views/robot/RobotRoutingPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

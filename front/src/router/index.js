// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    // 首頁
    path: '/',
    // 預設的前端元件
    component: () => import('@/layouts/FrontLayout.vue'),
    // layout裡的所有頁面
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '發記冰品'
        }
      },
      {
        path: 'register',
        name: 'Home',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '發記冰品|註冊'
        }
      },
      {
        path: 'login',
        name: 'Home',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '發記冰品|登入'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 進到每個頁面前都會改變瀏覽器的標題
router.beforeEach((to, from) => {
  document.title = to.meta.title
})

export default router

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
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '發記冰品|註冊'
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '發記冰品|登入'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/front/AboutView.vue'),
        meta: {
          title: '發記冰品|關於我們'
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/front/NewsView.vue'),
        meta: {
          title: '發記冰品|最新消息'
        }
      },
      {
        path: 'introduce',
        name: 'Introduce',
        component: () => import('@/views/front/   IntroduceView.vue'),
        meta: {
          title: '發記冰品|冰品介紹'
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/front/   ProductView.vue'),
        meta: {
          title: '發記冰品|快速預訂'
        }
      },
      {
        path: 'content',
        name: 'Content',
        component: () => import('@/views/front/   ContentView.vue'),
        meta: {
          title: '發記冰品|關於我們'
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/CartView.vue'),
        meta: {
          title: '發記冰品|我的購物車'
        }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/front/   MemberView.vue'),
        meta: {
          title: '發記冰品|會員專區'
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/front/OrdersView.vue'),
        meta: {
          title: '發記冰品|訂單查詢'
        }
      },
      {
        path: 'modification',
        name: 'Modification',
        component: () => import('@/views/front/  ModificationView.vue'),
        meta: {
          title: '發記冰品|資料修改'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '發記冰品|後台管理'
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsView.vue'),
        meta: {
          title: '發記冰品|後台商品管理'
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: {
          title: '發記冰品|後台訂單管理'
        }
      },
      {
        path: 'members',
        name: 'AdminMembers',
        component: () => import('@/views/admin/MembersView.vue'),
        meta: {
          title: '發記冰品|後台會員管理'
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

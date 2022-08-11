import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "goods",
      children: [
        {
          path: "goods",
          name: "goods",
          meta: {
            isShow: true,
            title: "商品列表",
          },
          component: () => import("../views/GoodsView.vue"),
        },
        {
          path: "user",
          name: "user",
          meta: {
            isShow: true,
            title: "用户列表",
          },
          component: () => import("../views/UserView.vue"),
        },
        {
          path: "role/:id",
          name: "role",
          meta: {
            isShow: true,
            title: "角色列表",
          },
          component: () => import("../views/RoleView.vue"),
        },
        {
          path: "authority",
          name: "authority",
          meta: {
            isShow: false,
            title: "权限列表",
          },
          component: () => import("../views/AuthorityView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
export default router;

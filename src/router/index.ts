import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("@/views/Home/HomeView.vue");
const FoodView = () => import("@/views/Home/components/FoodView.vue");
const FoodAddView = () => import("@/views/Home/components/FoodAddView.vue");

const CategoryView = () => import("@/views/Category/Category.vue");
const CategoryAddView = () =>
  import("@/views/Category/components/CategoryAddView.vue");
const CategoryShowView = () =>
  import("@/views/Category/components/CategoryView.vue");

const TiWenView = () => import("@/views/TiWen/TiWen.vue");
const TiWenAddView = () => import("@/views/TiWen/components/TiWenAddView.vue");
const TiWenShowView = () => import("@/views/TiWen/components/TiWenView.vue");
declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        menu: true,
        title: "激励项页面",
        icon: "document-copy",
        auth: false,
      },
      children: [
        {
          path: "food",
          name: "food",
          component: FoodView,
          meta: {
            menu: true,
            title: "展示激励项",
            icon: "document-copy",
            auth: false,
          },
        },
        {
          path: "foodAdd",
          name: "foodAdd",
          component: FoodAddView,
          meta: {
            menu: true,
            title: "激励项管理",
            icon: "document-copy",
            auth: false,
          },
        },
      ],
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView,
      meta: {
        menu: true,
        title: "分类管理",
        icon: "document-copy",
        auth: false,
      },
      children: [
        {
          path: "categoryShow",
          name: "categoryShow",
          component: CategoryShowView,
          meta: {
            menu: true,
            title: "展示分类",
            icon: "document-copy",
            auth: false,
          },
        },
        {
          path: "categoryAdd",
          name: "categoryAdd",
          component: CategoryAddView,
          meta: {
            menu: true,
            title: "分类管理",
            icon: "document-copy",
            auth: false,
          },
        },
      ],
    },
    {
      path: "/tiWen",
      name: "tiWen",
      component: TiWenView,
      meta: {
        menu: true,
        title: "题问项管理",
        icon: "document-copy",
        auth: false,
      },
      children: [
        {
          path: "tiWenShow",
          name: "tiWenShow",
          component: TiWenShowView,
          meta: {
            menu: true,
            title: "展示题问项",
            icon: "document-copy",
            auth: false,
          },
        },
        {
          path: "tiWenAdd",
          name: "tiWenAdd",
          component: TiWenAddView,
          meta: {
            menu: true,
            title: "题问项管理",
            icon: "document-copy",
            auth: false,
          },
        },
      ],
    },
  ],
});

export default router;

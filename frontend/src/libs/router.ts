import MainLayout from "@/pages/Main/MainLayout.vue";
import MarketPage from "@/pages/Main/MarketPage.vue";
import MyNFTsPage from "@/pages/Main/MyNFTsPage.vue";
import ProfilePage from "@/pages/Main/ProfilePage.vue";
import SettingsPage from "@/pages/Main/SettingsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "", redirect: "/market" },
        { path: "/market", component: MarketPage },
        { path: "/my-nfts", component: MyNFTsPage },
        { path: "/profile", component: ProfilePage },
        { path: "/settings", component: SettingsPage },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
});
export default router;

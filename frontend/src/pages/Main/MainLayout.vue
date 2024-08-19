<script lang="ts" setup>
import NavBar from "./components/NavBar.vue";
import { useAppThemeStore } from "@/stores/app-theme.store";
import { useWeb3Store } from "@/stores/web3.store";
import { onMounted } from "vue";

const web3Store = useWeb3Store();
const appThemeStore = useAppThemeStore();

onMounted(async () => {
  web3Store.initialize();
  web3Store.connectWallet();
});
</script>

<template>
  <div
    class="h-screen bg-cover bg-center"
    :style="{
      backgroundImage: `url('/images/gradient-bg-${appThemeStore.theme}.jpg')`,
    }"
  >
    <div class="flex h-full w-full flex-col">
      <NavBar />

      <div class="flex-1 p-2 pt-0">
        <div class="h-full rounded-box bg-base-100/50 p-4 shadow-lg">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

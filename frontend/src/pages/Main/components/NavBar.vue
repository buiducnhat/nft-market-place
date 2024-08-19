<script lang="ts" setup>
import Jazzicon from "@/components/Jazzicon.vue";
import { useWeb3Store } from "@/stores/web3.store";
import { PhWallet } from "@phosphor-icons/vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const web3Store = useWeb3Store();

const links = ref([
  { label: "Market", path: "/market" },
  { label: "My NFTs", path: "/my-nfts" },
]);

const onClickConnectWallet = async () => {
  await web3Store.connectWallet();
};
</script>

<template>
  <div class="p-2">
    <div class="navbar rounded-box bg-base-100/50 shadow-lg">
      <div class="flex-1">
        <RouterLink :to="'/'" class="btn btn-ghost text-xl"
          >Market Place</RouterLink
        >
      </div>

      <div class="flex-none gap-2">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="btn btn-ghost"
          exactActiveClass="text-primary"
        >
          {{ link.label }}
        </RouterLink>

        <button
          v-if="!web3Store.connectedWallet"
          class="btn btn-outline btn-primary"
          @click="onClickConnectWallet"
        >
          <PhWallet size="24" weight="duotone" />
          Connect Wallet
        </button>
        <div v-else class="dropdown dropdown-end">
          <div
            tabIndex="{0}"
            role="button"
            class="avatar btn btn-circle btn-ghost"
          >
            <div class="w-10 rounded-full">
              <Jazzicon :address="web3Store.signer?.address || ''" />
            </div>
          </div>
          <ul
            tabIndex="{0}"
            class="menu dropdown-content z-[1] mt-3 w-40 rounded-box bg-base-100 p-2 shadow"
          >
            <li><RouterLink to="/profile">Profile</RouterLink></li>
            <li><RouterLink to="/settings">Settings</RouterLink></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

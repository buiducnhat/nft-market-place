<script lang="ts" setup>
import { useWeb3Store } from "@/stores/web3.store";
import MetamaskSvg from "@public/images/metamask-icon.svg";

const web3Store = useWeb3Store();

const onClick = () => {
  web3Store.connectWallet();
};
</script>

<template>
  <button class="btn btn-outline btn-primary btn-lg" @click="onClick">
    <MetamaskSvg style="width: 36px" />Connect Wallet
  </button>
</template>

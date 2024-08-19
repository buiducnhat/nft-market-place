<script lang="ts" setup>
import ConnectMetamaskButton from "@/components/ConnectMetamaskButton.vue";
import InstallMetamask from "@/components/InstallMetamask.vue";
import { useWeb3Store } from "@/stores/web3.store";
import { ethers } from "ethers";
import { onMounted, ref } from "vue";

const web3Store = useWeb3Store();

const balance = ref(0);

const fetchAddressAndBalance = async () => {
  if (!web3Store.connectedWallet) {
    await web3Store.connectWallet();
  }

  balance.value = +ethers
    .formatEther(
      (await web3Store.provider?.getBalance(web3Store.signer?.address || "")) ||
        BigInt(0),
    )
    .toString();
};

onMounted(async () => {
  await fetchAddressAndBalance();
});

web3Store.$subscribe(async () => {
  await fetchAddressAndBalance();
});

const hasWallet = !!window.ethereum;
</script>

<template>
  <div>
    <h2 className="text-lg font-semibold mb-4 text-primary">My Wallet</h2>
    <InstallMetamask v-if="!hasWallet" />
    <ConnectMetamaskButton v-else-if="!web3Store.connectWallet" />
    <template v-else>
      <p>
        Address:
        <span class="font-semibold">{{ web3Store.signer?.address }}</span>
      </p>
      <p>
        Balance: <span class="font-semibold">{{ balance.toFixed(6) }}</span> ETH
      </p>
    </template>
  </div>
</template>

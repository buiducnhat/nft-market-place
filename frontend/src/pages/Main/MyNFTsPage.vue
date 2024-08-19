<script setup lang="ts">
import CreateNFTModal from "./components/CreateNFTModal.vue";
import ListMarketItemModal from "./components/ListMarketItemModal.vue";
import NFTCard from "./components/NFTCard.vue";
import { mapTokensOwnedByMe } from "@/services/nft.service";
import { useModalStore } from "@/stores/modal.store";
import { useWeb3Store } from "@/stores/web3.store";
import type { TNFTCardData } from "@/types/market-item.type";
import { onMounted, ref } from "vue";

const web3Store = useWeb3Store();
const modalStore = useModalStore();

const myNFTCardData = ref<Array<TNFTCardData>>([]);

const fetchMyNFTCardData = async () => {
  if (!web3Store.connectedWallet) {
    return;
  }

  const myNFTs = await mapTokensOwnedByMe(
    (await web3Store.nftContract?.getTokensOwnedByMe()) || [],
  );
  const myMarketItems = await web3Store.marketPlaceContract?.getMyMarketItems();

  myNFTCardData.value = myNFTs.map((nft) => {
    const marketItem = myMarketItems?.find(
      (item) => item.tokenId.toString() === nft.id.toString(),
    );

    return {
      nft,
      marketItem,
    };
  });
};

web3Store.$subscribe(async () => {
  fetchMyNFTCardData();
});

onMounted(() => {
  fetchMyNFTCardData();
});
</script>

<template>
  <CreateNFTModal id="create-nft-modal" />
  <ListMarketItemModal id="list-market-item-modal" />

  <div class="mb-4 flex w-full items-center justify-between">
    <h1 class="text-lg font-semibold text-primary">
      My NFTs: {{ myNFTCardData.length }}
    </h1>

    <button
      class="btn btn-primary"
      @click="modalStore.open('create-nft-modal')"
    >
      + Create NFT
    </button>
  </div>

  <div
    class="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
  >
    <NFTCard
      v-for="nftCardData in myNFTCardData"
      :key="nftCardData.nft.id.toString()"
      :nft="nftCardData.nft"
      :marketItem="nftCardData.marketItem"
    />
  </div>
</template>

<script setup lang="ts">
import CreateMarketItemModal from "./components/CreateNFTModal.vue";
import UpdateMarketItemModal from "./components/ListMarketItemModal.vue";
import MarketItemCard from "./components/NFTCard.vue";
import { fetchTokenMetadata } from "@/services/nft.service";
import { useWeb3Store } from "@/stores/web3.store";
import type { TNFTCardData } from "@/types/market-item.type";
import { onMounted, ref } from "vue";

const web3Store = useWeb3Store();

const listingMarketItemsCount = ref<number>(0);
const listingMarketItemsWithMetadata = ref<TNFTCardData[]>([]);

const fetchListingMarketItems = async () => {
  if (!web3Store.provider || !web3Store.signer) {
    return;
  }

  listingMarketItemsCount.value = +(
    (await web3Store.marketPlaceContract?.getListingMarketItemsCounter()) ||
    BigInt(0)
  )?.toString();

  const listingMarketItems =
    (await web3Store.marketPlaceContract?.getListingMarketItems()) || [];

  const tmp: TNFTCardData[] = [];
  for (const marketItem of listingMarketItems) {
    const nftMetaData = await fetchTokenMetadata(marketItem.tokenId);

    tmp.push({
      nft: {
        id: marketItem.tokenId,
        ...nftMetaData,
      },
      marketItem: marketItem,
    });
  }
  listingMarketItemsWithMetadata.value = tmp;
};

web3Store.$subscribe(async () => {
  await fetchListingMarketItems();
});

onMounted(async () => {
  await fetchListingMarketItems();
});
</script>

<template>
  <CreateMarketItemModal id="create-market-item-modal" />
  <UpdateMarketItemModal id="update-market-item-modal" />

  <div class="mb-4 flex w-full items-center justify-between">
    <h1 class="text-lg font-semibold text-primary">
      Market Items: {{ listingMarketItemsCount }}
    </h1>
  </div>

  <div
    class="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
  >
    <MarketItemCard
      v-for="item in listingMarketItemsWithMetadata"
      :key="item.marketItem?.id.toString()"
      v-bind="item"
    />
  </div>
</template>

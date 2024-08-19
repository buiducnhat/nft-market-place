<script setup lang="ts">
import NFTCardSellerText from "./NFTCardSellerText.vue";
import UtilsService from "@/services/utils.service";
import { useModalStore } from "@/stores/modal.store";
import { useWeb3Store } from "@/stores/web3.store";
import type { TNFTCardData } from "@/types/market-item.type";
import { ethers } from "ethers";
import { computed, defineProps, ref } from "vue";

const { nft, marketItem } = defineProps<TNFTCardData>();

const modalStore = useModalStore();
const web3Store = useWeb3Store();
const myAddress = web3Store.signer?.address;

const disabledSubmit = ref(false);

const isOwner = computed(
  () => !marketItem?.seller || myAddress === marketItem.seller,
);

const onClickBuy = async () => {
  if (!marketItem) return;

  disabledSubmit.value = true;

  try {
    await web3Store.marketPlaceContract?.buyMarketItem(BigInt(marketItem.id), {
      value: marketItem.price,
    });
  } catch (error) {
    console.error(error);
  } finally {
    disabledSubmit.value = false;
  }
};

const onClickListOrRelist = () => {
  modalStore.open("list-market-item-modal", { nft, marketItem });
};

const onClickCancelListing = async () => {
  if (!marketItem) return;

  disabledSubmit.value = true;

  try {
    await web3Store.marketPlaceContract?.cancelMarketItem(marketItem.id);
  } catch (error) {
    console.error(error);
  } finally {
    disabledSubmit.value = false;
  }
};
</script>

<template>
  <div v-if="!!nft" class="rounded-box bg-base-100 shadow-xl">
    <figure class="overflow-hidden rounded-t-box">
      <img
        class="h-64 w-full object-cover"
        :src="UtilsService.ipfsToHttp(nft.image)"
        :alt="`Item ${nft.id}`"
      />
    </figure>

    <div class="p-3 pt-2">
      <div class="flex items-center justify-between">
        <h2 class="font-bold">{{ nft.name }}</h2>

        <span class="font-bold">#{{ nft.id }}</span>
      </div>

      <div class="mt-2 flex">
        <NFTCardSellerText
          :item="{ nft, marketItem }"
          title="Creator"
          attribute="creator"
        />
      </div>

      <div class="flex">
        <NFTCardSellerText
          :item="{ nft, marketItem }"
          :title="marketItem?.isListing ? 'Seller' : 'Owner'"
          attribute="seller"
        />
      </div>

      <div class="mt-2 flex items-center justify-between">
        <span v-if="!!marketItem?.price" class="badge badge-info badge-outline">
          {{ ethers.formatEther(marketItem.price) }} ETH
        </span>
        <span v-else class="badge badge-secondary badge-outline"> Owned </span>

        <button
          v-if="!isOwner"
          class="btn btn-primary btn-sm"
          :disabled="disabledSubmit"
          @click="onClickBuy"
        >
          Buy
        </button>
        <button
          v-else-if="isOwner && marketItem?.isListing"
          class="btn btn-outline btn-error btn-sm"
          @click="onClickCancelListing"
        >
          Cancel
        </button>
        <button
          v-else-if="isOwner && !marketItem?.isListing"
          class="btn btn-outline btn-primary btn-sm"
          :disabled="disabledSubmit"
          @click="onClickListOrRelist"
        >
          List for Sale
        </button>
      </div>
    </div>
  </div>
</template>

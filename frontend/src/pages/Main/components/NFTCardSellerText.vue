<script lang="ts" setup>
import { useWeb3Store } from "@/stores/web3.store";
import { TNFTCardData } from "@/types/market-item.type";
import { computed } from "vue";

const { item, attribute } = defineProps<{
  item: TNFTCardData;
  title: "Creator" | "Seller" | "Owner";
  attribute: "creator" | "seller";
}>();

const web3Store = useWeb3Store();
const myAddress = web3Store.signer?.address;

const content = computed(() => {
  if (item.marketItem?.[attribute]) {
    if (item.marketItem[attribute] === myAddress) {
      return "You";
    }
    return (
      item.marketItem[attribute].slice(0, 6) +
      "..." +
      item.marketItem[attribute].slice(-4)
    );
  }
  return "You";
});
</script>

<template>
  <div class="text-sm text-base-content/50">{{ title }}:</div>
  <div
    class="tooltip flex-1"
    :data-tip="item?.marketItem?.[attribute] || 'You'"
  >
    <div class="text-end text-sm text-base-content/75">
      {{ content }}
    </div>
  </div>
</template>

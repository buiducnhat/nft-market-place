<script lang="ts" setup>
import ListMarketItemForm from "./ListMarketItemForm.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useModalStore } from "@/stores/modal.store";
import type { TNFTCardData } from "@/types/market-item.type";
import { computed } from "vue";

const { id } = defineProps<{
  id: string;
}>();

const modalStore = useModalStore();
const nftCardData = computed(
  () => modalStore.modalsProps.get(id) as TNFTCardData,
);
</script>

<template>
  <BaseModal :id="id" title="List Market Item">
    <div v-if="!nftCardData" class="flex w-52 flex-col gap-4">
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-6 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>

    <ListMarketItemForm v-else v-bind="nftCardData" />
  </BaseModal>
</template>

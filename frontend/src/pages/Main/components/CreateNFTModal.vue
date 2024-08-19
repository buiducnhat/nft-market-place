<script lang="ts" setup>
import CreateNFTForm from "./CreateNFTForm.vue";
import BaseModal from "@/components/BaseModal.vue";

const { id } = defineProps<{
  id: string;
}>();
</script>

<template>
  <BaseModal :id="id" title="Create NFT">
    <CreateNFTForm />
  </BaseModal>
</template>

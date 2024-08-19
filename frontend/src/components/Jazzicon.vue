<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import jazzicon from "@metamask/jazzicon";
import { onMounted, ref } from "vue";

const { address } = defineProps<{ address: string }>();

const jazziconDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (jazziconDiv.value) {
    const el = jazzicon(40, parseInt(address.slice(2, 10), 16));
    jazziconDiv.value.appendChild(el);
  }
});
</script>

<template>
  <div class="w-10 rounded-full" ref="jazziconDiv" />
</template>

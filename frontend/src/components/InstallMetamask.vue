<script lang="ts" setup>
import MetamaskSvg from "@public/images/metamask-icon.svg";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-center text-xl font-bold">
      Please connect Metamask to use
    </h1>

    <a href="https://metamask.io/" target="_blank">
      <button class="btn btn-outline btn-primary btn-lg">
        <MetamaskSvg style="width: 36px" />Install Metamask
      </button>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { useAppThemeStore } from "@/stores/app-theme.store";

const appThemeStore = useAppThemeStore();
</script>

<template>
  <h1 class="text-lg font-semibold text-primary">Settings</h1>

  <div class="divider" />

  <div class="max-w-[500px]">
    <h2 class="font-semibold text-primary">Theme</h2>
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Dark theme</span>
        <input
          type="checkbox"
          class="toggle"
          :checked="appThemeStore.isDarkTheme"
          @change="() => appThemeStore.toggleTheme()"
        />
      </label>
    </div>
  </div>
</template>

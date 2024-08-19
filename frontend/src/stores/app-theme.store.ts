import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

type TAppTheme = "light" | "dark";

export const useAppThemeStore = defineStore("app-theme", () => {
  const theme = ref<TAppTheme>("light");
  const isDarkTheme = computed(() => theme.value === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkTheme.value ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    theme.value = newTheme;
  };

  const loadTheme = () => {
    let savedTheme = localStorage.getItem("theme") as TAppTheme;
    if (!savedTheme) {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        savedTheme = "dark";
      } else {
        savedTheme = "light";
      }
    }

    document.documentElement.setAttribute("data-theme", savedTheme);

    theme.value = savedTheme;
  };

  onMounted(() => {
    loadTheme();
  });

  return {
    theme,
    isDarkTheme,
    toggleTheme,
    loadTheme,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppThemeStore, import.meta.hot));
}

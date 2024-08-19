import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const modals = ref<Map<string, boolean>>(new Map());
  const modalsProps = ref<Map<string, any>>(new Map());

  const open = (modalId: string, props?: any) => {
    modals.value.set(modalId, true);
    if (props) {
      modalsProps.value.set(modalId, props);
    }
  };

  const close = (modalId: string) => {
    modals.value.set(modalId, false);
    setTimeout(() => {
      modalsProps.value.delete(modalId);
    }, 500);
  };

  return {
    modals,
    modalsProps,
    open,
    close,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}

<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import { useWeb3Store } from "@/stores/web3.store";
import type { BaseFormSchema } from "@/types/base-form.type";
import type {
  TListMarketItemForm,
  TNFTCardData,
} from "@/types/market-item.type";
import { toTypedSchema } from "@vee-validate/zod";
import { ethers } from "ethers";
import { ref } from "vue";
import { z } from "zod";

const { nft, marketItem } = defineProps<TNFTCardData>();

const formId = "list-market-item-form";

const web3Store = useWeb3Store();

const formSchema: BaseFormSchema = {
  fields: [
    {
      label: "Price",
      placeholder: "Price",
      name: "price",
      type: "number",
    },
    {
      label: "Currency",
      name: "currency",
      as: "select",
      options: [
        { value: "ether", label: "Ether" },
        { value: "gwei", label: "Gwei" },
        { value: "wei", label: "Wei" },
      ],
    },
  ],
  validationSchema: toTypedSchema(
    z.object({
      price: z.number().gt(0).default(0),
      currency: z
        .string()
        .refine((val) => {
          return ["ether", "gwei", "wei"].includes(val);
        })
        .default("ether"),
    }),
  ),
};

const submitting = ref(false);

const onSubmitForm = async (value: TListMarketItemForm) => {
  submitting.value = true;

  try {
    if (!web3Store.connectedWallet) {
      return;
    }

    // Check if market item is existed
    if (!!marketItem && !marketItem.isListing) {
      await web3Store.marketPlaceContract?.reListMarketItem(
        BigInt(marketItem.id),
        ethers.parseUnits(value.price.toString()),
      );
    } else {
      await web3Store.marketPlaceContract?.listMarketItem(
        import.meta.env.VITE_NFT_ADDRESS,
        nft.id.toString(),
        ethers.parseUnits(value.price.toString(), value.currency),
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <DynamicForm :id="formId" :schema="formSchema" :onSubmit="onSubmitForm" />

  <div class="flex justify-end">
    <button
      type="submit"
      class="btn btn-primary"
      :form="formId"
      :disabled="submitting"
    >
      List
    </button>
  </div>
</template>

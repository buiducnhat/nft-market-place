<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import IpfsService from "@/services/ipfs.service";
import { useWeb3Store } from "@/stores/web3.store";
import type { BaseFormSchema } from "@/types/base-form.type";
import type { TCreateNFTForm, TNFTMetadata } from "@/types/market-item.type";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { z } from "zod";

const web3Store = useWeb3Store();

const formSchema: BaseFormSchema = {
  fields: [
    {
      label: "Name",
      placeholder: "Name of item",
      name: "name",
    },
    {
      label: "Description",
      placeholder: "Optional",
      name: "description",
      as: "textarea",
    },
    {
      label: "Image",
      name: "image",
      as: "input",
      type: "file",
    },
  ],
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(3),
      description: z.string().optional(),
      image: z.instanceof(File),
    }),
  ),
};

const submitting = ref(false);
const onSubmitForm = async (value: TCreateNFTForm) => {
  submitting.value = true;

  try {
    const imageHash = await IpfsService.uploadFile(
      value.image,
      `${value.name}_${new Date().getTime()}.${value.image.type.split("/")[1]}`,
    );

    const nftMetadata: TNFTMetadata = {
      name: value.name,
      description: value.description,
      image: `ipfs://${imageHash}`,
    };

    const nftHash = await IpfsService.uploadJSON(
      nftMetadata,
      `${value.name}_${new Date().getTime()}.json`,
    );
    await web3Store.nftContract?.mintToken(`ipfs://${nftHash}`);
  } catch (error) {
    console.log(error);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <DynamicForm
    id="create-nft-form"
    :schema="formSchema"
    :onSubmit="onSubmitForm"
  />

  <div class="flex justify-end">
    <button
      type="submit"
      class="btn btn-primary"
      form="create-nft-form"
      :disabled="submitting"
    >
      Create
    </button>
  </div>
</template>

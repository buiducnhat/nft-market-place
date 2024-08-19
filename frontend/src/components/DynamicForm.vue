<script setup lang="ts">
import type { BaseFormSchema } from "@/types/base-form.type";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { defineProps } from "vue";

defineProps<{
  id: string;
  schema: BaseFormSchema;
  onSubmit: (_values: any) => void;
}>();

const inputClass = "input input-bordered w-full";
const textAreaClass = "textarea textarea-bordered w-full";
const inputFileClass = "file-input-bordered file-input w-full";
const selectClass = "select select-bordered w-full";

const getClassName = (as?: string, type?: string) => {
  switch (as) {
    case "input":
      if (type === "file") {
        return inputFileClass;
      }
      return inputClass;
    case "textarea":
      return textAreaClass;
    case "select":
      return selectClass;
    default:
      return inputClass;
  }
};
</script>

<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="schema.validationSchema"
    as="div"
  >
    <form :id="id" @submit="handleSubmit($event, onSubmit)">
      <label
        v-for="{
          as,
          name,
          label,
          children,
          options,
          ...attrs
        } in schema.fields"
        :key="name"
        class="form-control w-full"
      >
        <div v-if="!!label" class="label">
          <span class="label-text">{{ label }}</span>
        </div>

        <Field
          :as="as || 'input'"
          :name="name"
          :class="getClassName(as, attrs.type)"
          v-bind="attrs"
        >
          <template v-if="children && children.length">
            <component
              v-for="({ tag, text, ...childAttrs }, idx) in children"
              :key="idx"
              :is="tag"
              v-bind="childAttrs"
            >
              {{ text }}
            </component>
          </template>

          <template v-if="options && options.length > 0">
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </template>
        </Field>

        <div class="label">
          <ErrorMessage class="ms-2 text-sm text-error" :name="name" />
        </div>
      </label>
    </form>
  </VeeForm>
</template>

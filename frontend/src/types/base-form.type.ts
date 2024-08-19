import type { TypedSchema } from "vee-validate";

export type BaseFormSchemaField = {
  as?: string;
  name: string;
  label?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  children?: {
    tag: string;
    text: string;
    [key: string]: any;
  }[];
  [key: string]: any;
};

export type BaseFormSchema = {
  fields: BaseFormSchemaField[];
  validationSchema?: TypedSchema;
};

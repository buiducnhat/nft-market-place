/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }

  interface ImportMetaEnv {
    readonly VITE_WEB3_PROVIDER_URL: string;
    readonly VITE_MARKETPLACE_CONTRACT_ADDRESS: string;
    readonly VITE_NFT_ADDRESS: string;

    readonly VITE_PINATA_GATEWAY: string;
    readonly VITE_PINATA_API_KEY: string;
  }
}

import type { TNFTMetadata } from "@/types/market-item.type";
import type { ContractTransactionResponse } from "ethers";

class UtilsService {
  static ipfsToHttp(ipfsUrl: string): string {
    return `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${ipfsUrl.replace("ipfs://", "")}`;
  }

  static async fetchMetadata(ipfsUrl: string): Promise<TNFTMetadata> {
    return fetch(UtilsService.ipfsToHttp(ipfsUrl)).then((res) => res.json());
  }

  static async parseTx(tx: ContractTransactionResponse, eventName: string) {
    try {
      const rc = await tx.wait();

      return (rc?.logs.find((l: any) => l.fragment.name === eventName) as any)
        ?.args as any[];
    } catch (error) {
      console.error(error);
    }
  }
}

export default UtilsService;

import MarketPlaceArtifact from "@hardhat/artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import NFTArtifact from "@hardhat/artifacts/contracts/NFT.sol/NFT.json";
import type { MarketPlace as MarketPlaceContract } from "@hardhat/typechain-types/contracts/MarketPlace";
import type { NFT as NFTContract } from "@hardhat/typechain-types/contracts/NFT";
import { ethers } from "ethers";
import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, markRaw, ref } from "vue";

export const useWeb3Store = defineStore("web3", () => {
  const provider = ref<ethers.BrowserProvider | ethers.JsonRpcProvider>();
  const signer = ref<ethers.JsonRpcSigner>();

  const marketPlaceContract = ref<MarketPlaceContract>();
  const nftContract = ref<NFTContract>();

  const connectedNetwork = computed(() => !!provider.value);
  const connectedWallet = computed(() => !!signer.value);

  const initialize = async () => {
    try {
      provider.value = markRaw(
        new ethers.JsonRpcProvider(import.meta.env.VITE_WEB3_PROVIDER_URL),
      );

      nftContract.value = markRaw(
        new ethers.Contract(
          import.meta.env.VITE_NFT_ADDRESS,
          NFTArtifact.abi,
          provider.value,
        ) as any,
      );
      marketPlaceContract.value = markRaw(
        new ethers.Contract(
          import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS,
          MarketPlaceArtifact.abi,
          provider.value,
        ) as any,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const newSigner = await newProvider.getSigner();

        provider.value = markRaw(newProvider);
        signer.value = markRaw(newSigner);

        nftContract.value = markRaw(
          new ethers.Contract(
            import.meta.env.VITE_NFT_ADDRESS,
            NFTArtifact.abi,
            newSigner,
          ) as any,
        );
        marketPlaceContract.value = markRaw(
          new ethers.Contract(
            import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS,
            MarketPlaceArtifact.abi,
            newSigner,
          ) as any,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    provider,
    signer,
    connectedNetwork,
    connectedWallet,
    marketPlaceContract,
    nftContract,
    initialize,
    connectWallet,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot));
}

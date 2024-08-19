// import UtilsService from "./utils.service";
// import type { TMarketItem } from "@/types/market-item.type";
// import MarketPlaceArtifact from "@hardhat/artifacts/contracts/MarketPlace.sol/MarketPlace.json";
// import type { MarketPlace } from "@hardhat/typechain-types/contracts/MarketPlace";
// import { ethers } from "ethers";
// import { toRaw } from "vue";

// class MarketPlaceService {
//   private readonly contract: MarketPlace;

//   constructor(
//     provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider,
//   ) {
//     this.contract = new ethers.Contract(
//       import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS,
//       MarketPlaceArtifact.abi,
//       provider,
//     ) as unknown as MarketPlace;

//     const signer = provider.getSigner();
//     this.contract = this.contract.connect(signer) as MarketPlace;
//   }

//   async getMarketItemMetadata(marketItemId: string) {
//     const rawItem = await this.publicContract.getMarketItemById(marketItemId);
//     const tokenURI = await this.nftService.tokenURI(rawItem.tokenId.toString());

//     return fetch(UtilsService.ipfsToHttp(tokenURI)).then((res) => res.json());
//   }

//   async getListingMarketItems(): Promise<TMarketItem[]> {
//     const listingMarketItems =
//       await this.contract.getListingMarketItems();

//     return listingMarketItems;
//   }

//   async getMyMarketItems(): Promise<TMarketItem[]> {
//     const myMarketItems = await this.contract.getMyMarketItems();

//     return myMarketItems;
//   }

//   async getMarketItemById(marketItemId: string): Promise<TMarketItem> {
//     const marketItem =
//       await this.publicContract.getMarketItemById(marketItemId);

//     return marketItem;
//   }

//   async getListingMarketItemsCounter() {
//     const counter = await this.contract.getListingMarketItemsCounter();

//     return +counter.toString();
//   }

//   async getListingFee() {
//     return +(await this.publicContract.getListingFee()).toString();
//   }

//   async listMarketItem(
//     tokenId: string,
//     price: string | number,
//     currency: "wei" | "gwei" | "ether",
//   ) {
//     await this.contract.listMarketItem(
//       import.meta.env.VITE_NFT_ADDRESS,
//       tokenId,
//       ethers.parseUnits(price.toString(), currency),
//     );
//   }

//   async updateMarketItem(
//     marketItemId: string,
//     price: string | number,
//     currency: "wei" | "gwei" | "ether",
//   ) {
//     await this.contract.updateMarketItem(
//       marketItemId,
//       ethers.parseUnits(price.toString(), currency),
//     );
//   }

//   async cancelMarketItem(marketItemId: string | number | bigint) {
//     await this.contract.cancelMarketItem(marketItemId);
//   }

//   async reListMarketItem(
//     marketItemId: string,
//     price: number | string,
//     currency: "wei" | "gwei" | "ether",
//   ) {
//     return this.contract.reListMarketItem(
//       marketItemId,
//       ethers.parseUnits(price.toString(), currency),
//     );
//   }

//   async buyMarketItem(
//     marketItemId: string | number | bigint,
//     price: string | number | bigint,
//   ) {
//     return this.contract.buyMarketItem(marketItemId, {
//       value: price.toString(),
//     });
//   }
// }

// export default MarketPlaceService;

// export 
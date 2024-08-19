export type TNFTMetadata = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
};

export type TNFT = {
  id: string | bigint | number;
} & TNFTMetadata;

export type TMarketItem = {
  id: string | bigint | number;
  tokenId: string | bigint | number;
  price: number | bigint | string;
  creator: string;
  seller: string;
  isListing: boolean;
};

export type TNFTCardData = {
  nft: TNFT;
  marketItem?: TMarketItem;
};

export type TCreateNFTForm = {
  name: string;
  description?: string;
  image: File;
};

export type TListMarketItemForm = {
  price: number;
  currency: "ether" | "gwei" | "wei";
};

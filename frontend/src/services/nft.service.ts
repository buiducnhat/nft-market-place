import { useWeb3Store } from "@/stores/web3.store";
import { TNFT, TNFTMetadata } from "@/types/market-item.type";
import axios from "axios";

export const fetchTokenMetadata = async (tokenId: bigint | string | number) => {
  const web3Store = useWeb3Store();

  const tokenUri = await web3Store.nftContract?.tokenURI(tokenId.toString());

  const response = await axios.get<TNFTMetadata>(
    `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${tokenUri?.replace("ipfs://", "")}`,
  );
  return response.data;
};

export const mapTokensOwnedByMe = async (
  tokenIds: bigint[],
): Promise<TNFT[]> => {
  const tokensOwnedByMe = [];
  for (const id of tokenIds) {
    const metadata = await fetchTokenMetadata(id);

    tokensOwnedByMe.push({
      id,
      ...metadata,
    });
  }

  return tokensOwnedByMe;
};

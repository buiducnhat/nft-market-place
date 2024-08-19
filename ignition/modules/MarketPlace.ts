import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketPlaceModule = buildModule("MarketPlace", (m) => {
  const marketPlaceContract = m.contract("MarketPlace");
  const nftContract = m.contract("NFT", [marketPlaceContract]);

  return { marketPlaceContract, nftContract };
});

export default MarketPlaceModule;

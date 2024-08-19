import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia_alchemy: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${vars.get(
        "ALCHEMY_API_KEY"
      )}`,
      accounts: [vars.get("SEPOLIA_PRIVATE_KEY")],
    },
    sepolia_infura: {
      url: `https://sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`,
      accounts: [vars.get("SEPOLIA_PRIVATE_KEY")],
    },
  },
};

export default config;

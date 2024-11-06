import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//import "@nomiclabs/hardhat-etherscan";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // for Arbitrum Sepolia testnet
    // "arbitrum-sepolia": {
    //   url: process.env.ARB_RPC_URL!,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
    //   gasPrice: 1000000000,
    // },
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey:
      process.env.BASESCAN_API_KEY || "Z597QN9XS29338DPDQIAHT83A42M3933P5",
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
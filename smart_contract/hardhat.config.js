const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {
  RPC_SCROLL,
  RPC_ETHEREUM_SEPOLIA,
  PRIVATE_KEY
} = process.env;

const config = {
  solidity: "0.8.17",
  networks: {
    scrollSepolia: {
        url: "https://sepolia-rpc.scroll.io/" || "",
        accounts: [PRIVATE_KEY || "1".repeat(64)]
    },
    sepolia: {
      url: RPC_ETHEREUM_SEPOLIA,
      accounts: [PRIVATE_KEY || "1".repeat(64)]
    }
  }
};

module.exports = config;

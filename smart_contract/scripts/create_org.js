const { ethers } = require("hardhat");

async function registerOrganization() {
  const [deployer] = await ethers.getSigners();

  // Replace with the actual deployed contract address
  const contractAddress = "0x59A7bFD7fC5c37a560C93651Fd3B8b1DeE6A4077";

  // Replace with the actual IPFS hash or an empty string if not applicable

  // Connect to the deployed contract
  const ipfsToken = "0x6B63898740aAdc5D28747697eB171596c3d6bea7"
  const organizationNFTContract = await ethers.getContractAt("OrganizationNFT", contractAddress, deployer);

  // Call the registerOrganization function
  await organizationNFTContract.registerOrganization(
    "ORG 1",
    "Your Organization Description",
    ipfsToken
  );

  console.log("Organization registered successfully!");
}

registerOrganization()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

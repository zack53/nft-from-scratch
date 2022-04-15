const { ethers, web3, network, config } = require("hardhat")
const { VRFCoordniator, LINK, KeyHash, fee } = config.EVMAddresses[network.name]

/**
 * Script to deploy contracts using hardhat
 */
async function main() {
  // Get needed accounts
  const accounts = await web3.eth.getAccounts()

  // Get contract factory and deploy.
  const AdvancedCollectible = await ethers.getContractFactory("AdvancedCollectible")
  const advancedCollectible = await AdvancedCollectible.deploy(VRFCoordniator, LINK, KeyHash, fee)


  // Log deployed contract addresses to console
  console.log("AdvancedCollectible deployed to:", advancedCollectible.address)


  // Call the main function to run
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

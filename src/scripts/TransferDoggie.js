const { ethers, web3, network, config } = require("hardhat")
const { AdvancedCollectibleAddress, LINK } = config.EVMAddresses[network.name]
const { ERC20ABI } = config.EVMAddresses



const LINKContract = new web3.eth.Contract(ERC20ABI, LINK)


/**
 * Funds the deployed contract with Link
 */
let main = async () => {
    // Get accounts
    const accounts = await web3.eth.getAccounts()

    // Set contract 
    const AdvancedCollectible = await ethers.getContractFactory("AdvancedCollectible")
    const advancedCollectible = AdvancedCollectible.attach(AdvancedCollectibleAddress)
    await advancedCollectible.transferFrom(accounts[0], accounts[2], 2)
    let ownAmount = await advancedCollectible.balanceOf(accounts[2])
    console.log(ownAmount.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
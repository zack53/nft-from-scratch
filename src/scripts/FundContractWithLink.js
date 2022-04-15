const { ethers, web3, network, config } = require("hardhat")
const { AdvancedCollectibleAddress, LINK } = config.EVMAddresses[network.name]
const { ERC20ABI } = config.EVMAddresses



const LINKContract = new web3.eth.Contract(ERC20ABI, LINK)


let main = async () => {
    const accounts = await web3.eth.getAccounts()
    const AdvancedCollectible = await ethers.getContractFactory("AdvancedCollectible")
    const advancedCollectible = AdvancedCollectible.attach(AdvancedCollectibleAddress)

    let LINKBal = await LINKContract.methods.balanceOf(accounts[0]).call()

    console.log(`Amount of LINK sending to contract: ${LINKBal.toString()}`)

    await LINKContract.methods.transfer(advancedCollectible.address, LINKBal.toString()).send({ from: accounts[0] })
    let ContractLINKBal = await LINKContract.methods.balanceOf(advancedCollectible.address).call()
    console.log(`Amount of LINK on contract: ${ContractLINKBal.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
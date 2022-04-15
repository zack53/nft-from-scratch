const { ethers, web3, network, config } = require("hardhat")
const { AdvancedCollectibleAddress } = config.EVMAddresses[network.name]
const { BigNumber } = require('bignumber.js')
const { sleep } = require('../util/TokenUtil')



let main = async () => {

    // Sets the contract to the deployed address
    const AdvancedCollectible = await ethers.getContractFactory("AdvancedCollectible")
    const advancedCollectible = AdvancedCollectible.attach(AdvancedCollectibleAddress)

    // Starts the process to create a dog NFT
    console.log('Creating doggie')
    await advancedCollectible.CreateDoggies('')

    // Sleep long enough for the random number to be generated and mint new token
    await sleep(1000 * 120)

    let blockNumberStart = BigNumber(await web3.eth.getBlockNumber()).minus(50).toNumber()

    // Parse the event info to set the token URI
    let event = await advancedCollectible.queryFilter("requestedCollectible", blockNumberStart, 'latest')
    for (let i = 0; i < event.length; i++) {
        let requestId = event[i].args[1]
        let tokenId = (await advancedCollectible.requestIdToTokenId(requestId)).toString()
        let currentTokenURI = await advancedCollectible.tokenURI(tokenId)
        let breed = (await advancedCollectible.tokenIdToBreed(tokenId)).toString()
        console.log(`Token ID: ${tokenId} - Breed: ${breed}`)
        if (currentTokenURI.substring(0, 7) == 'ipfs://') {
            console.log(`Token URI value has already been set: ${currentTokenURI}`)
        } else {
            console.log(`Setting token URI to ${config.IPFSTokenURI[breed]}`)
            await advancedCollectible.setTokenURI(tokenId, config.IPFSTokenURI[breed])
            await sleep(1000 * 20)
            let newTokenURI = await advancedCollectible.tokenURI(tokenId)
            console.log(`Your new token URI is: ${newTokenURI}`)
        }
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
//https://trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts.html
//The link above is a good resource for everything related to truffle contracts.

const { web3, assert, network, config } = require("hardhat")
const { VRFCoordniator, LINK, KeyHash, WTOKEN, fee } = config.EVMAddresses[network.name]
const { ERC20ABI, UniSwapV3RouterAddress } = config.EVMAddresses
const { wrapToken } = require('../util/TokenUtil')
const { BigNumber } = require('bignumber.js')
const { sleep } = require('../util/TokenUtil')

const WTokenContract = new web3.eth.Contract(ERC20ABI, WTOKEN)
const LINKContract = new web3.eth.Contract(ERC20ABI, LINK)

//Creates a truffe contract from compiled artifacts.
const AdvancedCollectible = artifacts.require("AdvancedCollectible")
const UniSwapSingleSwap = artifacts.require("UniSwapSingleSwap")

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("AdvancedCollectible contract", function () {
    let accounts
    let advancedCollectible
    let LINKBal
    let requestId

    before(async function () {
        accounts = await web3.eth.getAccounts()
        //Checks to see if the first account has ETH
        let balance = await web3.eth.getBalance(accounts[0])
        assert.notEqual(balance, 0)
        //deploy contract
        advancedCollectible = await AdvancedCollectible.new(VRFCoordniator, LINK, KeyHash, fee)
        //deploy contract
        uniSwapSingleSwap = await UniSwapSingleSwap.new(UniSwapV3RouterAddress)
    })

    it("Should deploy with the name Doggies", async function () {
        assert.equal(await advancedCollectible.name(), 'Doggies')
    })

    it("Should deploy with the symbol DOG", async function () {
        assert.equal(await advancedCollectible.symbol(), 'DOG')
    })

    it("Should deploy with the correct address", async function () {
        assert.equal(await uniSwapSingleSwap.swapRouter(), UniSwapV3RouterAddress)
    })

    it('Should swap token values WTOKEN for LINK', async function () {
        let wTokenAmountToTransfer = 15
        //Send ETH to WTOKEN contract in return for WTOKEN
        await wrapToken(wTokenAmountToTransfer, accounts[0], WTokenContract)
        //Sends WTOKEN to the deployed contract and
        //checks the results.

        //await sendWrapEth(wTokenAmountToTransfer,uniSwapSingleSwap.address, accounts[0])
        //let contractWethBal = await WTokenContract.methods.balanceOf(uniSwapSingleSwap.address).call()
        //assert.equal(web3.utils.fromWei(contractWethBal,'ether'),wTokenAmountToTransfer)

        await WTokenContract.methods.approve(uniSwapSingleSwap.address, web3.utils.toWei(wTokenAmountToTransfer.toString(), 'ether')).send({ from: accounts[0] })

        //The link at the top of this file describes how to override 
        //the from value when dealing with transactions using truffle contracts.
        //I am sending the wTokenAmountToTransfer to the contract to be swapped on
        //UniSwap V3 Pool for LINK. The LINK is then transferred back to the account
        //that sent the request.
        await uniSwapSingleSwap.swapExactInputSingle(web3.utils.toWei(wTokenAmountToTransfer.toString(), 'ether'), 0, WTOKEN, LINK, 3000, { from: accounts[0] })
        LINKBal = await LINKContract.methods.balanceOf(accounts[0]).call()
        assert.notEqual(LINKBal / 10 ** 8, 0)
    })

    it('Should transfer LINK to contract', async function () {
        await LINKContract.methods.transfer(advancedCollectible.address, LINKBal.toString()).send({ from: accounts[0] })
        let ContractLINKBal = await LINKContract.methods.balanceOf(advancedCollectible.address).call()
        assert.equal(ContractLINKBal.toString(), LINKBal.toString())

    })

    it("Should mint NFT", async function () {
        let amountCreated = await advancedCollectible.tokenCounter()
        await advancedCollectible.CreateDoggies('')
        let event = await advancedCollectible.getPastEvents('requestedCollectible', { fromBlock: BigNumber(await web3.eth.getBlockNumber()).minus(1).toString(), toBlock: 'latest' })

        for (let i = 0; i < event.length; i++) {
            if (event[i].returnValues.minter == accounts[0]) {
                requestId = event[i].returnValues.requestId
                break
            }
        }
        assert.notEqual(requestId.toString(), 0x0)
        // Sleep until the link process can generate / confirm random number
        // then, the fulfillRandomness is called by link process that is
        // responsible for generating random Doggie.
        await sleep(1000 * 30)
    })

    it("Should wait another 20 seconds then set token URI", async () => {
        await sleep(1000 * 20)

        let event = await advancedCollectible.getPastEvents('mintCollectible', { fromBlock: BigNumber(await web3.eth.getBlockNumber()).minus(1).toString(), toBlock: 'latest' })
        console.log(event)
        let tokenId = (await advancedCollectible.requestIdToTokenId(requestId)).toString()
        console.log(tokenId)
        let breed = (await advancedCollectible.tokenIdToBreed(tokenId)).toString()
        console.log(breed)
        console.log(config.IPFSTokenURI[breed])
    })

    // it("Should mint NFT", async function () {
    // assert.equal(await AdvancedCollectible.mint('Zack'), baseURI)
    // })
})
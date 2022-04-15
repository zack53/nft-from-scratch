
require("@nomiclabs/hardhat-truffle5")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("dotenv").config()

module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MUMBAI_URL,
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3]
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3]
    },
    polygon_mainnet: {
      url: process.env.POLYGON_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3]
    },
    eth_mainnet: {
      url: process.env.ETH_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3]
    }
  },
  etherscan: {
    apiKey: process.env.ETH_SCAN_API_KEY
  },
  gasReporter: {
    currency: 'USD',
    showTimeSpent: true,
    coinmarketcap: process.env.COIN_MARKET_API_KEY,
    // gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice'
    gasPriceApi: 'https://api.polygonscan.io/api?module=proxy&action=eth_gasPrice'
  },
  EVMAddresses: {
    mumbai: {
      VRFCoordniator: "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255",
      LINK: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      KeyHash: "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4",
      WTOKEN: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      fee: "100000000000000",
      AdvancedCollectibleAddress: "0xae87e56a9dF1Baf99F77B7A75F6EFDFD03bc41e5"
    },
    polygon_mainnet: {
      VRFCoordniator: "0x3d2341ADb2D31f1c5530cDC622016af293177AE0",
      LINK: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
      KeyHash: "0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da",
      WTOKEN: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      fee: "100000000000000"
    },
    hardhat: {
      VRFCoordniator: "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255",
      LINK: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      KeyHash: "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4",
      WTOKEN: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      fee: "100000000000000"
    },
    localhost: {
      VRFCoordniator: "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255",
      LINK: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      KeyHash: "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4",
      WTOKEN: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      fee: "100000000000000"
    },
    UniSwapV3RouterAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    ERC20ABI: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }]
  },
  IPFSTokenURI: {
    0: "ipfs://QmSD66EFzVVaPQme3FgkxY6UNJnt5uXynPcB8fW6ZGewFk?filename=PUG.json",
    1: "ipfs://QmYdVieQUiwhLiUkDDY4HqTbZHxW3fXtTFqPEBawMsr51Z?filename=SHIBA_INU.json",
    2: "ipfs://QmR5iqMtfhL318KgjbMjuDgVFRUo1pGUpWJ7N1BMgj74uk?filename=ST_BERNARD.json"
  }
}


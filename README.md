# nft-from-scratch
This AdvancedCollectible contract has been created from following the https://www.youtube.com/watch?v=p36tXHX1JD8&amp;t=11s tutorial. The contract is meant to allow a user to create a Doggie NFT. You have a random chance of getting one of three dogs a Pug, St Bernard, or Shiba Inu.

The tutorial uses brownie / python to set-up the scripts to deploy, but I have implemented tests with hardhat / node js and deploy scripts with node js as well. I also used version 0.8.10 of the solidity compiler instead of the 0.6.x that was used in the tutorial. Moving to v0.8.10 required updating the contract to be compatiable with both the new VRFConsumerBase for 0.8.x and ERC721URIStorage 0.8.x. 

### AdvancedCollectible

| Deployed Environments | Address |
| ----------- | ----------- |
| Mumbai | [0xae87e56a9dF1Baf99F77B7A75F6EFDFD03bc41e5](https://mumbai.polygonscan.com/address/0xae87e56a9dF1Baf99F77B7A75F6EFDFD03bc41e5#code) |

| Write Functions | Functions that owner can call on the contract |
| ----------- | ----------- |
| CreateDoggies | Starts the process to mint a new NFT. The process calls requestRandomness from the VRFConsumerBase contract. The call requires LINK to work. The requestRandomness returns a random number to fulfillRandomness function. Emits requestedCollectible(address indexed minter, bytes32 indexed requestId)   |
| fulfillRandomness | The fulfillRandomness function mints the NFT and sets the breed to a 1 of 3 choices. Emits mintCollectible(bytes32 indexed requestId, uint256 tokenId, Breed breed) |
| safeTransferFrom | ERC721 function. |
| safeTransferFrom | ERC721 function. |
| setApprovalForAll | ERC721 function. |
| setTokenURI |  Takes in tokenId uint256 and tokenURI string. Sets the tokenId's tokenURI to the tokenURI value provided. |
| transferFrom | ERC721 function. |

| Read Functions | Functions that anyone can read on the contract |
| ----------- | ----------- |
| balanceOf | Takes in owner address. Returns number of Doggies owned. |
| getApproved | ERC721 function. |
| isApprovedForAll | ERC721 function. |
| name | ERC721 function. |
| ownerOf | ERC721 function. |
| requestIdToSender | Takes in requestId. Returns the msg.sender of the CreateDoggies request. |
| supportsInterface | ERC721 function. |
| symbol | ERC721 function. |
| tokenCounter | Returns total number of minted Doggies. |
| tokenIdToBreed | Takes in tokenId uint256. Returns the breed of the tokenId. |
| tokenURI | ERC721 function. |

# nft-from-scratch
This AdvancedCollectible contract has been created from following the https://www.youtube.com/watch?v=p36tXHX1JD8&amp;t=11s tutorial.

The tutorial uses brownie / python to set-up the scripts to deploy, but I have implemented tests with hardhat / node js and deploy scripts with node js as well. I also used version 0.8.10 of the solidity compiler instead of the 0.6.x that was used in the tutorial. Moving to v0.8.10 required updating the contract to be compatiable with both the new VRFConsumerBase for 0.8.x and ERC721URIStorage 0.8.x. 

| Deployed Environments | Address |
| ----------- | ----------- |
| Mumbai | 0xae87e56a9dF1Baf99F77B7A75F6EFDFD03bc41e5 |
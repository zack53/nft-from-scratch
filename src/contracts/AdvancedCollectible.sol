//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract AdvancedCollectible is VRFConsumerBase, ERC721URIStorage {
    uint256 tokenId;
    bytes32 internal keyHash;
    uint256 public fee;
    uint256 public tokenCounter;

    enum Breed {
        PUG,
        SHIBA_INU,
        ST_BERNARD
    }

    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => string) public requestIdToTokenURI;
    mapping(uint256 => Breed) public tokenIdToBreed;
    mapping(bytes32 => uint256) public requestIdToTokenId;

    event requestedCollectible(bytes32 indexed requestId);

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash
    ) ERC721("Doggies", "DOG") VRFConsumerBase(_VRFCoordinator, _LinkToken) {
        keyHash = _keyhash;
        fee = .25 * 10**18;
    }

    function CreateDoggies(string memory tokenURI) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenURI[requestId] = tokenURI;
        emit requestedCollectible(requestId);
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        virtual
        override
    {
        address dogOwner = requestIdToSender[requestId];
        string memory tokenURI = requestIdToTokenURI[requestId];

        _safeMint(dogOwner, tokenCounter, "");
        _setTokenURI(tokenCounter, tokenURI);

        Breed breed = Breed(randomness % 3);
        tokenIdToBreed[tokenCounter] = breed;
        requestIdToTokenId[requestId] = tokenCounter;

        tokenCounter += 1;
    }

    function setTokenURI(uint256 tokenId_, string memory tokenURI_) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId_),
            "ERC721: transfer caller is not owner nor approved."
        );
        _setTokenURI(tokenId_, tokenURI_);
    }
}

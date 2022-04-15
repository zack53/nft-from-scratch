//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

/**
    Advanced Collectible Smart contract to generate a random NFT
    between the choices of PUG, SHIBA_INU, and ST_BERNARD
*/
contract AdvancedCollectible is VRFConsumerBase, ERC721URIStorage {
    // Variables needed to store data
    uint256 tokenId;
    bytes32 internal keyHash;
    uint256 public fee;
    uint256 public tokenCounter;

    // Available Dog breeds
    enum Breed {
        PUG,
        SHIBA_INU,
        ST_BERNARD
    }

    // Mappings needed to set breed given the request ID
    mapping(bytes32 => string) private requestIdToTokenURI;
    mapping(bytes32 => address) public requestIdToSender;
    mapping(uint256 => Breed) public tokenIdToBreed;
    mapping(bytes32 => uint256) public requestIdToTokenId;

    // Emits when calling Create Doggies
    event requestedCollectible(
        address indexed minter,
        bytes32 indexed requestId
    );

    // Emits when fulfillRandomness is called
    event mintCollectible(
        bytes32 indexed requestId,
        uint256 tokenId,
        Breed breed
    );

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash,
        uint256 _fee
    ) ERC721("Doggies", "DOG") VRFConsumerBase(_VRFCoordinator, _LinkToken) {
        keyHash = _keyhash;
        fee = _fee;
    }

    /**
        Create Doggies tokes in a tokenURI and generates a request
        for a random number. The token URI right now is always 
        defaulted to an empty value due to not knowing what tokenURI
        to set until we receive the random number.
    */
    function CreateDoggies(string memory tokenURI) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenURI[requestId] = tokenURI;
        emit requestedCollectible(msg.sender, requestId);
        return requestId;
    }

    /**
        ChainLink function that gets after the Create Doggies function.
        We get the random number here and mint NFT with dog breed.
    */
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

        emit mintCollectible(requestId, tokenCounter, breed);

        tokenCounter += 1;
    }

    /**
        Function to set the token URI. This is to be called after 
        minting of the NFT has been completed successfully.
    */
    function setTokenURI(uint256 tokenId_, string memory tokenURI_) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId_),
            "ERC721: transfer caller is not owner nor approved."
        );
        _setTokenURI(tokenId_, tokenURI_);
    }
}

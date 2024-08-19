// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721, ERC721URIStorage {
    event TokenMinted(
        address indexed to,
        uint256 indexed tokenId,
        string uri,
        address marketPlaceAddress
    );

    uint private _tokenIdCounter;
    address private _marketPlaceAddress;
    mapping(uint => address) private _creators;

    constructor(address marketPlaceAddress) ERC721("Nathan", "NHAT") {
        _tokenIdCounter = 0;
        _marketPlaceAddress = marketPlaceAddress;
    }

    function mintToken(string memory uri) public {
        uint newTokenId = _tokenIdCounter + 1;

        // Mint token, set URI
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);

        // Set approval for marketplace
        setApprovalForAll(_marketPlaceAddress, true);

        // Update local state
        _tokenIdCounter++;
        _creators[newTokenId] = msg.sender;

        emit TokenMinted(msg.sender, newTokenId, uri, _marketPlaceAddress);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getTokenIdCounter() public view returns (uint) {
        return _tokenIdCounter;
    }

    function getTokenCreatorById(uint tokenId) public view returns (address) {
        return _creators[tokenId];
    }

    function getTokensOwnedByMe() public view returns (uint[] memory) {
        uint ownedTokenCount = balanceOf(msg.sender);
        uint[] memory ownedTokenIds = new uint[](ownedTokenCount);

        uint currentIndex = 0;
        for (uint i = 1; i <= _tokenIdCounter; i++) {
            if (ownerOf(i) == msg.sender) {
                ownedTokenIds[currentIndex] = i;
                currentIndex++;
            }
        }

        return ownedTokenIds;
    }

    function getTokensCreatedByMe() public view returns (uint[] memory) {
        uint createdTokenCount = 0;
        for (uint i = 1; i <= _tokenIdCounter; i++) {
            if (_creators[i] == msg.sender) {
                createdTokenCount++;
            }
        }

        uint[] memory createdTokenIds = new uint[](createdTokenCount);
        uint currentIndex = 0;
        for (uint i = 1; i <= _tokenIdCounter; i++) {
            if (_creators[i] == msg.sender) {
                createdTokenIds[currentIndex] = i;
                currentIndex++;
            }
        }

        return createdTokenIds;
    }
}

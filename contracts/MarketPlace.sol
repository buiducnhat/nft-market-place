// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./NFT.sol";

error NotMarketPlaceOwner();
error NotTokenOwner();
error TokenAlreadyListed();
error MarketItemNotListed();
error MarketItemAlreadyListed();
error BuyOwnedMarketItem();
error NotMarketItemSeller();
error PriceNotMet();
error ListingFeeNotMet();
error InsufficientBalance();

/// @custom:security-contact buiducnhat47@gmail.com
contract MarketPlace is ReentrancyGuard {
    struct MarketItem {
        uint id;
        address nftAddress;
        uint tokenId;
        uint price;
        address creator;
        address seller;
        bool isListing;
    }

    address payable _owner;
    uint private _listingFee;
    uint private _marketItemCounter;
    uint private _listingMarketItemsCounter;
    mapping(uint256 => MarketItem) private _idToMarketItem;

    event MarketItemCreated(
        uint indexed id,
        address indexed nftAddress,
        uint indexed tokenId,
        uint price,
        address creator,
        address seller
    );

    event MarketItemBought(
        uint indexed id,
        address indexed nftAddress,
        uint indexed tokenId,
        uint price,
        address buyer,
        address seller
    );

    modifier onlyMarketPlaceOwner() {
        if (msg.sender != _owner) {
            revert NotMarketPlaceOwner();
        }
        _;
    }

    modifier onlyListingMarketItem(uint marketItemId) {
        if (!_idToMarketItem[marketItemId].isListing) {
            revert MarketItemNotListed();
        }
        _;
    }

    modifier onlyTokenOwner(
        address nftAddress,
        uint tokenId,
        address sender
    ) {
        IERC721 nft = IERC721(nftAddress);
        if (nft.ownerOf(tokenId) != sender) {
            revert NotTokenOwner();
        }
        _;
    }

    modifier onlyMarketItemSeller(uint marketItemId) {
        MarketItem memory item = _idToMarketItem[marketItemId];
        if (item.seller != msg.sender) {
            revert NotMarketItemSeller();
        }
        _;
    }

    constructor() {
        _owner = payable(msg.sender);
        _listingFee = 0 ether;
        _marketItemCounter = 0;
        _listingMarketItemsCounter = 0;
    }

    function setListingFee(uint listingFee) external onlyMarketPlaceOwner {
        _listingFee = listingFee;
    }

    function getListingFee() external view returns (uint) {
        return _listingFee;
    }

    function getListingMarketItems()
        external
        view
        returns (MarketItem[] memory)
    {
        uint listingItemIndex = 0;
        MarketItem[] memory listingMarketItems = new MarketItem[](
            _listingMarketItemsCounter
        );
        for (uint i = _marketItemCounter; i > 0; i--) {
            if (_idToMarketItem[i].isListing) {
                listingMarketItems[listingItemIndex] = _idToMarketItem[i];
                listingItemIndex++;
            }
        }

        return listingMarketItems;
    }

    function getMyMarketItems() external view returns (MarketItem[] memory) {
        uint myMarketItemsCount = 0;
        for (uint i = 1; i <= _marketItemCounter; i++) {
            if (_idToMarketItem[i].seller == msg.sender) {
                myMarketItemsCount++;
            }
        }

        MarketItem[] memory myMarketItems = new MarketItem[](
            myMarketItemsCount
        );
        uint currentIndex = 0;
        for (uint i = 1; i <= _marketItemCounter; i++) {
            if (_idToMarketItem[i].seller == msg.sender) {
                myMarketItems[currentIndex] = _idToMarketItem[i];
                currentIndex++;
            }
        }

        return myMarketItems;
    }

    function getMarketItemById(
        uint marketItemId
    ) external view returns (MarketItem memory) {
        return _idToMarketItem[marketItemId];
    }

    function getMarketItemCounter() external view returns (uint) {
        return _marketItemCounter;
    }

    function getListingMarketItemsCounter() external view returns (uint) {
        return _listingMarketItemsCounter;
    }

    function listMarketItem(
        address nftAddress,
        uint tokenId,
        uint price
    )
        external
        payable
        nonReentrant
        onlyTokenOwner(nftAddress, tokenId, msg.sender)
    {
        uint newMarkteItemId = _marketItemCounter + 1;

        // Check listing fee
        if (msg.value != _listingFee) {
            revert ListingFeeNotMet();
        }

        // Check if token is already listed
        for (uint i = 1; i <= _marketItemCounter; i++) {
            if (
                _idToMarketItem[i].nftAddress == nftAddress &&
                _idToMarketItem[i].tokenId == tokenId
            ) {
                revert TokenAlreadyListed();
            }
        }

        // Create MarketItem
        address creator = NFT(nftAddress).getTokenCreatorById(tokenId);
        _idToMarketItem[newMarkteItemId] = MarketItem(
            newMarkteItemId,
            nftAddress,
            tokenId,
            price,
            creator,
            msg.sender,
            true
        );

        // Increase counters
        _marketItemCounter++;
        _listingMarketItemsCounter++;

        emit MarketItemCreated(
            newMarkteItemId,
            nftAddress,
            tokenId,
            price,
            creator,
            msg.sender
        );
    }

    function updateMarketItem(
        uint marketItemId,
        uint price
    ) external nonReentrant onlyMarketItemSeller(marketItemId) {
        // Update price
        _idToMarketItem[marketItemId].price = price;
    }

    function cancelMarketItem(
        uint marketItemId
    ) external nonReentrant onlyMarketItemSeller(marketItemId) {
        // Update MarketItem to not listing
        _idToMarketItem[marketItemId].isListing = false;
        _idToMarketItem[marketItemId].price = 0;

        // Decrease counters
        _listingMarketItemsCounter--;
    }

    function reListMarketItem(
        uint marketItemId,
        uint price
    ) external nonReentrant onlyMarketItemSeller(marketItemId) {
        MarketItem memory item = _idToMarketItem[marketItemId];

        // Check conditions
        if (item.isListing) {
            revert MarketItemAlreadyListed();
        }

        // Update MarketItem to listing
        _idToMarketItem[marketItemId].isListing = true;
        _idToMarketItem[marketItemId].price = price;

        // Increase counters
        _listingMarketItemsCounter++;
    }

    function buyMarketItem(
        uint marketItemId
    ) external payable nonReentrant onlyListingMarketItem(marketItemId) {
        MarketItem memory marketItem = _idToMarketItem[marketItemId];

        // Check conditions
        if (msg.value != marketItem.price) {
            revert PriceNotMet();
        }
        if (marketItem.seller == msg.sender) {
            revert BuyOwnedMarketItem();
        }

        // Transfer token to buyer
        IERC721 nft = IERC721(marketItem.nftAddress);
        nft.safeTransferFrom(marketItem.seller, msg.sender, marketItem.tokenId);

        // Transfer market item to seller, set listing to false
        _idToMarketItem[marketItemId].seller = msg.sender;
        _idToMarketItem[marketItemId].price = 0;
        _idToMarketItem[marketItemId].isListing = false;

        // Transfer money to seller
        payable(marketItem.seller).transfer(msg.value);

        // Decrease counters
        _listingMarketItemsCounter--;

        emit MarketItemBought(
            marketItemId,
            marketItem.nftAddress,
            marketItem.tokenId,
            marketItem.price,
            msg.sender,
            marketItem.seller
        );
    }
}

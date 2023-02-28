// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MembershipNFT is ERC721 {

    uint256 public tokenCount;

    constructor() ERC721("Membership NFT", "MNFT") {}

    function mint(address to) public returns(uint256){
        tokenCount = tokenCount + 1;
        _safeMint(to, tokenCount);
        return tokenCount;
    }
    
    function burnNft(uint256 tokenId) public { 
        _burn(tokenId);
    }
    
    function transferNft(address from, address to, uint256 tokenId) public returns(uint256) { 
        // safeTransferFrom(from, to, tokenId);
        _transfer(from, to, tokenId);
        return tokenCount;   // return current NFT Id transferred.  
    }

    function returnCurrentNftId() view public returns(uint256) {
        return tokenCount;
    }

    function getOwnerOf(uint256 tokenId) view public returns(address) {
        return ownerOf(tokenId);
    }
}
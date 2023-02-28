// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./DataDAO.sol";
import "../openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DataDAOExample is DataDAO {

    IERC721 public membershipNFT;

    mapping(bytes => mapping(address => uint256)) public fundings;
    mapping(bytes => uint256) public dealStorageFees;
    mapping(bytes => uint64) public dealClient;

    constructor(address[] memory admins, address _membershipNFT) DataDAO(admins) {
        membershipNFT = IERC721(_membershipNFT);
    }

    /// @dev Check if user is a DAO member.
    function isDAOMember() public view returns(bool) {
        if (membershipNFT.balanceOf(msg.sender) > 0) {
            return true;
        } else {
            return false;
        }
    }
}


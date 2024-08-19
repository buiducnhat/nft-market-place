// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract TestTransfer {
    function sendEther(address payable _to) public payable {
        _to.transfer(msg.value);
    }
}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Game {
    error Game__AlreadyEntered();
    error Game__SpaceTaken();

    address public immutable owner;
    uint256 public maxspace = 15;
    address[] public players;
    mapping(uint => bool) public isDestroy;
    mapping(address => bool) public isPlayer;
    mapping(uint => address) public playerID;
    bool gameOver;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function signUp(uint id) public {
        if (isPlayer[msg.sender]) {
            revert Game__AlreadyEntered();
        }
        if (playerID[id] != address(0)){
            revert Game__SpaceTaken();
        }

        playerID[id] = msg.sender;
        isPlayer[msg.sender] = true;
        players.push(msg.sender);
    }

    function destorySpace(uint id) public {
        isDestroy[id] = true;

        if (playerID[id] != address(0)) {
            removePlayer(playerID[id]);
        }
        
        if (players.length == 1) {
            gameOver = true;
        }
    }

    function removePlayer(address tragetPlayer) internal returns (bool){
        for (uint i = 0; i < players.length; i++) {
            if (players[i] == tragetPlayer) {
                players[i] = players[players.length - 1];
                players.pop();
                return true;
            }
        }
        return false;
    }

    function getPlayers() public view returns (address[] memory){
        return players;
    }

}

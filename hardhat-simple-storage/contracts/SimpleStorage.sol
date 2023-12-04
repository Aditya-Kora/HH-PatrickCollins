// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    // boolean,uint, int, address, bytes
    uint256 favoriteNumber; //It will get initiasied to 0

    struct People {
        uint256 favoriteNumber;
        string Name;
    }

    mapping(string => uint256) public nameToFavoriteNumber;
    People[] public people;

    function store(uint _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addperson(string memory _name, uint256 _favoritenumber) public {
        People memory newperson = People({
            favoriteNumber: _favoritenumber,
            Name: _name
        });
        people.push(newperson);
        nameToFavoriteNumber[_name] = _favoritenumber;
    }
}

// address of the deployed contract 0xd9145CCE52D386f254917e481eB44e9943F39138

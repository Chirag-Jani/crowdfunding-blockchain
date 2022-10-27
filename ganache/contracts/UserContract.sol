// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserContract {
    // for user profile creation
    struct UserProfileStruct {
        address userAddress;
        string userName;
        string userEmail;
        uint256 userIndex;
    }

    // instance of the struct
    UserProfileStruct instanceOfUserProfileStruct;

    // instance of the struct to handle logged in user
    UserProfileStruct loggedInUser;

    // to collect all the user profile
    UserProfileStruct[] users;

    // to get user from address
    mapping(address => UserProfileStruct) getUserFromAddress;

    // to handle index of users
    uint256 userIndex = 0;

    // to get user from index
    mapping(uint256 => UserProfileStruct) getUserFromIndex;

    // to log in the users
    mapping(address => bool) userExist;

    // to sign user up
    function register(
        address _userAddress,
        string memory _userName,
        string memory _userEmail
    ) public {
        // these 3 params will be based on user's input
        instanceOfUserProfileStruct.userAddress = _userAddress;
        instanceOfUserProfileStruct.userName = _userName;
        instanceOfUserProfileStruct.userEmail = _userEmail;

        // we are going to user whatever the current index is
        instanceOfUserProfileStruct.userIndex = userIndex;

        // adding to the users array
        users.push(instanceOfUserProfileStruct);

        // adding to the mappings
        // to get from address
        getUserFromAddress[_userAddress] = instanceOfUserProfileStruct;

        // to get from index
        getUserFromIndex[userIndex] = instanceOfUserProfileStruct;

        // to let user log in latter
        userExist[_userAddress] = true;

        // incrementing index
        userIndex++;
    }

    // to find if user exist or not - used to login
    function login(address _userAddress) public returns (bool ans) {
        require(userExist[_userAddress] == true, "User does not exist");
        loggedInUser = getUserFromAddress[_userAddress];
        return true;
    }

    // to get user
    function findUser(address _userAddress)
        public
        view
        returns (UserProfileStruct memory)
    {
        return getUserFromAddress[_userAddress];
    }

    // to get all the user
    function getUsers() public view returns (UserProfileStruct[] memory) {
        return users;
    }
}

// contract started 26 October, 10:37 pm

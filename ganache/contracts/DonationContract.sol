// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DonationContract {
    // struct of donator
    struct DonatorStruct {
        address donatorAddress;
        uint256 donatedAmount;
    }

    // instance of donnator struct
    DonatorStruct instanceOfDonator;

    // struct of donation
    struct DonationStruct {
        address payable postCreator;
        string postText;
        string postDate;
        uint256 requestedAmount;
        uint256 receivedAmount;
        DonatorStruct[] donators;
        uint256 postIndex;
    }

    // instance of PostStruct
    DonationStruct instanceOfPostStruct;

    // finished donations
    DonationStruct[] finishedDonations;

    // ongoing donations
    DonationStruct[] ongoingDonations;

    // to get ongoing post from index
    uint256 ongoingIndex = 0;

    // to get finished post from index
    uint256 finishedIndex = 0;

    // to create post
    function createPost(
        address payable _postCreator,
        string memory _postText,
        string memory _postDate,
        uint256 _requestedAmount
    ) public {
        // requested amount can not be zero
        require(_requestedAmount != 0, "Requested amount can not be zero");

        // text can not be zero
        require(bytes(_postText).length != 0, "You have to add post text");

        // setting instance
        instanceOfPostStruct.postCreator = payable(_postCreator);
        instanceOfPostStruct.postText = _postText;
        instanceOfPostStruct.postDate = _postDate;
        instanceOfPostStruct.requestedAmount = _requestedAmount;

        // adding defaults
        instanceOfPostStruct.receivedAmount = 0;

        // donators array will be empty by default

        // setting index of the post
        instanceOfPostStruct.postIndex = ongoingIndex;

        // adding to ongoing donations
        ongoingDonations.push(instanceOfPostStruct);

        // incrementing for next post
        ongoingIndex++;
    }

    // to get all donations
    function getDonations(bool ongoing)
        public
        view
        returns (DonationStruct[] memory)
    {
        if (ongoing) {
            return ongoingDonations;
        }
        return finishedDonations;
    }

    // to get single donation from index
    function getSingleDonation(uint256 index, bool ongoing)
        public
        view
        returns (DonationStruct memory)
    {
        if (ongoing) {
            return ongoingDonations[index];
        }
        return finishedDonations[index];
    }

    // to get donators
    function getDonatorsOfPost(uint256 index, bool ongoing)
        public
        view
        returns (DonatorStruct[] memory)
    {
        if (ongoing) {
            return ongoingDonations[index].donators;
        }
        return finishedDonations[index].donators;
    }

    // donate function
    function donate(
        uint256 index,
        uint256 amount,
        address donatorAddress
    ) public payable {
        // amount can not be greater than needed
        require(
            amount <=
                ongoingDonations[index].requestedAmount -
                    ongoingDonations[index].receivedAmount,
            "Can not send extra"
        );

        // send eth
        // (bool sent, bytes memory data) = ongoingDonations[index]
        //     .postCreator
        //     .call{value: amount / 1 ether}("");
        // require(sent, "Failed to send Ether");

        ongoingDonations[index].postCreator.transfer(amount);

        // update donators
        instanceOfDonator.donatorAddress = donatorAddress;
        instanceOfDonator.donatedAmount = amount;

        // adding donator
        ongoingDonations[index].donators.push(instanceOfDonator);

        // update recieved amount
        ongoingDonations[index].receivedAmount += amount;

        // move donation post to finished donations if requested == recieved amount
        if (
            ongoingDonations[index].requestedAmount ==
            ongoingDonations[index].receivedAmount
        ) {
            // setting index
            ongoingDonations[index].postIndex = finishedIndex;

            // pushing to finished
            finishedDonations.push(ongoingDonations[index]);

            // incrementing for next one
            finishedIndex++;

            // remove donation post from ongoing
            ongoingDonations[index] = ongoingDonations[
                ongoingDonations.length - 1
            ];
            ongoingDonations.pop();

            // decrementing index for next post because one post is removed
            ongoingIndex--; // currntly commented out because it may cause some issues
        }
    }
}

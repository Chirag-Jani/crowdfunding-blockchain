import web3 from "./Web3";

const userContract = require("./build/UserContract.json");
const donationContract = require("./build/DonationContract.json");

const deployedDonation = "0x8Fa493f3229ABCb4d8dD67bBb22A72CE6c62f77d";
const deployedUser = "0xBBCD9100d3Cf7B7C1ca82ED2EeEd2bCDE99Dc850";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

import web3 from "./Web3";

const userContract = require("./build/UserContract.json");
const donationContract = require("./build/DonationContract.json");

const deployedDonation = "0x4C407973BFcc631767d8CD97Afe0ECebF32f7fcf";
const deployedUser = "0x56943d9e033ACeCba57C7f7eb72BAC91C396E7E6";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

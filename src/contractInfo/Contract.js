import web3 from "./Web3";

const userContract = require("./build/UserContract.json");
const donationContract = require("./build/DonationContract.json");

const deployedDonation = "0xb612C5a23273AE348408fa34680f9c5c60793166";
const deployedUser = "0x162CE76972c95C9889203433E5051fc5D5F5c071";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

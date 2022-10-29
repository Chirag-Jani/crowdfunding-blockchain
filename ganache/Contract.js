import web3 from "./Web3";

const userContract = require("./build/UserContract.json");
const donationContract = require("./build/DonationContract.json");

const deployedDonation = "0x8AE493e9f2712926Fa4C24dc02036c0726D62D92";
const deployedUser = "0x643d5Ef07689e3fF056f96F906678700B6E1C02C";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

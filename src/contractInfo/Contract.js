import web3 from "./Web3";

const userContract = require("./UserContract.json");
const donationContract = require("./DonationContract.json");

const deployedDonation = "0xbB1d0bE6fcc3554BD8c22218CD814096D0F8eCEe";
const deployedUser = "0x4820A2fC343F5E0B41C0c7BAe46c0A04235d82aa";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

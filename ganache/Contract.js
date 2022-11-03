import web3 from "./Web3";

const userContract = require("./build/UserContract.json");
const donationContract = require("./build/DonationContract.json");

const deployedDonation = "0xe01e6235AA006B2Db4d0Bf4337064a536671E236";
const deployedUser = "0xE172c099C3198f1950801Fa6071b13257570BcCd";

const userWeb3Contract = new web3.eth.Contract(userContract.abi, deployedUser);

const donationWeb3Contract = new web3.eth.Contract(
  donationContract.abi,
  deployedDonation
);

export { userWeb3Contract, donationWeb3Contract };

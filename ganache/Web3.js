import Web3 from "web3";

let web3;
try {
  //We are on server

  // const provider = new HDWalletProvider(
  //   "arch piece seat curtain fitness tunnel oblige upper news execute lesson bounce",
  //   "https://goerli.infura.io/v3/1941fd7646334257ac0c71b8230447d2"
  // );

  // Ganache running on port 8545
  web3 = new Web3("http://localhost:8545");
} catch (err) {
  console.log(err.message);
}

export default web3;

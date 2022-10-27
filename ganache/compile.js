const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

contractPath = path.resolve(__dirname, "contracts", "UserContract.sol");
contractSource = fs.readFileSync(contractPath, "utf-8");

input = {
  language: "Solidity",
  sources: {
    "UserContract.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["UserContract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["UserContract.sol"][contract]
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

contractPath = path.resolve(__dirname, "contracts", "DonationContract.sol");
contractSource = fs.readFileSync(contractPath, "utf-8");

input = {
  language: "Solidity",
  sources: {
    "DonationContract.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["DonationContract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["DonationContract.sol"][contract]
  );
}

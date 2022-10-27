import React from "react";
import Home from "./components/Home";
import {
  userWeb3Contract as User,
  donationWeb3Contract as Donation,
} from "./contractInfo/Contract";

const App = () => {
  // to get methods from donation contract
  const getDonationMethods = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const donatinoMethods = await Donation.methods;
      console.log(donatinoMethods);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getUserMethods = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const userMethods = await User.methods;
      console.log(userMethods);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-primary m-5" onClick={getDonationMethods}>
        Get Donation Contract Methods
      </button>
      <button className="btn btn-primary m-5" onClick={getUserMethods}>
        Get Donation Contract Methods
      </button>
      <Home />
    </div>
  );
};

export default App;

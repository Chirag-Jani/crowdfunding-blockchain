// * React Utilities
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Components
import Auth from "./components/Auth";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

// * Contract Import
import {
  userWeb3Contract as User,
  donationWeb3Contract as Donation,
} from "./contractInfo/Contract";

const App = () => {
  // ! the below two are just temporary
  // * to get methods from donation contract
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

  // * to get methods from user contract
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

  // ! DONATION CONTRACT INTERACTION

  // * state to handle ongoing donations
  const [ongoingFunds, setOngoingFunds] = useState([
    {
      creator: "0x0000000000000",
      description: "this is the desc of the post",
      date: Date(),
      requestedAmount: 14,
      receivedAmount: 5,
      donators: [
        {
          donatorName: "one",
          donatedAmount: 3,
        },
        {
          donatorName: "two",
          donatedAmount: 2,
        },
      ],
      index: 0,
    },
  ]);

  // ! USER CONTRACT INTERACTION

  // * to toggle login and signup page without creating different components for both
  const [loginPage, setLoginPage] = useState(true);

  // * to check if user is logged in or not
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // ? LOG IN SHIT

  // * state to handle user input while trying to login
  const [userAddress, setUserAddress] = useState("");

  // * handler function to set userAddress on user's input
  // ? currently disabled because login using metamask is working fine
  // const userLoginInput = (e) => {
  //   setUserAddress(e.target.value);
  //   console.log(userAddress);
  // };

  // * to toggle page (from login to sign up and vice versa)
  const toggleLoginPage = (e) => {
    e.preventDefault();
    setLoginPage(!loginPage);
  };

  // * to manage state of logged in user
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    address: "",
    name: "",
    email: "",
  });

  // ! Login the user
  const login = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // * calling login function
      const loginOrNOt = await User.methods
        .login(userAddress)
        .call({ from: accounts[0], gas: 20000000 });
      setUserLoggedIn(true);
      alert("Login successfull");

      // * getting the user to set up profile info

      const findUser = await User.methods
        .findUser(userAddress)
        .call({ from: accounts[0], gas: 20000000 });

      setLoggedInUserInfo({
        address: findUser.userAddress,
        name: findUser.userName,
        email: findUser.userEmail,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // ? SIGN UP SHIT

  // * state to manage user's input while sign up
  const [signupInfo, setSignupInfo] = useState({
    userAddress: "",
    userName: "",
    userEmail: "",
  });

  // * to handle user's input while signup
  const getSignUpInfo = async (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  // * to signup the user
  const signUp = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // * calling signup function
      const signUpUser = await User.methods
        .register(
          signupInfo.userAddress,
          signupInfo.userName,
          signupInfo.userEmail
        )
        .send({ from: accounts[0], gas: 20000000 });
      console.log("SignUp Successful");
    } catch (error) {
      console.error(error.message);
    }
  };

  // ! useEffect to setAddress
  useEffect(() => {
    const getAccout = async () => {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      // * for signup
      setSignupInfo({ userAddress: accounts[0] });
      // * for login
      setUserAddress(accounts[0]);
    };
    getAccout();
    window.ethereum.on("accountsChanged", function (accounts) {
      // * for signup
      setSignupInfo({ userAddress: accounts[0] });
      // * for login
      setUserAddress(accounts[0]);
    });
  }, []);

  return (
    <Router>
      <div>
        <button className="btn btn-primary m-5" onClick={getDonationMethods}>
          Get Donation Contract Methods
        </button>
        <button className="btn btn-primary m-5" onClick={getUserMethods}>
          Get Donation Contract Methods
        </button>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home ongoingFunds={ongoingFunds} />} />
          <Route
            path="/auth"
            element={
              <Auth
                loginPage={loginPage}
                toggleLoginPage={toggleLoginPage}
                // * for login
                userAddress={userAddress}
                // userLoginInput={userLoginInput} // ? disabled because we are using login using metamask
                login={login}
                // * for signup
                signupInfo={signupInfo}
                getSignUpInfo={getSignUpInfo}
                signUp={signUp}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                loggedInUserInfo={loggedInUserInfo}
                userLoggedIn={userLoggedIn}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

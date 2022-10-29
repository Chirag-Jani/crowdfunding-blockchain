// ! TODO: We should not show user's address on the post as people can log in using that - instead find user using the address and show name of that user
// todo: donate ethers - sending 0 ethers right now though gas gets deducted from the account
// todo: while taking amount input, every post's donation input is being handled, need to do that individually
// todo: decimal input
// todo: render finished donations on homepage
// todo: show user's requests (both ongoing and finished) on profile page - need to write in contract first

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
  // ! DONATION CONTRACT INTERACTION

  // * state to handle ongoing donations
  const [ongoingFunds, setOngoingFunds] = useState([]);

  // * state to handle finished donations
  const [finishedFunds, setFinishedFunds] = useState([]);

  // ? posting a donation request

  // * state to manage user's input
  const [requestInfo, setRequestInfo] = useState({
    requestText: "",
    requestedAmount: 0,
  });

  // * handler function to take user's input
  const handleRequestInput = (e) => {
    const { name, value } = e.target;
    setRequestInfo({ ...requestInfo, [name]: value });
  };

  // * request function
  const createPost = async () => {
    // * assiging values to variable to make it more readable while passing to function
    let postCreator = loggedInUserInfo.address;
    let postText = requestInfo.requestText;
    let postDate = Date();
    let requestedAmount = requestInfo.requestedAmount;

    try {
      // * getting account
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // * calling function to add post
      const createPost = await Donation.methods
        .createPost(postCreator, postText, postDate, requestedAmount)
        .send({ from: accounts[0], gas: 20000000 });

      // * getting ongoingFunds
      const updatedOngoingFunds = await Donation.methods
        .getDonations(true)
        .call({ from: accounts[0], gas: 20000000 });

      // * updating array of ongoing donations
      setOngoingFunds(updatedOngoingFunds);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [donationAmount, setDonationAmount] = useState("");

  const donationAmountInput = (e) => {
    setDonationAmount(e.target.value);
  };

  // ! Donate ethers - calling function
  const donate = async (index) => {
    try {
      // * getting accoounts
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const getPost = await Donation.methods
        .getSingleDonation(index, true)
        .call({ from: accounts[0], gas: 20000000 });

      console.log(getPost);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // * calling donate
      const sendFunds = await Donation.methods
        .donate(index, donationAmount, accounts[0])
        .send({ from: accounts[0], to: getPost.postCreator, gas: 20000000 });

      //
      const getDonators = await Donation.methods
        .getDonatorsOfPost(index, true)
        .call({ from: accounts[0], gas: 20000000 });
      console.log(getDonators);
    } catch (error) {
      console.error(error.message);
    }
  };

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
      // * getting accounts
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // * calling login function
      const loginOrNOt = await User.methods
        .login(userAddress)
        .call({ from: accounts[0], gas: 20000000 });
      setUserLoggedIn(true);
      // alert("Login successfull");

      // * getting the user to set up profile info
      const findUser = await User.methods
        .findUser(userAddress)
        .call({ from: accounts[0], gas: 20000000 });

      // * setting logged in user info to show on profile
      setLoggedInUserInfo({
        address: findUser.userAddress,
        name: findUser.userName,
        email: findUser.userEmail,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // * to logout the user
  const logout = async () => {
    setUserLoggedIn(false);
    alert("User logged out");
    setLoggedInUserInfo({
      address: "",
      name: "",
      email: "",
    });
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
      setSignupInfo({
        userAddress: "",
        userName: "",
        userEmail: "",
      });
      alert("SignUp Successful");
      setLoginPage(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // ! useEffect to setAddress
  useEffect(() => {
    //  * to get account
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

    // * to handle account change
    window.ethereum.on("accountsChanged", function (accounts) {
      // * for signup
      setSignupInfo({ userAddress: accounts[0] });
      // * for login
      setUserAddress(accounts[0]);
    });

    // * to get donations
    const getFunds = async () => {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      // * onGoing
      const updatedOngoingFunds = await Donation.methods
        .getDonations(true)
        .call({ from: accounts[0], gas: 20000000 });

      // * updating array of ongoing donations
      setOngoingFunds(updatedOngoingFunds);
      // * finished
      const updatedFinishedFunds = await Donation.methods
        .getDonations(false)
        .call({ from: accounts[0], gas: 20000000 });

      // * updating array of ongoing donations
      setFinishedFunds(updatedFinishedFunds);
    };
    getFunds();
  }, []);

  return (
    <Router>
      <Navbar
        // * to render Login or Logout element
        userLoggedIn={userLoggedIn}
        // * to call the logout function
        logout={logout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              // * to render ongoing funds
              ongoingFunds={ongoingFunds}
              // * to render finished funds
              finishedFunds={finishedFunds}
              //
              donationAmount={donationAmount}
              donationAmountInput={donationAmountInput}
              // * donating funds
              donate={donate}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <Auth
              // * to check which page to load (loginPage = true then log in page else sign up page)
              loginPage={loginPage}
              // * to toggle between login and signup pages
              toggleLoginPage={toggleLoginPage}
              // * for login
              userAddress={userAddress}
              // userLoginInput={userLoginInput} // ? disabled because we are using login using metamask
              // * login function
              login={login}
              // * for values in input fields
              signupInfo={signupInfo}
              // * to handle user's input
              getSignUpInfo={getSignUpInfo}
              // * signup funciton
              signUp={signUp}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              // * to render loggedin user's info
              loggedInUserInfo={loggedInUserInfo}
              // * to check if user is logged in or not
              userLoggedIn={userLoggedIn}
              // * to get values in input fields
              requestInfo={requestInfo}
              // * handling user's input
              handleRequestInput={handleRequestInput}
              // * calling create post funciton
              createPost={createPost}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

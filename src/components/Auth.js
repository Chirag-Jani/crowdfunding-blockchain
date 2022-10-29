import React from "react";
import { Link } from "react-router-dom";

function Auth(props) {
  const {
    loginPage,
    toggleLoginPage,
    // userAddress,
    // userLoginInput,
    login,
    signupInfo,
    getSignUpInfo,
    signUp,
  } = props;

  // ? if user wants to log in
  if (loginPage) {
    return (
      <div>
        <div className="container w-50 my-5">
          <h2 className="mt-0 mb-3">Login Your Account</h2>
          <div className="mb-3">
            {/* As we are using metamask to get address this field is disabled */}
            {/* <label className="form-label">Wallet Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="0x...000"
              value={userAddress}
              onChange={userLoginInput}
              disabled={true}
            /> */}
          </div>
          {/*  temporary Link use karyu che home page par login pachi redirect karva */}
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={login}>
              Login using Metamask
            </button>
          </Link>
          <p className="mt-2">
            Don't have an account?{" "}
            <a href="#" onClick={toggleLoginPage}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  }

  // If user wants to sign up
  else {
    return (
      <div>
        <div className="container w-50 my-5">
          <h2 className="mt-0 mb-3">Sign Up now</h2>
          <div className="mb-3">
            <label className="form-label">
              Wallet Address will be taken from MetaMask
            </label>
            {/* As we are using metamask to get address this field is disabled */}
            {/* <input
              type="text"
              className="form-control"
              placeholder="0x...000"
              name="userAddress"
              value={signupInfo.userAddress}
              onChange={(e) => getSignUpInfo(e)}
              disabled={true}
            /> */}
          </div>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="userName"
              value={signupInfo.userName}
              onChange={(e) => getSignUpInfo(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Email"
              name="userEmail"
              value={signupInfo.userEmail}
              onChange={(e) => getSignUpInfo(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={signUp}>
            Signup
          </button>
          <p className="mt-2">
            Already have an account?{" "}
            <a href="#" onClick={toggleLoginPage}>
              Log in
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Auth;

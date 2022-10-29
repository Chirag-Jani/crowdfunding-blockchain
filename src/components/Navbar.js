import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { userLoggedIn, logout } = props;

  // * to render login or logout field based on the condition of user logged in or not
  const renderAuthButton = () => {
    if (userLoggedIn) {
      return (
        <ul className="navbar-nav mb-2 mx-3 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active fs-5"
              aria-current="page"
              to="/auth"
              onClick={logout}
            >
              <u>Logout</u>
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mb-2 mx-3 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active fs-5"
              aria-current="page"
              to="/auth"
            >
              <u>Login / Register</u>
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <div>
      <nav className="navbar  navbar-dark bg-dark">
        {/* navbar-expand-lg removed from classname */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FundUsingWeb3
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div className="d-flex" id="navbarSupportedContent">
            {/* collapse navbar-collapse removed from classname */}
            <ul className="navbar-nav mb-2 mx-3 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 active"
                  aria-current="page"
                  to="/"
                >
                  <u>Home</u>
                </Link>
              </li>
            </ul>
            {/* rendering login or logout from the function written above */}
            {renderAuthButton()}
            <ul className="navbar-nav mb-2 mx-3 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/profile"
                >
                  <u>Profile</u>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import React, { useState } from "react";

function Home(props) {
  const { ongoingFunds, donationAmount, donationAmountInput, donate } = props;

  const [showDonators, setShowDonators] = useState({
    buttonText: "Show",
    default: false,
  });

  const getDonators = (post) => {
    if (showDonators.default) {
      return post.donators.map((donator, index) => {
        return (
          <div className="border border-dark rounded my-3 p-2" key={index}>
            <p>
              <strong>
                Donator {index + 1} Name: <br />{" "}
              </strong>
              {donator.donatorAddress}
            </p>
            <p>
              <strong>
                Donator {index + 1} Amount: <br />
              </strong>
              {donator.donatedAmount} Ethers
            </p>
          </div>
        );
      });
    }
  };

  const returnDonators = (post) => {
    if (post.donators.length != 0) {
      return (
        <div className="my-1 py-1">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (showDonators.buttonText == "Show") {
                setShowDonators({
                  buttonText: "Hide",
                  default: true,
                });
              } else {
                setShowDonators({
                  buttonText: "Show",
                  default: false,
                });
              }
            }}
          >
            {showDonators.buttonText} Donators
          </button>
          {getDonators(post)}
        </div>
      );
    } else {
      return <p className="my-1 py-2">Be The first one to donate!!</p>;
    }
  };

  return (
    <div className="container-fluid my-5">
      <h1 className="text-center m-3">This is the list of Ongoing Donations</h1>
      {/* Nothing much - just mapping through the array and rendering each post */}
      <div className="d-flex justify-content-around flex-wrap">
        {ongoingFunds.map((post, index) => {
          return (
            <div
              className="text-start border border-dark border-3 rounded p-4 m-2"
              key={index}
              style={{ height: "fit-content" }}
            >
              <span className="d-flex justify-content-between">
                <p>
                  <strong> Creator:</strong>
                  <br />
                  {post.postCreator.slice(0, 7)}...
                  {post.postCreator.slice(35, 42)}
                </p>
                <p>
                  <strong> Date of Post:</strong>
                  <br />
                  {post.postDate.slice(0, 15)}
                </p>
              </span>
              <p>
                <strong> Description:</strong>
                <br />
                {post.postText}
              </p>
              <p>
                <strong> Requested Amount:</strong>
                <br />
                {post.requestedAmount} Ethers
              </p>
              <p>
                <strong> Received Amount:</strong>
                <br />
                {post.receivedAmount} Ethers
              </p>
              <span>
                <strong> Donators: </strong>
                {returnDonators(post)}
              </span>
              <input
                type="text"
                placeholder="Enter Ethers"
                className="me-3 text-center p-2 border border-dark rounded w-50 fw-bold"
                value={donationAmount}
                onChange={donationAmountInput}
              />
              <button
                className="btn btn-success"
                onClick={() => {
                  donate(post.postIndex);
                }}
              >
                Donate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

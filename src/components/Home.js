import React from "react";

function Home(props) {
  const { ongoingFunds } = props;

  // * to render donators based on condition
  const donators = (post) => {
    if (post.donators.length) {
      post.donators.map((donator, index) => {
        return (
          <div className="border border-dark rounded my-3 p-2" key={index}>
            <p>
              <strong>
                Donator {index + 1} Name: <br />{" "}
              </strong>
              {donator.donatorName}
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
    } else {
      return (
        <div>
          <p>No Donations Yet</p>
        </div>
      );
    }
  };
  return (
    <div className="container-fluid my-5">
      <h1 className="text-center m-3">This is the list of Ongoing Donations</h1>
      {/* Nothing much - just mapping through the array and rendering each post */}
      {ongoingFunds.map((post, index) => {
        return (
          <div
            className="text-start border border-dark border-3 rounded p-4 m-5"
            key={index}
          >
            <span className="d-flex justify-content-between">
              <p>
                <strong> Creator:</strong>
                <br />
                {post.postCreator.slice(0, 7)}...
                {post.postCreator.slice(35, 42)}
              </p>
              <p>
                <strong> Date:</strong>
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
              {/* rendering donators based on the function written above */}
              {donators(post)}
            </span>
            <input
              type="text"
              placeholder="Enter Amount in Ethers to Donate"
              className="me-3 text-center p-2 border border-dark rounded w-50 fw-bold"
            />
            <button className="btn btn-success">Donate</button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;

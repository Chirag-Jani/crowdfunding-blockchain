import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Profile(props) {
  const {
    userLoggedIn,
    loggedInUserInfo,
    requestInfo,
    handleRequestInput,
    createPost,
  } = props;

  // * to use modal

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // * if user is logged in then we will display it's information
  if (userLoggedIn) {
    return (
      <div className="container text-start m-5">
        <h1>Your Profile</h1>
        <div className="border border-dark p-2">
          <div className="row">
            <div className="col-4 text-end">
              <label>Name:</label>
            </div>
            <div className="col-6">{loggedInUserInfo.name}</div>
          </div>
          <div className="row">
            <div className="col-4 text-end">
              <label>Email:</label>
            </div>
            <div className="col-6">{loggedInUserInfo.email}</div>
          </div>
          <div className="row">
            <div className="col-4 text-end">
              <label>Address:</label>
            </div>
            <div className="col-6">{loggedInUserInfo.address}</div>
          </div>
        </div>
        <div>
          <button className="btn btn-success my-3" onClick={handleShow}>
            Create Post
          </button>

          {/* This modal will be displayed based on condition */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Request a New Fund!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column text-center">
                <input
                  className="m-3 text-center p-2"
                  type="text"
                  placeholder="Reason for the Fund Request!"
                  value={requestInfo.requestText}
                  onChange={(e) => {
                    handleRequestInput(e);
                  }}
                  name="requestText"
                />
                <input
                  className="m-3 text-center p-2"
                  type="number"
                  placeholder="Requested Amount (in Ethers)"
                  value={requestInfo.requestedAmount}
                  onChange={(e) => {
                    handleRequestInput(e);
                  }}
                  name="requestedAmount"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // * here calling to functions | one to create post and other to close the modal
                  createPost(), handleClose();
                }}
              >
                Post
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="my-5">
          <p>Here we will display user's old and ongoing posts</p>
        </div>
      </div>
    );
  }

  // * if user is not logged in then ask him/her to log in
  else {
    return (
      <div className="text-center m-5">
        <h1>
          <Link to="/auth">Log in</Link> to Access Your Profile
        </h1>
      </div>
    );
  }
}

export default Profile;

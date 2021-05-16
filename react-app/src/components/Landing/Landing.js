import React from "react";
import "./Landing.css";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";

export default function Landing() {
  return (
    <div className="landing-div">
      <div className="landing-center">
        <h1>Welcome to muscial affaris</h1>
        <div className="landing-desc">
          <h2>
            Are you ready to meet others that like the same artist as you?
          </h2>
        </div>
        <div className="landing-modals">
          <LoginFormModal />
          or
          <SignUpModal />
          to get started
        </div>
      </div>
    </div>
  );
}

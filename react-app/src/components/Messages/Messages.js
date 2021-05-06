import React from "react";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

const io = require("socket.io-client");
export const privateSocket = io("/messages");

function Messages() {
  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
      <OpenConversation />
    </div>
  );
}

export default Messages;

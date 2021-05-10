import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";

const io = require("socket.io-client");
export const privateSocket = io("/private");

export default function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const [message, setMessage] = useState("");
  console.log("-----", messages);

  useEffect(() => {
    dispatch(getMessages(1, 2));
  }, [dispatch]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Chat</h1>
      {messages?.map((msg) => (
        <p>{msg.message}</p>
      ))}

      <div>
        <form onSubmit={handleChatSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

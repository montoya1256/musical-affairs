
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";

import io from "socket.io-client";
export const privateSocket = io("/private");

export default function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState(messages);
  const [msgObj, setMsgObj] = useState(null);

  useEffect(async () => {
    await dispatch(getMessages(user.sender_id, user.reciever_id));
  }, [dispatch]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      user.message = message;

      privateSocket.emit("private_message", user);
      setMessage("");
    }
  };

  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      console.log("-----------------------");
      setStateMessages((stateMessages) => [...stateMessages, msg]);
    });
  }, []);

  useEffect(() => {
    if (msgObj === null) {
      setStateMessages(messages);
    } else {
      setStateMessages([...stateMessages, msgObj]);
    }
  }, [messages.length, msgObj]);

  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      setMsgObj(msg);
    });
  }, [stateMessages]);

  return (
    <div>
      <h1>Chat</h1>
      {stateMessages?.map((msg, i) => (
        <p key={i}>{msg.message}</p>
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
import React from "react";
import "./Chat.css";

export default function Chat() {
  return (
    <div>
      <h1 style={{ color: "black" }}>CHAT</h1>
    </div>
  );
}

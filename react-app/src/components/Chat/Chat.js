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
  const [stateMessages, setStateMessages] = useState([]);

  useEffect(async () => {
    await dispatch(getMessages(user.sender_id, user.reciever_id));
  }, [dispatch]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      const msg = {
        message,
        sender_id: user.id,
        reciever_id: 2,
        roomId: 1,
      };
      privateSocket.emit("private_message", msg);
    }
    setMessage("");
  };

  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      console.log("-----------------------");
      setStateMessages((stateMessages) => [...stateMessages, msg]);
    });
  }, []);

  useEffect(() => {
    setStateMessages(messages);
  }, [messages]);

  console.log(stateMessages);

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
    </div>
  );
}

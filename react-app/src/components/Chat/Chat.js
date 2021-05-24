import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";

import io from "socket.io-client";
let privateSocket = io("/private");

export default function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);

  useEffect(async () => {
    await dispatch(getMessages(1, 2));
  }, [dispatch]);

  const handleChatSubmit = (e) => {
    e.preventDefault();

    const msg = {
      message,
      sender_id: user.id,
      reciever_id: 2,
      roomId: 1,
    };

    privateSocket.emit("private_message", msg);

    // have a private socket disconnect for best coding practices.

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

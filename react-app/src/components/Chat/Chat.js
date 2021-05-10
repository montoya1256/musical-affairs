import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";

import io from "socket.io-client";
let privateSocket;

export default function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getMessages(1, 2));
  }, [dispatch]);

  useEffect(() => {
    console.log("((((((((((((((((((((((", privateSocket);
    privateSocket = io("/private");
    console.log("()))))))))))))))))", privateSocket);

    // return () => {
    //   privateSocket.disconnect();
    // };
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();

    const msg = {
      message,
      sender_id: user.id,
      reciever_id: 2,
    };
    console.log("*******", msg);

    privateSocket.emit("private_message", msg);
    console.log("*************");
    setMessage("");
  };

  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      console.log("msg- --------", msg);
    });
  });

  return (
    <div>
      <h1>Chat</h1>
      {messages?.map((msg) => (
        <p key={msg.id}>{msg.message}</p>
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

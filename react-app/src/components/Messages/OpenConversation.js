import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, InputGroup, Button } from "react-bootstrap";

const io = require("socket.io-client");
export const socket = io();

export default function OpenConversation() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const user = useSelector((state) => state.session.user);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("new_message", {
      message: text,
      sender_id: user.id,
      reciever_id: 2, // this value needs to change
    });
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          <div
            className={`my-1 d-flex flex-column align-self-end align-items-end`}
          >
            <div className={`rounded px-2 py-1 bg-primary text-white`}>
              Message text dasljkldsaj
            </div>
            <div className={`text-muted small text-right`}>senderName</div>
            <div className={`rounded px-2 py-1 bg-primary text-white`}>
              2 Message text dsadssdasds
            </div>
            <div className={`text-muted small text-right`}>2 senderName</div>
          </div>
        </div>
      </div>
      <Form onSubmit={sendChat}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

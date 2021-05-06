import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function NewConversationModal({ closeModal }) {
  function handleSubmit(e) {
    e.preventDefault();

    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* create a loop to go over the contact names */}
          <Form.Group controlId="name">
            <Form.Check
              type="checkbox"
              // value={selectedContactIds.includes(contact.id)}
              label="user name"
              // onChange={() => handleCheckboxChange(contact.id)}
            />
          </Form.Group>

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

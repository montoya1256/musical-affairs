import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./SignUpForm.css";
import { Button, Form, Col } from "react-bootstrap";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [gender, setGender] = useState("");
  const [preffered_gender, setPreffered_gender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const close = document.querySelector("#modal-background");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const response = await dispatch(
        sessionActions.signUp({
          email,
          username,
          password,
          first_name,
          birthday,
          profile_pic,
          zip_code,
          gender,
          preffered_gender,
        })
      );
      console.log("gender", gender);
      console.log("gender", preffered_gender);
      if (response.errors) return setErrors(response.errors);
      else {
        history.push("/artist");
        close.click();
        return;
      }
    } else {
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter Email"
        />
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter Username"
        />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
          placeholder="Enter First Name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="Date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          placeholder="Enter Birthday"
        />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          value={profile_pic}
          onChange={(e) => setProfile_pic(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="number"
          value={zip_code}
          onChange={(e) => setZip_code(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <div key={`default-radio`} className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="M"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="F"
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Other"
              name="gender"
              value="O"
              onChange={(e) => setGender(e.target.value)}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <div key={`default-radio`} className="mb-3">
          <Form.Label>Preffered Gender</Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              name="preffered_gender"
              value="M"
              onChange={(e) => setPreffered_gender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="preffered_gender"
              value="F"
              onChange={(e) => setPreffered_gender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Other"
              name="preffered_gender"
              value="O"
              onChange={(e) => setPreffered_gender(e.target.value)}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <Form.Label>Confirm Password </Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Your Password"
          required
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import * as sessionActions from "../../store/session";

import { getSearchResults, getSimilarResults } from "../../store/search";

import "./Navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [search, setSearch] = useState("");

  let sessionLinks;
  let searchBar;

  const handleSubmit = async () => {
    await dispatch(
      sessionActions.login({
        email: "demo@user.io",
        password: "password",
      })
    );
    history.push("/favorites");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(getSearchResults(search));
    dispatch(getSimilarResults(search));
    setSearch("");
    history.push("/search");
  };

  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="nav-home">
          <a href="/favorites">Favorites</a>
        </div>
        <ProfileButton user={sessionUser} />
      </>
    );

    searchBar = (
      <form className="nav-search-bar" onSubmit={handleSearch}>
        <i className="fas fa-search"></i>
        <input
          id="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignUpModal />
        <Button variant="dark" onClick={() => handleSubmit()}>
          Demo User
        </Button>
      </>
    );

    searchBar = <></>;
  }

  return (
    <Navbar bg="dark" variant="dark" className="nav-container">
      {searchBar}
      <Nav className="mr-auto1" id="nav-profile">
        {sessionLinks}
      </Nav>
    </Navbar>
  );
};

export default Navigation;

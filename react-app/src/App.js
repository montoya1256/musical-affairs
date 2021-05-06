import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import RandomArtist from "./components/artists/RandomArtist";
import FavoriteArtist from "./components/artists/FavoriteArtist";
import Messages from "./components/Messages/Messages";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
          <a href="/artist">pick an artist</a>
          <a href="/favorites">Favorites</a>
          <a href="/messages">Messages</a>
        </ProtectedRoute>
        <ProtectedRoute path="/artist" exact={true}>
          <RandomArtist />
        </ProtectedRoute>
        <ProtectedRoute path="/favorites" exact={true}>
          <FavoriteArtist />
        </ProtectedRoute>
        <ProtectedRoute path="/messages" exact={true}>
          <Messages />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RandomArtist from "./components/artists/RandomArtist";
import FavoriteArtist from "./components/artists/FavoriteArtist";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

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
      <Navigation />
      <Switch>
        <ProtectedRoute path="/favorites" exact={true}>
          <FavoriteArtist />
          <RandomArtist />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

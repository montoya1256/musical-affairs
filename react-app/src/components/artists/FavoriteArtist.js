import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showFavorites,
  removeFromFavorites,
  showUsersWhoLikeThisArtist,
} from "../../store/artists";
import UserSelect from "./UserSelect";

function FavoriteArtist() {
  const dispatch = useDispatch();
  const favArtist = useSelector((state) => state.artists.favorites);

  useEffect(() => {
    dispatch(showFavorites());
  }, [dispatch]);

  const handleUnFavorite = async (e) => {
    e.preventDefault();
    await dispatch(removeFromFavorites(e.target.id));
    dispatch(showFavorites());
    return;
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favArtist?.map((artist) => (
        <div key={artist.id}>
          <p>{artist.name}</p>
          <img src={artist.profile_pic} alt={artist.name}></img>
          <button onClick={handleUnFavorite} type="button" id={artist.id}>
            UnFavorite
          </button>
          <UserSelect artist={artist} />
        </div>
      ))}
    </div>
  );
}

export default FavoriteArtist;

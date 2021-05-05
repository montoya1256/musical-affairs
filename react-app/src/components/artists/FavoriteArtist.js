import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showFavorites,
  removeFromFavorites,
  showUsersWhoLikeThisArtist,
} from "../../store/artists";

function FavoriteArtist() {
  const dispatch = useDispatch();

  const favArtist = useSelector((state) => state.artists.favorites);
  console.log(favArtist);

  useEffect(() => {
    dispatch(showFavorites());
  }, [dispatch]);

  const handleUnFavorite = async (e) => {
    e.preventDefault();
    await dispatch(removeFromFavorites(e.target.id));
    dispatch(showFavorites());
    return;
  };
  const handleShowFavoriters = async (e) => {
    e.preventDefault();
    await dispatch(showUsersWhoLikeThisArtist(e.target.id));
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
          <button onClick={handleShowFavoriters} type="button" id={artist.id}>
            show others who like this artist
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteArtist;

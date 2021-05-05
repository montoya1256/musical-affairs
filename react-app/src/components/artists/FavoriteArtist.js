import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showFavorites } from "../../store/artists";

function FavoriteArtist() {
  const dispatch = useDispatch();

  const favArtist = useSelector((state) => state.artists.favorites);
  console.log(favArtist);

  useEffect(() => {
    dispatch(showFavorites());
  }, [dispatch]);

  return (
    <div>
      <h1>Favorites</h1>
      {favArtist?.map((artist) => (
        <div key={artist.id}>
          <p>{artist.name}</p>
          <img src={artist.profile_pic} alt={artist.name}></img>
        </div>
      ))}
    </div>
  );
}

export default FavoriteArtist;

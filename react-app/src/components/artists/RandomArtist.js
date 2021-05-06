import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArtist, addToFavorites } from "../../store/artists";

function RandomArtist() {
  const dispatch = useDispatch();
  const randomArtist = useSelector((state) => state.artists.artist[0]);

  useEffect(() => {
    dispatch(getRandomArtist());
  }, [dispatch]);

  const handleLike = async (e) => {
    e.preventDefault();
    await dispatch(addToFavorites(randomArtist.id));
    await dispatch(getRandomArtist());
  };
  const handleDisLike = (e) => {
    e.preventDefault();
    dispatch(getRandomArtist());
  };

  return (
    <div>
      <h1>randomArtist</h1>
      <h3>{randomArtist?.name}</h3>
      <button onClick={handleDisLike} type="button">
        DisLike
      </button>
      <img src={randomArtist?.profile_pic} alt="{randomArtist?.name}"></img>
      <button onClick={handleLike} type="button">
        Like
      </button>
    </div>
  );
}

export default RandomArtist;

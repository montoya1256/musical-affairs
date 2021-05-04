import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArtist } from "../../store/artists";

function RandomArtist() {
  const dispatch = useDispatch();
  const randomArtist = useSelector((state) => state.artists.artist[0]);

  useEffect(() => {
    dispatch(getRandomArtist());
  }, [dispatch]);

  return (
    <div>
      <h1>randomArtist</h1>
      <h3>{randomArtist?.name}</h3>
      <img src={randomArtist?.profile_pic}></img>
    </div>
  );
}

export default RandomArtist;

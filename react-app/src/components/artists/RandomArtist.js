import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArtist } from "../../store/artists";

function RandomArtist() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomArtist());
  }, [dispatch]);

  return (
    <div>
      <h1>randomArtist</h1>
    </div>
  );
}

export default RandomArtist;

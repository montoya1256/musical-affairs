import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomArtist,
  addToFavorites,
  showFavorites,
} from "../../store/artists";
import "./RandomArtist.css";

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
    await dispatch(showFavorites());
  };
  const handleDisLike = (e) => {
    e.preventDefault();
    dispatch(getRandomArtist());
  };

  return (
    <div className="randomArtist-div">
      <div>
        <h1 className="randomArtist-random">Artist You may be interested in</h1>
        <h3 className="randomArtist-name">{randomArtist?.name}</h3>

        <img
          className="randomArtist-image"
          src={randomArtist?.profile_pic}
          alt={`${randomArtist?.name}`}
        ></img>
        <div className="randomArtist-buttons">
          <button
            variant="light"
            className="randomArtist-dislike-btn"
            onClick={handleDisLike}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            variant="light"
            className="randomArtist-like-btn"
            onClick={handleLike}
            type="button"
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomArtist;

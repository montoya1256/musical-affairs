import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchResults.css";
import { addToFavorites } from "../../store/artists";

export default function SimilarResults() {
  const dispatch = useDispatch();
  const similarArtists = useSelector((state) => state.search.similar);

  const handleLike = async (e, name) => {
    e.preventDefault();
    console.log(e.target.id);
    await dispatch(addToFavorites(e.target.id, name));
  };

  return (
    <div className="similar-div-container">
      <h1>Artist you may also like</h1>
      <div className="similar-container">
        {similarArtists?.map((artist) => (
          <div key={artist.id}>
            <h2>{artist.name}</h2>
            <div className="similar-image-div">
              <img
                className="similar-image"
                src={artist.profile_pic}
                alt={`${artist.name}`}
              ></img>
            </div>
            <div className="search-favorites">
              <button
                id={artist.id}
                variant="light"
                className="search-favorites-btn"
                onClick={(e) => handleLike(e, artist.name)}
                type="button"
              >
                ADD TO FAVORITES
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

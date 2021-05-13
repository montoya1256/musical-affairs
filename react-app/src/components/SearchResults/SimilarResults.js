import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchResults.css";
import { addToFavorites } from "../../store/artists";

export default function SimilarResults() {
  const dispatch = useDispatch();
  const similarArtists = useSelector((state) => state.search.similar);

  const handleLike = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    await dispatch(addToFavorites(e.target.id));
  };

  return (
    <div>
      <h1>Artist you may also like</h1>
      {similarArtists?.map((artist) => (
        <div key={artist.id}>
          <h1>{artist.name}</h1>
          <img src={artist.profile_pic} alt={`${artist.name}`}></img>
          <div>
            <button
              id={artist.id}
              variant="light"
              className=""
              onClick={handleLike}
              type="button"
            >
              ADD TO FAVORITES
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

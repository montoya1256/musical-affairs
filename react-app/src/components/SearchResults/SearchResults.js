import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SimilarResults from "./SimilarResults";
import "./SearchResults.css";
import { addToFavorites } from "../../store/artists";

export default function SearchResults() {
  const searchResults = useSelector((state) => state.search);
  const simarr = searchResults.similar;
  const dispatch = useDispatch();

  const handleLike = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    await dispatch(addToFavorites(e.target.id));
  };

  return (
    <div className="search-container">
      {searchResults.search.profile_pic ? (
        <div className="search-artists">
          <div>
            <h1>{searchResults.search.name}</h1>
            <div className="search-image-div">
              <img
                className="search-image"
                src={searchResults.search.profile_pic}
                alt={`${searchResults.search.name}`}
              ></img>
            </div>
            <div className="search-favorites">
              <button
                id={searchResults.id}
                variant="secondary"
                className="search-favorites-btn"
                onClick={handleLike}
                type="button"
              >
                ADD TO FAVORITES
              </button>
            </div>
          </div>
          {simarr?.length > 0 && <SimilarResults />}
        </div>
      ) : (
        <div>
          {searchResults.search.name ? (
            <h1>
              Sorry but the artist, {searchResults.search.name}, is not in our
              database
            </h1>
          ) : (
            <h1>Please Enter a Search query</h1>
          )}
        </div>
      )}
    </div>
  );
}

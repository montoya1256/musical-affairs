import React from "react";
import { useSelector } from "react-redux";
import SimilarResults from "./SimilarResults";

export default function SearchResults() {
  const searchResults = useSelector((state) => state.search);
  const simarr = searchResults.similar;
  return (
    <div>
      {searchResults.search.profile_pic ? (
        <div>
          <div>
            <h1>{searchResults.search.name}</h1>
            <img
              src={searchResults.search.profile_pic}
              alt={`${searchResults.search.name}`}
            ></img>
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

import React from "react";
import { useSelector } from "react-redux";

export default function SimilarResults() {
  const similarArtists = useSelector((state) => state.search.similar);
  return (
    <div>
      <h1>Similars</h1>
      {similarArtists?.map((artist) => (
        <div key={artist.id}>
          <h1>{artist.name}</h1>
          <img src={artist.profile_pic} alt={`${artist.name}`}></img>
        </div>
      ))}
    </div>
  );
}

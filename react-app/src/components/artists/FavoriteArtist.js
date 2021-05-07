import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showFavorites,
  removeFromFavorites,
  showUsersWhoLikeThisArtist,
} from "../../store/artists";
import UserSelect from "./UserSelect";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FavoriteArtist.css";

function FavoriteArtist() {
  const dispatch = useDispatch();
  const favArtist = useSelector((state) => state.artists.favorites);

  useEffect(() => {
    dispatch(showFavorites());
  }, [dispatch]);

  const handleUnFavorite = async (e) => {
    e.preventDefault();
    await dispatch(removeFromFavorites(e.target.id));
    dispatch(showFavorites());
    return;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  return (
    <div className="slider">
      <h1 className="slider_title">Favorites</h1>
      <Slider {...settings}>
        {favArtist?.map((artist) => (
          <div key={artist.id} className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <button
                  className="unfavorite"
                  onClick={handleUnFavorite}
                  type="button"
                  id={artist.id}
                >
                  <i id={artist.id} class="fas fa-heart-broken unfav"></i>
                </button>
                <img src={artist.profile_pic} alt={artist.name} />
              </div>
              <div className="details">
                <h2>
                  {artist.name} <span className="job-title">Artist</span>
                </h2>
              </div>
            </div>
            <UserSelect artist={artist} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FavoriteArtist;

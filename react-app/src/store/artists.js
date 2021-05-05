// const ALL_ARTISTS = "artists/ALL_ARTISTS";
const RANDOM_ARTIST = "artists/RANDOM_ARTIST";
const FAVORITE_ARTIST = "artists/FAVORITE_ARTIST";

// const loadAll = (artists) => ({
//   type: ALL_ARTISTS,
//   artists,
// });

const loadOne = (artist) => ({
  type: RANDOM_ARTIST,
  artist,
});

const getFavorites = (artist) => ({
  type: FAVORITE_ARTIST,
  artist,
});

// export const getAllArtists = () => async (dispatch) => {
//   const res = await fetch("/api/artists/");
//   const artists = await res.json();
//   dispatch(loadAll(artists.artists));
//   return artists.artists;
// };

export const getRandomArtist = () => async (dispatch) => {
  const res = await fetch("/api/artists/random/");
  const artist = await res.json();
  dispatch(loadOne(artist.artist));
  return artist.artist;
};

export const showFavorites = () => async (dispatch) => {
  const res = await fetch("/api/artists/favorites/");
  const favorites = await res.json();
  dispatch(getFavorites(favorites.favorites));
  return favorites.favorites;
};

export const addToFavorites = (favArtist) => async (dispatch) => {
  const { artistId, userId } = favArtist;
  const res = await fetch("/api/artists/favorites/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artistId, userId }),
  });
  const newFavArtist = await res.json();
  dispatch(getFavorites());
  return newFavArtist;
};

const initialState = { artist: [] };

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ALL_ARTISTS:
    //   return { ...state, allArtists: action.artists };
    case RANDOM_ARTIST:
      return { ...state, artist: action.artist };
    case FAVORITE_ARTIST:
      return { ...state, favorites: action.artist };
    default:
      return state;
  }
};

export default artistsReducer;

const RANDOM_ARTIST = "artists/RANDOM_ARTIST";
const FAVORITE_ARTIST = "artists/FAVORITE_ARTIST";
const USERLIKESARTIST = "artists/USERLIKESARTIST";

const loadOne = (artist) => ({
  type: RANDOM_ARTIST,
  artist,
});

const getFavorites = (artist) => ({
  type: FAVORITE_ARTIST,
  artist,
});

const getUsersWhoLikeThisArtist = (artist) => ({
  type: USERLIKESARTIST,
  artist,
});

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

export const showUsersWhoLikeThisArtist = (artistId) => async (dispatch) => {
  const res = await fetch(`/api/artists/${artistId}/`);
  const users = await res.json();
  dispatch(getUsersWhoLikeThisArtist(users.users));
  return users.users;
};

export const addToFavorites = (favArtistId) => async (dispatch) => {
  const res = await fetch("/api/artists/favorites/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favArtistId }),
  });
  if (res.ok) {
    const newFavArtist = await res.json();
    dispatch(getFavorites());
    return newFavArtist;
  } else {
    return alert("This artist is already in your favorites");
  }
};

export const removeFromFavorites = (favArtistId) => async (dispatch) => {
  const res = await fetch("/api/artists/favorites/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favArtistId,
    }),
  });
  const removedArtist = await res.json();
  return removedArtist;
};

const initialState = { artist: [] };

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RANDOM_ARTIST:
      return { ...state, artist: action.artist };
    case FAVORITE_ARTIST:
      return { ...state, favorites: action.artist };
    case USERLIKESARTIST:
      return { ...state, users: action.artist };
    default:
      return state;
  }
};

export default artistsReducer;

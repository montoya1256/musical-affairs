const ALL_ARTISTS = "artists/ALL_ARTISTS";
const RANDOM_ARTIST = "artists/RANDOM_ARTIST";

// const loadAll = (artists) => ({
//   type: ALL_ARTISTS,
//   artists,
// });

const loadOne = (artist) => ({
  type: RANDOM_ARTIST,
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

const initialState = { artist: [] };

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ALL_ARTISTS:
    //   return { ...state, allArtists: action.artists };
    case RANDOM_ARTIST:
      return { ...state, artist: action.artist };
    default:
      return state;
  }
};

export default artistsReducer;

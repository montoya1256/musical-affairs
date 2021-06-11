const SEARCH_RESULTS = "search/SEARCH_RESULTS";
const SIMLAR_RESULTS = "search/SIMLAR_RESULTS";

const loadOne = (artist) => ({
  type: SEARCH_RESULTS,
  artist,
});

const loadSimilar = (artist) => ({
  type: SIMLAR_RESULTS,
  artist,
});

export const getSearchResults = (term) => async (dispatch) => {
  const res = await fetch(`/api/search/${term}/`);
  const artist = await res.json();
  dispatch(loadOne(artist.artist));
  return artist.artist;
};

export const getSimilarResults = (term) => async (dispatch) => {
  const res = await fetch(`/api/search/${term}/similar/`);
  const artists = await res.json();
  dispatch(loadSimilar(artists.artist));
  return artists.artist;
};

const initalState = { search: [] };

const searchReducer = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, search: action.artist };
    case SIMLAR_RESULTS:
      return { ...state, similar: action.artist };
    default:
      return state;
  }
};

export default searchReducer;

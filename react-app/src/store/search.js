const SEARCH_RESULTS = "search/SEARCH_RESULTS";

const loadOne = (artist) => ({
  type: SEARCH_RESULTS,
  artist,
});

export const getSearchResults = (term) => async (dispatch) => {
  const res = await fetch(`/api/search/${term}/`);
  const artist = await res.json();
  dispatch(loadOne(artist.artist));
  return artist.artist;
};

const initalState = { search: [] };

const searchReducer = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, search: action.artist };
    default:
      return state;
  }
};

export default searchReducer;

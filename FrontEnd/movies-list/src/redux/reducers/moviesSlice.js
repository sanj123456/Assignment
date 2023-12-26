import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: { myMoviesList: [], activePage: 1, totalPages: 1 },
  reducers: {
    setMoviesData: (state, action) => {
      return {
        ...state,
        myMoviesList: action.payload.moviesList,
        totalPages: action.payload.totalPages
      };
    },
    setActivePage: (state, action) => {
      return {
        ...state,
        activePage: action.payload.pageNum
      };
    },

  },
});
export const { setMoviesData, setActivePage } =
  moviesSlice.actions;
export default moviesSlice.reducer;

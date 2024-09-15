import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
  name: 'trendings',
  initialState: {
    trendingAll: null,
    trendingMovies: null,
    trendingTv: null,
    trendingIndia: null,
  },
  reducers: {
    setTrending: (state, action) => {
      const { trendingType, trendingData } = action.payload;
      const filterTopTen = {
        page: trendingData.page,
        results: (trendingData.results || []).slice(0, 10) // Default to empty array if results is undefined
      };
      state[trendingType] = filterTopTen;
    }
  }
});

export const { setTrending } = trendingSlice.actions;
export default trendingSlice.reducer;

// watchedVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const watchedVideosSlice = createSlice({
  name: "watchedVideos",
  initialState: [],
  reducers: {
    addWatchedVideo: (state, action) => {
      return action.payload
    },
  },
});

export const { addWatchedVideo } = watchedVideosSlice.actions;
export default watchedVideosSlice.reducer;

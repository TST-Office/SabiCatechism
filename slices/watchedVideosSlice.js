import { createSlice } from "@reduxjs/toolkit";

const watchedVideosSlice = createSlice({
  name: "watchedVideos",
  initialState: [],
  reducers: {
    addWatchedVideo: (state, action) => {
      const isVideoExist = state.find(video => video.id === action.payload.id);
      if (!isVideoExist) {
        return [...state, action.payload];        
      }
    },
  },
});

export const { addWatchedVideo } = watchedVideosSlice.actions;
export default watchedVideosSlice.reducer;
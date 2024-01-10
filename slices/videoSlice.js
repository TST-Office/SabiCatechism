import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: [],
  reducers: {
    setVideos: (state, action) => {
      return action.payload;
    },
    
    updateVideoLocalUri: (state, action) => {
      const { videoId, localUri } = action.payload;
      const videoToUpdate = state.find((video) => video.id === videoId);

      if (videoToUpdate) {
        videoToUpdate.localUri = localUri;
      }
    },
  }
});

// export const { setVideos } = videoSlice.actions;
// export default videoSlice.reducer;

export const { setVideos, updateVideoLocalUri } = videoSlice.actions;
export default videoSlice.reducer;

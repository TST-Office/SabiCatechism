import { createSlice } from "@reduxjs/toolkit";

const videoSlice  = createSlice({
    name: 'videos',
    initialState: [],
    reducers: {
        setVideos: (state, action) => {
            return action.payload
        }
    }
});

export const {setVideos} = videoSlice.actions;
export default videoSlice.reducer;
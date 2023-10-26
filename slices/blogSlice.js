import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogPosts: (state, action) => {
      return action.payload;
    }
  }
});

export const { setBlogPosts } = blogSlice.actions;
export default blogSlice.reducer;

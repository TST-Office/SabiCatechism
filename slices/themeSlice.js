
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light', // Set the initial theme state
  reducers: {
    setTheme: (state, action) => {
      return action.payload; // Update the theme based on the payload
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

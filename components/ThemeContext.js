// ThemeContext.js
import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../slices/themeSlice'; // Import the setTheme action
import { DarkBgColors, LightBgColors } from '../constants/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const toggleTheme = () => {
    // Toggle the theme using Redux Toolkit action
    dispatch(setTheme(theme === 'light' ? DarkBgColors.background : LightBgColors.background));
  };

  return { theme, toggleTheme };
};

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={useTheme()}>
      {children}
    </ThemeContext.Provider>
  );
};

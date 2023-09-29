import React from 'react';
import { Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../slices/themeSlice'; // Import the setTheme action
import { DarkBgColors, LightBgColors } from '../constants/theme';
import { MaterialIcons } from "@expo/vector-icons";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const toggleTheme = () => {
    // Toggle the theme using Redux Toolkit action
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const switchStyles = {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:10
  };

  return (
    <View style={switchStyles}>
      {theme === 'light' ? (
        <MaterialIcons name="wb-sunny" size={24} color={DarkBgColors.tabActiveText} />
      ) : (
        <MaterialIcons name="nights-stay" size={24} color={LightBgColors.text} />
      )}
      <Switch
        value={theme === 'dark'} // Set the value of the switch based on the current theme
        onValueChange={toggleTheme} // Toggle the theme when the switch is pressed
        trackColor={{ false: LightBgColors.background, true: DarkBgColors.background }}
        thumbColor={theme === 'light' ? DarkBgColors.text : LightBgColors.text}
      />
      {theme === 'light' ? (
        <MaterialIcons name="nightlight-round" size={24} color={DarkBgColors.tabActiveText} />
      ) : (
        <MaterialIcons name="wb-sunny" size={24} color={LightBgColors.sun} />
      )}
    </View>
  );
};

export default ThemeToggleButton;

import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import ThemeToggleButton from "./ThemeToggleButton";
import { DarkBgColors, LightBgColors } from "../constants/theme";

const Container = ({ children, style }) => {
  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);

  // Define the internal styles for the Container
  const internalStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? DarkBgColors.background : LightBgColors.background,
      flex: 1,
      color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
    },
    Text: {
      color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
    },
  });

  // Merge the internal styles with the additional styles passed as props
  const combinedStyles = StyleSheet.compose(internalStyles.container, style);

  return (
    <SafeAreaView style={combinedStyles}>

      {children}
    </SafeAreaView>
  );
};

export default Container;

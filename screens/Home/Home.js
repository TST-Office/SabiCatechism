import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {Fontisto} from "@expo/vector-icons";
import { useTheme } from "../../themes/ThemeProvider";
import Carousel from "../../components/Carousel";
import { DarkBgColors, LightBgColors } from "../../themes/ThemeColors";
import { SIZES } from "../../constants";

const Home = () => {
  const {dark, colors, setScheme} = useTheme();

  const ToggleTheme = () => {
    dark ? setScheme("light") : setScheme("dark");
  };

  // const user = useSelector((state) => state.user);
  // console.log("check if user details was persisted with user details", user.userDetails);
  // console.log("check if user details was persisted with user", user.user.created_at);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex:1, height: SIZES.height }}>
      <Carousel />
      <TouchableOpacity onPress={ToggleTheme}>
        <Fontisto name={dark ? "plus-a" : "play" } size={24} color={colors.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default Home;

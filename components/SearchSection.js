import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { COLORS, DarkBgColors, LightBgColors, SIZES } from "../constants/theme";

const SearchSection = () => {
  const theme = useSelector((state) => state.theme);
  const styles = StyleSheet.create({
    searchContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: SIZES.base,
      height: 50,
      marginHorizontal: 5,
      marginVertical: 10,
    },
    searchWrapper: {
      flex: 1,
      backgroundColor: theme === "light" ? COLORS.primary : COLORS.gray,
      marginRight: 0,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,

      height: "100%",
    },
    searchInput: {
      // fontFamily: FONT.regular,
      width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.body1,
      color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
    },
    searchBtn: {
      width: 50,
      height: "100%",
      backgroundColor:
        theme === "light" ? COLORS.primary : COLORS.gray,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      color: theme === "light" ? DarkBgColors.bgGray : LightBgColors.text,
    },
    searchBtnImage: {
      width: "50%",
      height: "50%",
      tintColor: COLORS.white,
    },
  });

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Find latest updates ..."
          value=""
          placeholderTextColor={
            theme === "light" ? DarkBgColors.text : LightBgColors.text
          }
          style={styles.searchInput}
        />
      </View>
      <TouchableOpacity style={styles.searchBtn} onPress={""}>
        <MaterialIcons
          name="search"
          size={24}
          color={theme === "light" ? DarkBgColors.text : LightBgColors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchSection;

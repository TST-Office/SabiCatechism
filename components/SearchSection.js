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
import { useNavigation } from "@react-navigation/native";

const SearchSection = () => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  }
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
    searchBtn: {
      width: 50,
      height: "100%",
      backgroundColor:
        theme === "light" ? COLORS.primary : COLORS.gray,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
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
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
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

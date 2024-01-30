import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector from react-redux
import { COLORS, DarkBgColors, LightBgColors, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const SearchSection = () => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  const [userPlan, setUserPlan] = useState(user.userDetails.user_plan)
  console.log("user details", userPlan[0]);

  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  }
  const navigateToSubscription = () => {
    navigation.navigate('Subscription');
  };
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
    textSub: {
      width: 150,
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
      {
        userPlan.length > 0 ? (
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
            <MaterialIcons
              name="search"
              size={24}
              color={theme === "light" ? DarkBgColors.text : LightBgColors.text}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.textSub} onPress={navigateToSubscription}>
            <Text style={{ color:theme === "light" ? DarkBgColors.text : LightBgColors.text  }}>Subscribe</Text>
          </TouchableOpacity>
        )
      }

    </View>
  );
};

export default SearchSection;

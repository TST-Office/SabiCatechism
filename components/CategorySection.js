import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import { DarkBgColors, LightBgColors } from "../constants/theme";
import { API_URL } from "../constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const CategorySection = () => {
  const theme = useSelector((state) => state.theme);
  const [activeCategoryType, setActiveCategoryType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setIsLoading(true);
    axios.get(`${API_URL}/categories`).then((response) => {
      if (response.data) {
        setIsLoading(false);
        setActiveCategoryType(response.data);
        console.log(response.data);
      }
    }).catch((error) => {
      setIsLoading(true); // Set isLoading to false on error
      console.log(error.message);
    });
  };

  const handleCategoryClick = (item) => {
    navigation.navigate("RelatedVideoCategory", {catName: item.name});
  }



  const styles = StyleSheet.create({
    tabsContainer: {
      width: "100%",
      marginTop: 16,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
    },
    tab: (item) => ({
      paddingVertical: 12 / 2,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        activeCategoryType && activeCategoryType.id === item.id
          ? DarkBgColors.background
          : COLORS.primary,
    }),
    tabText: (item) => ({
      color:
        activeCategoryType && activeCategoryType.id === item.id
          ? theme === "light" ? DarkBgColors.text : LightBgColors.text
          : theme === "light" ? DarkBgColors.text : LightBgColors.text,
    }),
  });

  return (
    <View style={styles.tabsContainer}>
      {isLoading ?  ( // Show ActivityIndicator when isLoading is true
        <ActivityIndicator size={"large"} color={theme === "light" ? LightBgColors.primary :  COLORS.primary} />
      ) : (
        <FlatList
          data={activeCategoryType}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(item)}
              onPress={() => handleCategoryClick(item)}
            >
              <Text style={styles.tabText(item)}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()} // Use the id as the key
          contentContainerStyle={{ columnGap: 12 }}
          horizontal
        />
      )}
    </View>
  );
};

export default CategorySection;

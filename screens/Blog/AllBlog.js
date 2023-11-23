import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { API_URL, COLORS, SIZES } from "../../constants";

import { setBlogPosts } from "../../slices/blogSlice";

export default function AllBlog() {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme);
  const blogs = useSelector((state) => state.blog);
  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;

  const allBlogComponent = ({ item }) => {
    const navigateToReadBlog = () => {
      navigation.navigate("ReadBlog", { blog: item });
    };

    return (
      <TouchableOpacity onPress={navigateToReadBlog} style={styles.glassmorphicContainer}>
        <ImageBackground
          source={{ uri: `https://api.coinstarr.org/${item?.thumbnail}` }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    
    glassmorphicContainer: {
      margin: 5,
      padding: 16,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      height: 260,
      marginBottom: 5,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "flex-end",
      borderRadius: 12,
      overflow: "hidden",
    },
    imageStyle: {
      borderRadius: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
      marginBottom: 8,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    thumbnail: {
      fontSize: 14,
      color: "white",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    flatList: {
      flexGrow: 0, // Ensure the FlatList doesn't grow indefinitely
    },
    resultsContainer: {
      flex: 1,
      marginTop: 16,
      marginHorizontal: 16,
    },
    resultText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 18,
      color: theme === "light" ? DarkBgColors.text : DarkBgColors.tabActiveText,
    },
    container: {
      marginBottom:150
    }
  });
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          marginVertical: 40,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={backButtonSize}
            color={theme === "light" ? DarkBgColors.text : LightBgColors.text}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
            fontSize: 45,
          }}
        >
          Latest Blog
        </Text>
      </View>
      <View style={styles.container}>
        {blogs ? (
          <FlatList
            data={blogs}
            renderItem={allBlogComponent}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator color={"green"} size={"large"} />
        )}
      </View>
     
     
     
    </Container>
  );
}

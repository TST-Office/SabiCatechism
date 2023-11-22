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
import { useVideosSelector } from "../../components/videosSelector";
import {
  DarkBgColors,
  LightBgColors,
  SIZES,
  COLORS,
} from "../../constants/theme";
import { setBlogPosts } from "../../slices/blogSlice";

const SearchScreen = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme);
  const videos = useVideosSelector();
  const blogs = useSelector((state) => state.blog);
  
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure that both videos and blogs are arrays
  const videosArray = Array.isArray(videos) ? videos : [];
  const blogsArray = Array.isArray(blogs) ? blogs : [];

  // Combine the arrays
  const combinedContent = [
    ...videosArray.map((video) => ({ ...video, key: `video_${video.id}` })),
    ...blogsArray.map((blog) => ({ ...blog, key: `blog_${blog.id}` })),
  ];


  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;

  const combinedViewComponent = ({ item }) => {
    return (
      <TouchableOpacity style={styles.glassmorphicContainer}>
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
    flatList: {
      flexGrow: 0, // Ensure the FlatList doesn't grow indefinitely
    },
    glassmorphicContainer: {
      margin: 5,
      padding: 16,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      height: 260,
      marginBottom: 60,
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

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 5,
      marginTop: 60,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: COLORS.white,
      marginRight: 8,
    },
    searchButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
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
  });

  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 35,
          left: 10,
          zIndex: 1,
        }}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={backButtonSize}
          color={theme === "light" ? DarkBgColors.text : LightBgColors.text}
        />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for videos and blogs"
          placeholderTextColor={
            theme === "light" ? COLORS.white : COLORS.primary
          }
        />
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        {/* Display search results here */}
        {/* For example: */}
        <Text style={styles.resultText}>Search results for "Your Query"</Text>
        {/* Render videos and blogs */}

        <View style={styles.container}>
          {combinedContent ? (
            <FlatList
              data={combinedContent}
              keyExtractor={(item) => item.key}
              renderItem={combinedViewComponent}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <ActivityIndicator color={"green"} size={"large"} />
          )}
        </View>
      </View>
    </Container>
  );
};

export default SearchScreen;

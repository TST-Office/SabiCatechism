import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, COLORS, SIZES } from "../../constants";
import { setBlogPosts } from "../../slices/blogSlice";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const LatestBlogs = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const navigation = useNavigation();

  const allBlogNavigation = () => {
    navigation.navigate("AllBlog");
  }
  

  const [isLoading, setIsLoading] = useState(false);

  const BlogComponent = ({ blog }) => {
    const navigateToReadBlog = () => {
      navigation.navigate("ReadBlog", { blog: blog });
    };
    return (
      <TouchableOpacity onPress={navigateToReadBlog}>
        <View style={styles.BlogContainer}>
          <ImageBackground
            source={{ uri: `https://api.coinstarr.org/${blog?.thumbnail}` }}
            style={{ ...styles.image, borderRadius: 10, height: "100%" }}
          >
            <View style={styles.overlay} />

            <View style={styles.textContainer}>
              <Text style={styles.title}>{blog?.title}</Text>
              <Text style={styles.author}>{blog?.author}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  // suggest a random blog component
  const SuggestBlogComp = ({ blog }) => {
    const navigateToReadBlog = () => {
      navigation.navigate("ReadBlog", { blog: blog });
    };
    return (
      <TouchableOpacity onPress={navigateToReadBlog} style={styles.container}>
        <ImageBackground
          source={{ uri: `https://api.coinstarr.org/${blog?.thumbnail}` }}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <View style={styles.topRight}>
              <Text style={styles.category}>{blog?.author}</Text>
            </View>
            <View style={styles.bottomCenter}>
              <Text style={styles.titleSu}>{blog?.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // get random blog function
  const selectRandomBlog = (blogs) => {
    if (blogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      return blogs[randomIndex];
    }
    return null;
  };
  const suggestedBlog = selectRandomBlog(blogs);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/blog`)
      .then((response) => {
        if (response.data) {
          setIsLoading(false);
          dispatch(setBlogPosts(response.data)); // Corrected dispatch call
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  const styles = StyleSheet.create({
    BlogContainer: {
      width: 200,
      height: 220,
      backgroundColor: "#E7E9EE",
      borderRadius: 10,
      padding: 10,
      shadowColor: "rgb(20, 58, 122)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginBottom: 20,
      elevation: 5,
      position: "relative",
    },
    title: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    showMoreButton: {
      flexDirection: "row", // Create a row layout to align text and icon side by side
      alignItems: "center", // Align items horizontally
      padding: 10,
    },
    showMoreText: {
      color: theme === "light" ? COLORS.white : DarkBgColors.bgGray,
      fontSize: SIZES.h4,
      fontWeight: "bold",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20, // Adjust the font size as needed
      fontWeight: "bold",
      color: "white", // Change to your desired color
      marginBottom: 8, // Adjust the spacing between title and author
    },
    author: {
      fontSize: 16, // Adjust the font size as needed
      color: "lightgrey", // Change to your desired color
    },
    container: {
      height: 400,
      width: "100%",
      marginTop: 15,
      overflow: "hidden",
      marginBottom: 150,
    },
    imageBackground: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    topRight: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    category: {
      color: "white",
      fontSize: 16,
    },
    bottomCenter: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      padding: 16,
    },
    titleSu: {
      color: "white",
      fontSize: 25,
      textAlign: "center",
    },
  });

  return (
    <View style={{ marginTop: 15, paddingHorizontal: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme === "light" ? COLORS.white : DarkBgColors.bgGray,
            fontSize: SIZES.h4,
          }}
        >
          Latest Blog
        </Text>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={allBlogNavigation}
        >
          <Text style={styles.showMoreText}>Show more</Text>
          <MaterialIcons
            name="keyboard-arrow-right" // Use the right arrow icon
            size={24} // Set the icon size
            color={theme === "light" ? COLORS.white : DarkBgColors.bgGray} // Set the icon color
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator color={"green"} size={"large"} />
      ) : (
        <>
          <FlatList
            data={blogs}
            keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
            horizontal={true}
            renderItem={({ item }) => <BlogComponent blog={item} />}
            contentContainerStyle={{ columnGap: 12 }}
            showsHorizontalScrollIndicator={false}
          />
          {suggestedBlog && (
            <View>
              <Text
                style={{
                  color: theme === "light" ? COLORS.white : DarkBgColors.bgGray,
                  fontSize: SIZES.h4,
                }}
              >
                Trending content
              </Text>
              <SuggestBlogComp blog={suggestedBlog} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default LatestBlogs;

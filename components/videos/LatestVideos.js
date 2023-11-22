import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { setVideos } from "../../slices/videoSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { COLORS, API_URL, SIZES } from "../../constants";
import { useVideosSelector } from "../videosSelector";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const LatestVideos = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(false);
  const videos = useVideosSelector();
  const navigation = useNavigation();

  const allVideoNavigateTo = () => {
    navigation.navigate("AllVideos")
  }

  
  
  

  const VideoComponent = ({ video }) => {
    const navigateToPlayVideo = () => {
      navigation.navigate("PlayVideo", {video})
    }
    return (
      <TouchableOpacity onPress={navigateToPlayVideo}>
        <View style={styles.VideoContainer}>
          <ImageBackground
            source={{ uri: `https://api.coinstarr.org/${video?.thumbnail}` }}
            style={{ ...styles.image, borderRadius: 10 }}
          >
            <View style={styles.overlay} />

            {/* genName (top-left) */}
            <View style={styles.topLeftText}>
              <Text style={styles.genName}>{video?.genName}</Text>
            </View>

            {/* catName (top-right) */}
            <View style={styles.topRightText}>
              <Text style={styles.catName}>{video?.catName}</Text>
            </View>

            {/* title (centered) */}
            <Text style={styles.title}>{video?.title}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  // suggest a random video component
  const SuggestVideoComp = ({ video }) => {
    return (
      <TouchableOpacity onPress={""} style={styles.container}>
        <ImageBackground
          source={{ uri: `https://api.coinstarr.org/${video?.thumbnail}` }}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <View style={styles.topRight}>
              <Text style={styles.category}>{video?.catName}</Text>
            </View>
            <View style={styles.bottomCenter}>
              <Text style={styles.titleSu}>{video?.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  
  // get a random video function
  const selectRandomVideo = () => {
    if (videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      return videos[randomIndex];
    }
    return null;
  };
  const suggestedVideo = selectRandomVideo(); // Get a random video
  console.log("suggested video", suggestedVideo);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/allvideo`)
      .then((response) => {
        if (response.data) {
          setIsLoading(false);
          // set video details to redux
          dispatch(setVideos(response.data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  const styles = StyleSheet.create({
    image: {
      resizeMode: "cover",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    text: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      margin: 2,
    },

    VideoContainer: {
      // marginTop: 10,
      width: 200,
      height: 220,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      marginBottom: 30,
    },
    topLeftText: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 1,
    },
    topRightText: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
    },
    genName: {
      fontSize: 14,
      fontWeight: "bold",
      color: "white",
    },
    catName: {
      fontSize: 14,
      fontWeight: "bold",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 5,
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
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
    container: {
      height: 400,
      width: "100%",
      marginTop: 15,
      overflow: "hidden",
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
    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
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
          Latest Videos
        </Text>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={allVideoNavigateTo}
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
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item }) => <VideoComponent video={item} />}
            contentContainerStyle={{ columnGap: 12 }}
            showsHorizontalScrollIndicator={false}
          />
          {suggestedVideo && (
            <View>
              <Text
                style={{
                  color: theme === "light" ? COLORS.white : DarkBgColors.bgGray,
                  fontSize: SIZES.h4,
                }}
              >
                Suggested Video
              </Text>
              <SuggestVideoComp video={suggestedVideo} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default LatestVideos;

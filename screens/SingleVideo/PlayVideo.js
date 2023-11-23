import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { API_URL, COLORS, SIZES } from "../../constants";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useVideosSelector } from "../../components/videosSelector";

export default function PlayVideo() {
  const route = useRoute();
  const { video } = route.params;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;
  const theme = useSelector((state) => state.theme);
  const navigation = useNavigation();
  const videos = useVideosSelector();

  console.log("coming from slice", videos);

  useEffect(() => {
    playVideo();
  }, []);

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const VideoDetails = () => {
    return (
      <View style={styles.tabContainer}>
        <Image
          source={{ uri: `https://api.coinstarr.org/${video?.thumbnail}` }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text
            style={[
              styles.title,
              {
                color:
                  theme === "light" ? DarkBgColors.text : LightBgColors.text,
              },
            ]}
          >
            {video?.title}
          </Text>
          <Text style={styles.description}>{video?.long_description}</Text>
          <Text style={styles.category}>{video?.catName}</Text>
          {/* Add more details as needed */}
        </View>
      </View>
    );
  };

  const RelatedVideos = ({item}) => {

    const handlePress = (item) => {
      // Handle the press action, e.g., navigate to the selected video
    };

    return (
      <FlatList
        data={videos.filter((v) => v.catName === video.catName)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={""}
            style={styles.videoItem1}
          >
            <ImageBackground
              source={{ uri: `https://api.coinstarr.org/${item.thumbnail}` }}
              style={styles.thumbnail1}
              resizeMode="cover"
              imageStyle={styles.imageBackground1}
            >
              <View
                style={[
                  styles.overlay1,
                  {
                    backgroundColor:
                      theme === "light"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.5)",
                  },
                ]}
              >
                <Text style={styles.videoTitle1}>{item.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    );
  };

  const initialLayout = { width: SIZES.width };

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "related", title: "Related" },
  ]);
  const renderScene = SceneMap({
    details: VideoDetails,
    related: RelatedVideos,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{
        backgroundColor:
          theme === "light" ? LightBgColors.headings : DarkBgColors.text,
      }}
      labelStyle={{
        color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
      }}
    />
  );
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          marginVertical: 10,
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
            fontSize: 24,
          }}
        >
          {video?.title}
        </Text>
      </View>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: `https://api.coinstarr.org/${video?.video}` }}
          style={styles.video}
          resizeMode="cover"
          useNativeControls
        />

        {/* Video Controls 
        <View style={styles.controls}>
          <TouchableOpacity onPress={isPlaying ? pauseVideo : playVideo}>
            {!isPlaying ? (
              <MaterialIcons
                name="play-circle-fill"
                size={backButtonSize}
                color={
                  theme === "light" ? DarkBgColors.text : LightBgColors.text
                }
              />
            ) : (
              <MaterialIcons
                name="pause-circle-filled"
                size={backButtonSize}
                color={
                  theme === "light" ? DarkBgColors.text : LightBgColors.text
                }
              />
            )}
          </TouchableOpacity>
        </View>
        */}
      </View>

      <View style={{ flex: 1, marginTop: 3 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9, // You can adjust the aspect ratio based on your video dimensions
  },

  controls: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    marginTop: 30,
  },
  thumbnail: {
    width: 120,
    height: 100,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },



  videoItem1: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail1: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground1: {
    borderRadius: 10,
  },
  overlay1: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 10,
  },
  videoTitle1: {
    color: "#FFF",
    fontSize: 12,
  },





















  
});

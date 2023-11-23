import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { API_URL, COLORS, SIZES } from "../../constants";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


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

        {/* Video Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={isPlaying ? pauseVideo : playVideo}>
            <Text>{isPlaying ? "Pause" : "Play"}</Text>
          </TouchableOpacity>
        </View>
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
});

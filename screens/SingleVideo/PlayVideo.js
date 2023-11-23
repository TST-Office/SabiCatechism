import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { API_URL, COLORS, SIZES } from "../../constants";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function PlayVideo() {
  const route = useRoute();
  const { video } = route.params;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: `https://api.coinstarr.org/${video?.video}` }}
          style={styles.video}
          resizeMode="contain"
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      video: {
        width: '100%',
        aspectRatio: 16 / 9, // You can adjust the aspect ratio based on your video dimensions
      },
      controls: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      },
});

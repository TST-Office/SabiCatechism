import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Container from "../../components/Container";
import { COLORS, SIZES } from "../../constants";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

const Messages = () => {
  const watchedVideos = useSelector((state) => state.watchedVideos);
  // console.log("wateched videos", watchedVideos);
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme);

  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;

  const handleVideoSelection = (item) => {
    const navigateToContent = () => {
      navigation.navigate("PlayVideo", { video: item });
    };

    return (
      <TouchableOpacity
        onPress={navigateToContent}
        style={styles.glassmorphicContainer}
      >
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
    noResultsText: {
      fontSize: 16,
      color: theme === "light" ? DarkBgColors.text : DarkBgColors.tabActiveText,
    },
    flatList: {
      flexGrow: 0, // Ensure the FlatList doesn't grow indefinitely
    },
    glassmorphicContainer: {
      margin: 5,
      padding: 5,
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
    container: {
      marginBottom: 50,
    },
  });

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
          Video History
        </Text>
      </View>
      <View style={styles.resultsContainer}>
        <View style={styles.container}>
          {watchedVideos?.length > 0 ? (
            <FlatList
              data={watchedVideos}
              keyExtractor={(item, index) => item.key || index.toString()}
              renderItem={handleVideoSelection}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Messages;

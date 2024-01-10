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
  console.log("wATCHED videos", watchedVideos);
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme);

  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;
  const numColumns = 4;
  const columnWidth = (SIZES.width - 20) / numColumns;

  const handleVideoSelection = ({ item }) => {
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
          resizeMode="cover"
        >
          <View style={styles.overlay} />
            <Text style={styles.title}>{item?.title}</Text>
           
        
        </ImageBackground>
      </TouchableOpacity>
    );
  }

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
      padding: 15,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      height: 170, 
      width: 170, 
      marginBottom: 1,
    },
  
    overlay: {
      ...StyleSheet.absoluteFillObject,
      padding: 16,
      justifyContent: "flex-end",
    },
  
    category: {
      fontSize: 14,
      color: "#fff",
    },
  
    length: {
      fontSize: 14,
      color: "#fff",
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
      fontSize: 14,
      fontWeight: "normal",
      color: "white",
      marginBottom: 8,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
   
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    flatList: {
      flexGrow: 0, // Ensure the FlatList doesn't grow indefinitely
      marginBottom: 2, // Adjust margin bottom to separate items
    },
  
    container: {
      marginBottom: 50,
      justifyContent: 'center',
      alignItems: 'center',
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
        <View style={styles.container}>
          {watchedVideos?.length > 0 ? (
            // In the FlatList component, set the numColumns prop
            <FlatList
              data={watchedVideos}
              keyExtractor={(item, index) => item.key || index.toString()}
              renderItem={handleVideoSelection}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>
    </Container>
  );
};

export default Messages;

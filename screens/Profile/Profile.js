import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../../constants/data";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
const PhotosRoutes = () => (
  


  <View style={{ flex: 1 }}>
    <FlatList
      data={photos}
      numColumns={3}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
          }}
        >
          <Image
            key={index}
            source={item}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
          />
        </View>
      )}
    />
  </View>
);

const LikesRoutes = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "blue",
    }}
  />
);

const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});

const Profile = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);

  // Define a style object for text and icon colors based on the theme
  const textAndIconStyles = {
    color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
  };
  // Define a style object for text and icon colors based on the theme
  const touchableBg = {
    color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
  };

  const [routes] = useState([
    { key: "first", title: "Photos" },
    { key: "second", title: "Likes" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: theme === "light" ? COLORS.primary : LightBgColors.primary,
      }}
      style={{
        backgroundColor: theme === "light" ? COLORS.primary : COLORS.primary,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? theme === "light" ? DarkBgColors.text : DarkBgColors.moon : theme === "light" ? LightBgColors.text : LightBgColors.sun }]}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.secondaryGray} />
      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={images.profile}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
            borderWidth: 5,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: theme === "light" ? DarkBgColors.text : COLORS.text,
            marginVertical: 8,
          }}
        >
          Melissa Peters
        </Text>
        <Text
          style={{
            color: theme === "light" ? DarkBgColors.text : COLORS.text,
            ...FONTS.body4,
          }}
        >
          Interior designer
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color={theme === "light" ? DarkBgColors.primary : LightBgColors.primary} />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
              color: theme === "light" ? DarkBgColors.text : COLORS.text
            }}
          >
            Lagos, Nigeria
          </Text>
        </View>


        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme === "light" ? DarkBgColors.headings : COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: theme === "light" ? DarkBgColors.text : COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme === "light" ? DarkBgColors.headings : COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: theme === "light" ? DarkBgColors.text : COLORS.white,
              }}
            >
              Add Friend
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, marginHorizontal: 15, marginTop: 20 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </Container>
  );
};

export default Profile;
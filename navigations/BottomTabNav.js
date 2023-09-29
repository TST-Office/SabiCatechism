import { View, Text, Platform } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import {Home, Profile, Settings, Blog, Messages } from "../screens";
import { useSelector } from "react-redux";
import { DarkBgColors, LightBgColors } from "../constants/theme";

const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);

  // Define a style object for text and icon colors based on the theme
  const textAndIconStyles = {
    color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
  };
  // Define a style object for text and icon colors based on the theme
  const touchableBg = () => {
     return theme === "light" ? DarkBgColors.background : LightBgColors.background
  };
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: touchableBg(),
  },
};
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? theme === "light" ? DarkBgColors.text : DarkBgColors.primary : theme === "light" ? LightBgColors.headings : LightBgColors.tabBackground}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={focused ? theme === "light" ? DarkBgColors.text : DarkBgColors.primary : theme === "light" ? LightBgColors.headings : LightBgColors.tabBackground}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Blog"
        component={Blog}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  height: Platform.OS == "ios" ? 50 : 60,
                  width: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}
              >
                <Fontisto name="plus-a" size={24} color={COLORS.white} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? theme === "light" ? DarkBgColors.text : DarkBgColors.primary : theme === "light" ? LightBgColors.headings : LightBgColors.tabBackground}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? theme === "light" ? DarkBgColors.text : DarkBgColors.primary : theme === "light" ? LightBgColors.headings : LightBgColors.tabBackground}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

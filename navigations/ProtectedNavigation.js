import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import {
  EditProfile,
  Login,
  Signup,
  Welcome,
  Profile,
  SearchScreen,
  AllVideos,
  AllBlog,
  PlayVideo,
  ReadBlog,
  RelatedVideoCategory,
  Subscription,
  PaySubscription,
  SubscriptionSuccessPage,
  UpdatePassword
} from "../screens";
import BottomTabNav from "./BottomTabNav";

const Stack = createNativeStackNavigator();

const ProtectedNavigation = () => {
  const user = useSelector((state) => state.user);
  return (
    <Stack.Navigator
      initialRouteName={user ? "BottomTabNavigation" : "Welcome"}
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllVideos"
        component={AllVideos}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllBlog"
        component={AllBlog}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlayVideo"
        component={PlayVideo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReadBlog"
        component={ReadBlog}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RelatedVideoCategory"
        component={RelatedVideoCategory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaySubscription"
        component={PaySubscription}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="SubscriptionSuccessPage"
        component={SubscriptionSuccessPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>

  );
};

export default ProtectedNavigation;

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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ProtectedNavigation;

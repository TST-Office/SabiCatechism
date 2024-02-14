import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Container from '../../components/Container';
import { useSelector, useDispatch } from "react-redux";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import successIcon from "./../../assets/success-icon.png";
import { logout as logoutAction } from "../../slices/userSlice";


const SubscriptionSuccessPage = ({ navigation }) => {

  const theme = useSelector((state) => state.theme);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <View style={{ alignItems: "center" }}>
        <Image source={successIcon} style={{ width: 200, height: 250, }} />
      </View>
      <Text style={{ fontSize: 60, color: theme === "light" ? LightBgColors.background : LightBgColors.headings, marginTop: -80, zIndex: -1 }}>Successful</Text>
      <Text style={{ color: theme === "light" ? LightBgColors.primary : DarkBgColors.bgGray, textAlign: 'center', fontSize: 20, marginTop: 20, lineHeight: 30 }}>Your subscription was successfully processed, enjoy the wonderful experience.</Text>

      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: theme === "light" ? "#fcfcfc" : DarkBgColors.background, marginTop: 20, borderRadius: 15 }}>
        <Text style={{ fontSize: 20, padding: 10, color: theme === "light" ? "#c1c1c1" : LightBgColors.primary, }}>Continue</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default SubscriptionSuccessPage

const styles = StyleSheet.create({})
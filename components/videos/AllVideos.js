import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useVideosSelector } from "../../components/videosSelector";
import {
  DarkBgColors,
  LightBgColors,
} from "../../constants/theme";
import { API_URL, COLORS, SIZES } from "../../constants";



const AllVideos = () => {
  const navigation = useNavigation();
  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;


    return (
        <Container>
            <Text>All video</Text>
        </Container>
    );
}

const styles = StyleSheet.create({})

export default AllVideos;

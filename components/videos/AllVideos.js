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
  SIZES,
  COLORS,
} from "../../constants/theme";


const AllVideos = () => {
  const navigation = useNavigation();

    return (
        <Container>
            <Text>All video</Text>
        </Container>
    );
}

const styles = StyleSheet.create({})

export default AllVideos;

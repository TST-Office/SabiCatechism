import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Fontisto } from "@expo/vector-icons";
// import Carousel from "../../components/Carousel";
import { COLORS, SIZES } from "../../constants";
import Container from "../../components/Container";
import HeaderSection from "../../components/HeaderSection";
import CategorySection from "../../components/CategorySection";
import LatestVideos from "../../components/videos/LatestVideos";
import LatestBlogs from "../../components/Blog/LatestBlogs";
import { useVideosSelector } from "../../components/videosSelector";

const Home = ({ navigation }) => {
  // const user = useSelector((state) => state.user);
  // console.log("check if user details was persisted with user details", user.user);
  // console.log("check if user details was persisted with user", user.user.created_at);
  const videos = useVideosSelector();
  // console.log("PERSISTED VIDEOS: ", videos.localUri);

  return (
    <Container>
      <HeaderSection onPress={() => navigation.navigate("Profile")} />
      <ScrollView>
        <CategorySection />
        {/* <Carousel /> */}
        <LatestVideos />
        <LatestBlogs />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;

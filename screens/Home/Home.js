import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Fontisto } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import { COLORS, SIZES } from "../../constants";
import Container from "../../components/Container"


const Home = () => {
  // const user = useSelector((state) => state.user);
  // console.log("check if user details was persisted with user details", user.userDetails);
  // console.log("check if user details was persisted with user", user.user.created_at);
  

  return (
    <Container>
      <Carousel />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;

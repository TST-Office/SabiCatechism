import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../../components/Carousel';

const Home = () => {
  // const user = useSelector((state) => state.user);
  // console.log("check if user details was persisted with user details", user.userDetails);
  // console.log("check if user details was persisted with user", user.user.created_at);

  return (
    <SafeAreaView>
      <Carousel />
    </SafeAreaView>
  )
}


export default Home
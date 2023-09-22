import { View, Text } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log("check if user details was persisted with user details", user.userDetails);
  console.log("check if user details was persisted with user", user.user.created_at);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}


export default Home
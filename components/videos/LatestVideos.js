import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { setVideos } from "../../slices/videoSlice";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { COLORS, API_URL } from "../../constants";
import { useVideosSelector } from "../videosSelector";
// import { useDispatch, useSelector } from "react-redux";


const LatestVideos = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  // const videos = useSelector((state) => state.videos);
  const [isLoading, setIsLoading] = useState(false);
  const videos = useVideosSelector();
  console.log("video slice function",videos);


  const VideoComponent = ({video}) => {
    return (
      <View>
        <Text>Title: {video?.title}</Text>
        <Text>Genre: {video?.genName}</Text>
        <Text>Category: {video?.catName}</Text>
        <Text>thumbnail: {video?.thumbnail}</Text>
        <Text>Rating: {video?.rateName}</Text>
        <Text>PG: {video?.PcName}</Text>
      </View>
    );
  }
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_URL}/allvideo`).then((response) => {
      if(response.data){
        setIsLoading(false)
        // set video details to redux
        dispatch(setVideos(response.data))
      }
    }).catch((error) => {
      console.log(error.message)
    })
  }, [dispatch])
  return (
    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
        <Text>Latest Videos</Text>
        <TouchableOpacity>
          <Text>Show more</Text>
        </TouchableOpacity>
      </View>
      {
        isLoading ? <ActivityIndicator color={"green"} size={"large"} /> : (
          <FlatList 
            data={videos} 
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item }) => <VideoComponent video={item} />}
            contentContainerStyle={{ columnGap: 12 }}
            showsHorizontalScrollIndicator={false}
          />
        )
      }
    </View>
  );
};

export default LatestVideos;

const styles = StyleSheet.create({});

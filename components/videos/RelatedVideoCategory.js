import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ImageBackground} from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useVideosSelector } from '../videosSelector';

const RelatedVideoCategory = () => {
    const route = useRoute();
    const {catName} = route.params;
    const videos = useVideosSelector();

    const getRelatedVideo = videos.filter((video) => video.catName === catName);
    console.log("category videos",getRelatedVideo);
    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default RelatedVideoCategory;

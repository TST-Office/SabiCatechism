import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Container from '../../components/Container';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import { API_URL, COLORS, SIZES } from '../../constants';
import { setBlogPosts } from '../../slices/blogSlice';
import { useVideosSelector } from '../../components/videosSelector';
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";




const SearchScreen = () => {
    const theme = useSelector((state) => state.theme);
    const videos = useVideosSelector();
    const blogs = setBlogPosts()
    return (
        <Container>
            <Text>search screen</Text>
        </Container>
    );
}

const styles = StyleSheet.create({})

export default SearchScreen;

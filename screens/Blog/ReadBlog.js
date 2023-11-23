import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DarkBgColors,
  LightBgColors,
  SIZES,
  COLORS,
} from "../../constants/theme";
import { formatDistanceToNow, parseISO } from "date-fns";
import Container from "../../components/Container";

const ReadBlog = () => {
  const route = useRoute();
  const { blog } = route.params;
  const theme = useSelector((state) => state.theme);

  const backButtonSize = 44;
  const backButtonMargin = 30;
  const backButtonTop = Platform.OS === "ios" ? 50 : backButtonMargin;

  // Format the date string to a readable format
  const formattedDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    blogImage: {
      width: "100%",
      height: 400,
      borderRadius: 8,
      marginBottom: 16,
      objectFit: 'cover'
    },
    title: {
      fontSize: SIZES.h2,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme === "light" ? DarkBgColors.text : DarkBgColors.tabActiveText,
    },
    authorDateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    author: {
      fontSize: SIZES.body2,
      color:  theme === "light" ? DarkBgColors.moon : DarkBgColors.bgGray,
    },
    date: {
      fontSize: SIZES.body2,
      color:  theme === "light" ? DarkBgColors.moon : DarkBgColors.bgGray,
    },
    content: {
      fontSize: SIZES.body3,
      lineHeight: 24,
      color:  theme === "light" ? DarkBgColors.text : COLORS.secondary,
      marginBottom: 50
    },
  });
  return (
    <Container>
      <ScrollView style={styles.container}>
        {/* Blog Image */}
        <Image
          source={{ uri: `https://api.coinstarr.org/${blog.thumbnail}` }}
          style={styles.blogImage}
        />

        {/* Blog Title */}
        <Text style={styles.title}>{blog.title}</Text>

        {/* Blog Author and Date */}
        <View style={styles.authorDateContainer}>
          <Text style={styles.author}>By {blog.author}</Text>
          <Text style={styles.date}>{formattedDate(blog.created_at)}</Text>
        </View>

        {/* Blog Content */}
        <Text style={styles.content}>{blog.description}</Text>
      </ScrollView>
    </Container>
  );
};

export default ReadBlog;

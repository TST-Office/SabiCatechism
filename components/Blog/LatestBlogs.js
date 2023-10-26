import React, {useEffect} from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const LatestBlogs = () => {
  const blogs = useSelector((state) => state.blog.posts);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
          
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LatestBlogs;

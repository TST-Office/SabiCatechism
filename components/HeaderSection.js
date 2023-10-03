import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES, FONTS } from "../constants";
import { images } from "../constants";
import { useSelector } from "react-redux";
import { DarkBgColors, LightBgColors } from "../constants/theme";

const HeaderSection = (props) => {
  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  // console.log("check if user details was persisted with user details", user.userDetails);
  // console.log("check if user details was persisted with user", user.user.created_at);
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor:
            theme === "light"
              ? DarkBgColors.background
              : LightBgColors.background,
            
        },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: FONTS.h2.fontSize,
            fontFamily: FONTS.h4.fontFamily,
            color: theme === "light" ? DarkBgColors.text : LightBgColors.text,
            textTransform: "capitalize"
          }}
        >
          {user.user.username}
        </Text>
      </View>
      <View>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={[
            styles.profileImage,
            {
              borderColor:
                theme === "light"
                  ? DarkBgColors.primary
                  : LightBgColors.primary,
            },
          ]}
          source={images.profile}
          resizeMode="contain"
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  header: {
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:12,
    paddingVertical:15
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 999,
    borderWidth: 1,
  },
});

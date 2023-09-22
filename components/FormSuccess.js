import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Overlay } from "@rneui/themed";
import { COLORS, SIZES, colors, images } from "../constants";
import Button from "./Button";

const FormSuccess = (props) => {
    
  const colorScheme = useColorScheme();

  return props.successMessage ? (
    <Overlay
      overlayStyle={
        colorScheme === "light" ? styles.lightBackground : styles.darkBackground
      }
      isVisible={true}
      onBackdropPress={() => props.close(false)}
    >
      <View style={styles.errorView}>
        <Image style={styles.errorIcon} source={images.checkedSuccess} />
      </View>
      <View style={styles.errorText}>
        <Text style={styles.textPrimary}>Successful!</Text>
        <Text style={styles.textSecondary}>{props.successMessage}</Text>
      </View>
      <Button
        title="OK"
        onPress={props.onPress}
        style={{
          marginTop: 22,
          width: "100%",
        }}
      />
    </Overlay>
  ) : (
    <Overlay
      overlayStyle={
        colorScheme === "light" ? styles.lightBackground : styles.darkBackground
      }
      isVisible={true}
    >
      <ActivityIndicator size={"large"} color={COLORS.secondary} />
    </Overlay>
  );
  return (
    <View>
      <Text>FormSuccess</Text>
    </View>
  );
};

export default FormSuccess;

const styles = StyleSheet.create({
  lightBackground: {
    backgroundColor: colors.white,
    width: SIZES.width75,
    height: SIZES.height320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius10,
  },
  darkBackground: {
    backgroundColor: colors.black,
    width: SIZES.width75,
    height: SIZES.height320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius10,
  },
  errorIcon: {
    width: SIZES.width70,
    height: SIZES.height70,
  },
  errorView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: SIZES.body3,
  },
  textSecondary: {
    marginTop: 20,
    textAlign: "center",
    color: colors.primary
  },
  btnError: {
    backgroundColor: COLORS.primary,
    width: SIZES.width100,
    borderRadius: SIZES.radius10,
    padding: SIZES.padding,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnErrorTxt: {
    color: COLORS.white,
    fontSize: SIZES.body3,
  },
});

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
import { color } from "@rneui/base";

const ErrorModal = (props) => {
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={true}
      onBackdropPress={() => props.hideErrorOverlay(false)}
    >
      <View style={styles.errorView}>
        <Image source={images.checkedError} style={styles.errorIcon} />
      </View>
      <View style={styles.errorText}>
        <Text style={styles.textPrimary}>Error!!</Text>
        <Text style={styles.textSecondary}>{props.err}</Text>
      </View>
      <Button
        title="OK"
        onPress={() => props.hideErrorOverlay(false)}
        style={{
          marginTop: 22,
          width: "50%",
          color: "white",
          backgroundColor: colors.error,
          borderColor: COLORS.white,
          alignSelf: "center",
          justifyContent: "center"
        }}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: SIZES.width75,
    height: SIZES.height320,
    justifyContent: "center",
    borderRadius: SIZES.radius10,
    backgroundColor: colors.error,
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
    color: "#ddd"
  },
  btnError: {
    backgroundColor: colors.bgError,
    width: SIZES.width100,
    borderRadius: SIZES.radius10,
    padding: SIZES.padding,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnErrorTxt: {
    color: colors.white,
    fontSize: SIZES.body2,
  },
  textPrimary:{
    color: "#fdfdfd",
    fontSize: 20,
    fontFamily: "semiBold"
  }
});

export default ErrorModal;

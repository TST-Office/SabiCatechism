import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Stylesheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, API_URL } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";
import axios from "axios";
import ErrorModal from "../../components/ErrorModal";
import FormSuccess from "../../components/FormSuccess";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const [displayModalSuccess, setDisplayModalSuccess] = useState(false);
  const [displayModalErr, setDisplayModalErr] = useState(false);


  const passwordChange = (value) => {
    setPassword(value);
  };

  const isUserChange = (value) => {
    setIsUser(value);
  };
  // Now try to log the user in
  const loginUser = () => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/login`, {
        username: isUser,
        password: password,
        devicename: Device.modelName,
      })
      .then((response) => {
        console.log("request sent", response.data, isUser);
        if (response.data.status === true) {
          setIsLoading(false)
          setSuccessMessage("Login successful")
          setPassword("")
          setIsUser("")
          console.log("Login success response: ", response.data.username);

          // set user details fetched from the api
          const userData = {
            id: response.data.username.id,
            userDetails: response.data,
            user: response.data.username
          }
          // persist the user details
          dispatch(setUser(userData))

        }
        if (response.data.status === false) {
          setIsLoading(false);
          setErrMessage(response.data.message);
          return setDisplayModalErr(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
          setErrMessage(error.message);
          return setDisplayModalErr(true);
        console.log("Login error code: ", error.message);
      });
    console.log("login function pinged", isUser, password);
  };
  // check if value is empty or undefined
  const isEmptyOrUndefined = (value) => {
    return value === "" || value === undefined;
  };

  // check if its a valid email
  const isValidEmail = (value) => {
    return value.includes("@");
  };

  // check if its a valid email format
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  // is valid username
  const isValidUsername = (value) => {
    return value.match(/^[a-zA-Z0-9_]+$/);
  };

  // is valid username format
  const isValidUsernameFormat = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  };

  // run all validation function
  const validateInput = (isUser, password) => {

    if (isEmptyOrUndefined(isUser) || isEmptyOrUndefined(password)) {
      setErrMessage("All fields are required!!");
      return setDisplayModalErr(true);
    }



    if (isValidEmail(isUser)) {
      if (!isValidEmailFormat(isUser)) {
        setErrMessage("Invalid email format!");
        return setDisplayModalErr(true);
      }
    } else if (isValidUsername(isUser)) {
      if (!isValidUsernameFormat(isUser)) {
        setErrMessage("Invalid username format!");
        return setDisplayModalErr(true);
      }
    } else {
      setErrMessage("Invalid email or username!!");
      return setDisplayModalErr(true);
    }

    if (password.length < 6) {
      setErrMessage("Password is too short!");
      return setDisplayModalErr(true);
    }
    // validation run the login user function
    loginUser();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Hi Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Hello again you have been missed!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email / Username
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email or username"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              onChangeText={isUserChange}
              value={isUser}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              onChangeText={passwordChange}
              value={password}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={() => validateInput(isUser, password)}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Don't have an account ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>

      {displayModalErr === true ? (
        <ErrorModal hideErrorOverlay={setDisplayModalErr} err={errMessage} />
      ) : null}

      {isLoading === true ? (
        <FormSuccess />
      ) : successMessage == "Login successful" ? (
        <FormSuccess
          successMessage={successMessage}
          close={setSuccessMessage}
          onPress={() => navigation.navigate("BottomTabNavigation")}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Login;

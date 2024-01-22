import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../../constants/data";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import * as Device from 'expo-device'
import axios from "axios";
import ErrorModal from "../../components/ErrorModal";
import FormSuccess from "../../components/FormSuccess";
import { API_URL } from "../../constants";



const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.user.name);
  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [userId, setUserId] = useState(user.user.id);

  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const [displayModalSuccess, setDisplayModalSuccess] = useState(false);
  const [displayModalErr, setDisplayModalErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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
    // is valid name
    const isValidName = (value) => {
        // Allow letters, spaces, and hyphens
        return /^[a-zA-Z\s-]+$/.test(value);
    };

    // is valid name format
    const isValidNameFormat = (name) => {
        // Allow letters, spaces, and hyphens
        const nameRegex = /^[a-zA-Z\s-]+$/;
        return nameRegex.test(name);
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
    // validate email
    const handleEmailValidation = (email) => {
        if (isValidEmail(email)) {
            if (!isValidEmailFormat(email)) {
                setErrMessage("Invalid email format!");
                return setDisplayModalErr(true);
            }
        } else {
            setErrMessage("Invalid email!");
            return setDisplayModalErr(true);
        }
    };

    const handleUsernameValidation = (username) => {
        if (isValidUsername(username)) {
            if (!isValidUsernameFormat(username)) {
                setErrMessage("Invalid username format!");
                return setDisplayModalErr(true);
            }
        } else {
            setErrMessage("Invalid username!");
            return setDisplayModalErr(true);
        }
    };
    const handleNameValidation = (name) => {
        if (isValidName(name)) {
            if (!isValidNameFormat(name)) {
                setErrMessage("Invalid name format!");
                return setDisplayModalErr(true);
            }
        } else {
            setErrMessage("Invalid name!");
            return setDisplayModalErr(true);
        }
    };

    const validateInput = (username, name, email) => {
      if (isEmptyOrUndefined(username) || isEmptyOrUndefined(name) || isEmptyOrUndefined(email)) {
          setErrMessage("All fields are required!!");
          return setDisplayModalErr(true);
      }
    
      handleEmailValidation(email);
      handleUsernameValidation(username);
      handleNameValidation(name);
      // registerUser();

  }

 

 
  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
       

        <View style={{marginTop: 50}}>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Username</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={username}
                onChangeText={(value) => setUsername(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
              />
            </View>
          </View>

       

        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => validateInput(username, name, email)}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>
        {displayModalErr === true ? (
                <ErrorModal hideErrorOverlay={setDisplayModalErr} err={errMessage} />
            ) : null}

            {isLoading === true ? (
                <FormSuccess />
            ) : successMessage == "Signup successful" ? (
                <FormSuccess
                    successMessage={successMessage}
                    close={setSuccessMessage}
                    onPress={() => navigation.navigate("Login")}
                />
            ) : null}
      </ScrollView>

    </Container>
  );
};

export default EditProfile;

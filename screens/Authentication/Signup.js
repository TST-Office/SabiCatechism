import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../../components/Button';
import * as Device from 'expo-device'
import axios from "axios";
import ErrorModal from "../../components/ErrorModal";
import FormSuccess from "../../components/FormSuccess";
import { API_URL } from "../../constants";


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState(false);

    const [displayModalSuccess, setDisplayModalSuccess] = useState(false);
    const [displayModalErr, setDisplayModalErr] = useState(false);

    // set username value
    const usernameChange = (value) => {
        setUsername(value);
    };

    // set name value
    const nameChange = (value) => {
        setName(value);
    };


    // set email value
    const emailChange = (value) => {
        setEmail(value);
    };


    // set password value
    const passwordChange = (value) => {
        setPassword(value);
    };

    // set password value
    const confirmPasswordChange = (value) => {
        setConfirmPassword(value);
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
    const validateInput = (username, name, email, password, confirmPassword) => {
        if (isEmptyOrUndefined(username) || isEmptyOrUndefined(name) || isEmptyOrUndefined(email) || isEmptyOrUndefined(password) || isEmptyOrUndefined(confirmPassword)) {
            setErrMessage("All fields are required!!");
            return setDisplayModalErr(true);
        }
        if (password.length < 8) {
            setErrMessage("Password is too short!");
            return setDisplayModalErr(true);
        }

        if (password !== confirmPassword) {
            setErrMessage("Password Does Not Match!");
            return setDisplayModalErr(true);
        }
        handleEmailValidation(email);
        handleUsernameValidation(username);
        handleNameValidation(name);
        registerUser();

    }

    const registerUser = () => {
        setIsLoading(true);
        axios
          .post(`${API_URL}/register`, {
            username: username,
            name: name,
            email: email,
            password: password,
            devicename: Device.modelName,
          })
          .then((response) => {
            console.log("request sent", response.data);
            if (response.data.status === true) {
              setIsLoading(false)
              setSuccessMessage("Signup successful")
              setUsername("")
              setName("")
              setEmail("")
              setPassword("")
              setConfirmPassword("")
              console.log("Registration successful: ", response.data.user);
    
              // set user details fetched from the api
            //   const userData = {
            //     id: response.data.username.id,
            //     userDetails: response.data,
            //     user: response.data.username
            //   }
            //   // persist the user details
            //   dispatch(setUser(userData))
    
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
            console.log("registration error code: ", error.message);
          });
      };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>It's time to Have fun!</Text>
                </View>


                {/* username   */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Username</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter username'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            value={username}
                            onChangeText={usernameChange}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                {/* name   */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Name</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            value={name}
                            onChangeText={nameChange}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                {/* email address  */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            value={email}
                            onChangeText={emailChange}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>


                {/* password  */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            value={password}
                            onChangeText={passwordChange}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                {/* confirm password  */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Confirm Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Confirm password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            value={confirmPassword}
                            onChangeText={confirmPasswordChange}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>


                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={() => validateInput(username, name, email, password, confirmPassword)}
                />



                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
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
        </SafeAreaView>
    )
}

export default Signup
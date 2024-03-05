import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import ThemeToggleButton from "../../components/ThemeToggleButton"
const UpdatePassword = () => {
  const dispatch = useDispatch()
  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);
  return (
    <ScrollView>
       

    <View style={{marginTop: 50}}>
      <View
        style={{
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Text style={{ ...FONTS.h4, color: theme === "light" ? DarkBgColors.text : LightBgColors.text }}>Current Password</Text>
        <View
          style={{
            height: 44,
            width: "100%",
            borderColor: theme === "light" ? DarkBgColors.text : LightBgColors.text,
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
            style={{color: theme === "light" ? DarkBgColors.moon : LightBgColors.text}}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Text style={{ ...FONTS.h4, color: theme === "light" ? DarkBgColors.text : LightBgColors.text }}>New Password</Text>
        <View
          style={{
            height: 44,
            width: "100%",
            borderColor: theme === "light" ? DarkBgColors.text : LightBgColors.text,
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
            style={{color: theme === "light" ? DarkBgColors.moon : LightBgColors.text}}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Text style={{ ...FONTS.h4, color: theme === "light" ? DarkBgColors.text : LightBgColors.text }}>Confirm New Password</Text>
        <View
          style={{
            height: 44,
            width: "100%",
            borderColor: theme === "light" ? DarkBgColors.text : LightBgColors.text,
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
            style={{color: theme === "light" ? DarkBgColors.moon : LightBgColors.text}}
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
        Update Changes
      </Text>
    </TouchableOpacity>
    {displayModalErr === true ? (
            <ErrorModal hideErrorOverlay={setDisplayModalErr} err={errMessage} />
        ) : null}

        {isLoading === true ? (
            <FormSuccess />
        ) : successMessage == "Profile details updated successfully" ? (
            <FormSuccess
                successMessage={successMessage}
                close={setSuccessMessage}
                onPress={handleLogout}
            />
        ) : null}
  </ScrollView>
  )
}

export default UpdatePassword

const styles = StyleSheet.create({})
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Container from '../../components/Container';
import { useSelector, useDispatch } from "react-redux";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { logout as logoutAction } from "../../slices/userSlice";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch()
  // Access the current theme from the Redux store
  const theme = useSelector((state) => state.theme);

  // Define a style object for text and icon colors based on the theme
  const textAndIconStyles = {
    color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
  };
  // Define a style object for text and icon colors based on the theme
  const touchableBg = {
    color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
  };
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    console.log("Support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToFreeSpace = () => {
    console.log("Free Space function");
  };

  const navigateToDateSaver = () => {
    console.log("Date saver");
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  

  const logout = () => {
    dispatch(logoutAction());
    navigation.navigate('Login');
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Edit Profile",
      action: navigateToEditProfile,
    },
    
  ];

  const supportItems = [
    {
      icon: "credit-card",
      text: "My Subscription",
      action: navigateToSubscription,
    },

    
  ];


  const actionsItems = [
    {
      icon: "outlined-flag",
      text: "Report a problem",
      action: navigateToReportProblem,
    },
    { icon: "logout", text: "Log out", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: theme === "light" ? DarkBgColors.bgGray : LightBgColors.bgGray,
      }}
    >
      <MaterialIcons name={icon} size={24} color={theme === "light" ? DarkBgColors.headings : COLORS.primary} />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
          color: theme === "light" ? DarkBgColors.text : LightBgColors.text
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
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

        <Text style={{ ...FONTS.h3, ...textAndIconStyles }}>Settings</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12, marginTop:20 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10, ...textAndIconStyles }}>Account</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: {touchableBg},
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10, ...textAndIconStyles  }}>
            Support & About{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Theme settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10, ...textAndIconStyles  }}>
            Theme Setting{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
              <ThemeToggleButton />
            
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10, ...textAndIconStyles  }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;

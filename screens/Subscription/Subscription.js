import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Container from '../../components/Container';
import { useSelector, useDispatch } from "react-redux";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import * as Device from 'expo-device'
import axios from "axios";
import ErrorModal from "../../components/ErrorModal";
import FormSuccess from "../../components/FormSuccess";
// import { API_URL } from "../../constants";
import { setInvestmentPackage } from '../../slices/investmentPackageSlice';
import {API_URL, SIZES } from "../../constants";


const Subscription = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const subscriptionPackages = useSelector((state) => state.investmentPackage);
    // console.log("SUBSCRIPTION PACKAGES", subscriptionPackages);

    const user = useSelector((state) => state.user);
    // console.log("user details", user.userDetails.user_plan);
    const [userPlan, setUserPlan] = useState(user.userDetails.user_plan)


    const theme = useSelector((state) => state.theme);
    // Define a style object for text and icon colors based on the theme
    const textAndIconStyles = {
        color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
    };
    // Define a style object for text and icon colors based on the theme
    const touchableBg = {
        color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
    };

    const subscriptionPackageView = (item) => {
        return (
            <TouchableOpacity onPress={() => ""}>
                <Text>subscription packages</Text>
            </TouchableOpacity>
        )
    }

    const dispatch = useDispatch();
    return (
        <Container>
            <View
                style={{
                    marginTop: 20,
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

                <Text style={{ ...FONTS.h3, ...textAndIconStyles }}>Subscription</Text>
            </View>

            <View style={styles.main}>
                {
                    userPlan ? (
                        <Text>MY Plan Details</Text>
                    ) : (

                        <FlatList
                            data={subscriptionPackages}
                            renderItem={({ item }) => <subscriptionPackageView item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{columnGap: SIZES.large}}
                            horizontal

                        />

                    )
                }
            </View>
            <Text>Subscription</Text>
        </Container>
    )
}

export default Subscription

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
    }
})
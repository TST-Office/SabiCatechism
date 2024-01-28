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
import { API_URL, SIZES } from "../../constants";


const Subscription = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const subscriptionPackages = useSelector((state) => state.investmentPackage);
    // console.log("SUBSCRIPTION PACKAGES", subscriptionPackages);

    const user = useSelector((state) => state.user);
    const [userPlan, setUserPlan] = useState(user.userDetails.user_plan)
    // console.log("user details", userPlan);



    const theme = useSelector((state) => state.theme);
    // Define a style object for text and icon colors based on the theme
    const textAndIconStyles = {
        color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
    };
    // Define a style object for text and icon colors based on the theme
    const touchableBg = {
        color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
    };

    const SubscriptionPackageView = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.packageContainer}
                onPress={() => {
                    // Handle the onPress action here (e.g., navigate to payment screen)
                    navigation.navigate("PaySubscription", {subscription: item})
                }}
            >
                <Text style={styles.packageName}>{item.name}</Text>
                <Text style={styles.packageAmount}>Amount: ₦{item.amount}</Text>
                <Text style={styles.packageDuration}>Duration: {item.duration_in_name}</Text>
            </TouchableOpacity>
        );
    };

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
                    userPlan.length ? (
                        <Text>You have an active plan: {userPlan}</Text>
                    ) : (
                        <View style={styles.main}>
                            <FlatList
                                data={subscriptionPackages}
                                renderItem={({ item }) => <SubscriptionPackageView item={item} />}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={styles.flatListContainer}
                            />
                        </View>
                    )}
            </View>
        </Container>
    )
}

export default Subscription

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 20,
    },
    flatListContainer: {
        paddingHorizontal: 16,
    },
    packageContainer: {
        backgroundColor: '#e0e0e0',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    packageName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    packageAmount: {
        fontSize: 16,
        marginTop: 8,
    },
    packageDuration: {
        fontSize: 16,
        marginTop: 8,
    },
})
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
import LogoManager from '../../components/LogoManager';


const Subscription = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const subscriptionPackages = useSelector((state) => state.investmentPackage);
    // console.log("SUBSCRIPTION PACKAGES", subscriptionPackages);

    const user = useSelector((state) => state.user);
    const [userPlan, setUserPlan] = useState(user.userDetails.user_plan)
    console.log("user details", userPlan[0]);
    console.log("USER: ", user.userDetails);



    const theme = useSelector((state) => state.theme);
    // Define a style object for text and icon colors based on the theme
    const textAndIconStyles = {
        color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
    };
    // Define a style object for text and icon colors based on the theme
    const touchableBg = {
        color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
    };
    // Format start date
    const startDate = new Date(userPlan[0]?.created_at);
    const startDateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };
    const formattedStartDate = startDate.toLocaleDateString("en-US", startDateOptions);

    // Format end date
    const endDate = new Date(user.userDetails.expiry_date);
    const endDateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };
    const formattedEndDate = endDate.toLocaleDateString("en-US", endDateOptions);


    const SubscriptionPackageView = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.packageContainer}
                onPress={() => {
                    // Handle the onPress action here (e.g., navigate to payment screen)
                    navigation.navigate("PaySubscription", { subscription: item })
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
            <LogoManager />
        <View style={{ marginTop: 30 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute",
                    left: 0,
                    paddingHorizontal: 12
                }}
            >
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color={theme === "light" ? DarkBgColors.text : LightBgColors.text}
                />
            </TouchableOpacity>
            <Text style={{ ...FONTS.h1, ...textAndIconStyles, textAlign: 'center' }}>Subscription Plans</Text>
        </View>

        <View style={styles.main}>
            {userPlan.length ? (
                <View style={styles.activePlanContainer}>
                    <Text style={styles.activePlanHeading}>Your Active Plan:</Text>
                    <View style={styles.activePlanItem}>
                        <Text style={styles.activePlanItemLabel}>Plan Name:</Text>
                        <Text style={styles.activePlanItemValue}>{userPlan[0].name}</Text>
                    </View>
                    <View style={styles.activePlanItem}>
                        <Text style={styles.activePlanItemLabel}>Transaction Code:</Text>
                        <Text style={styles.activePlanItemValue}>{userPlan[0].transaction_reference}</Text>
                    </View>
                    <View style={styles.activePlanItem}>
                        <Text style={styles.activePlanItemLabel}>Duration:</Text>
                        <Text style={styles.activePlanItemValue}>{userPlan[0].duration_in_name}</Text>
                    </View>
                    <View style={styles.activePlanItem}>
                        <Text style={styles.activePlanItemLabel}>Start Date:</Text>
                        <Text style={styles.activePlanItemValue}>{formattedStartDate}</Text>
                    </View>
                    <View style={styles.activePlanItem}>
                        <Text style={styles.activePlanItemLabel}>End Date:</Text>
                        <Text style={styles.activePlanItemValue}>{formattedEndDate}</Text>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={subscriptionPackages}
                    renderItem={({ item }) => <SubscriptionPackageView item={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContainer}
                />
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
    activePlanContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 12,
        marginTop: 50,
        marginHorizontal: 30,

        
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    activePlanHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    activePlanList: {
        paddingHorizontal: 16,
    },
    activePlanItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    activePlanItemLabel: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    activePlanItemValue: {
        flex: 1,
    },
})
import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/Container";
import { COLORS, SIZES, API_URL, FONTS } from "../../constants";
import { DarkBgColors, LightBgColors } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { PAYSTACK_SDK } from "../../constants/api";
import { setUser } from "../../slices/userSlice";
import axios from "axios";
import { logout as logoutAction } from "../../slices/userSlice";
import LogoManager from "../../components/LogoManager";




const PaySubscription = ({ navigation }) => {
    const paystackWebViewRef = useRef(paystackProps.PayStackRef);

    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const user = useSelector((state) => state.user);
    // console.log(user.user.id)


    // Define a style object for text and icon colors based on the theme
    const textAndIconStyles = {
        color: theme === "light" ? DarkBgColors.headings : DarkBgColors.headings,
    };
    // Define a style object for text and icon colors based on the theme
    const touchableBg = {
        color: theme === "light" ? DarkBgColors.primary : LightBgColors.primary,
    };

    const route = useRoute();
    const { subscription } = route.params;


    const [subscriptionDetails, setSubscriptionDetails] = useState({
        amount: "",
        durationName: "",
        durationInNumber: "",
        id: "",
        name: "",
        email: user.user.email,
        userId: user.user.id,
    });

    useEffect(() => {
        if (subscription) {
            const {
                id,
                name,
                duration_in_name,
                amount,
                duration_in_number,
            } = subscription;
            setSubscriptionDetails((prevState) => ({
                ...prevState,
                amount,
                durationName: duration_in_name,
                durationInNumber: duration_in_number,
                id,
                name,
            }));
        }
    }, [subscription]);


    // display selected subscription plan
    const DisPlaySubscription = ({ item }) => {
        return (
            <View style={styles.packageContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.packageName}>{item.name}</Text>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.packageAmount}>Amount: ₦{item.amount}</Text>
                    <Text style={styles.packageDuration}>Duration: {item.duration_in_name}</Text>
                </View>
            </View>
        );
    };

    const handleCancel = () => {
        Toast.show("Transaction Cancelled!", {
            duration: Toast.durations.LONG,
            backgroundColor: "red",
            shadow: true,
            animation: true,
            hideOnPress: true,
            position: Toast.positions.BOTTOM,
        });
    };

    const handleSuccess = (res) => {
        const {
            amount,
            durationInNumber,
            id,
            userId,
        } = subscriptionDetails;

        axios
            .post(`${API_URL}/payment`, {
                userId: parseInt(userId),
                paymentPlanId: parseInt(id),
                duration: parseFloat(durationInNumber),
                transactionReference: res.data.transactionRef.reference,
                amount,
                payment_type: "Online Payment with Paystack",
            })
            .then((response) => {
                console.log("Payment API response:", response.data);
                if (response.data.status === true) {
                    // Handle successful payment
                    Toast.show("Transaction Approved!", {
                        duration: Toast.durations.LONG,
                    });
                    navigation.navigate("SubscriptionSuccessPage");
                } else {
                    // Handle failed payment
                    Toast.show(response.data.message, {
                        duration: Toast.durations.LONG,
                        backgroundColor: "red",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        position: Toast.positions.BOTTOM,
                    });
                }
            })
            .catch((error) => {
                console.error("Error from payment API:", error);
                // Handle API request error
                Toast.show("Error processing payment. Please try again later.", {
                    duration: Toast.durations.LONG,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    position: Toast.positions.BOTTOM,
                });
            });
    };

    return (
        <Container>
            <LogoManager />
            <View
                style={{
                    marginTop: 20,
                    marginHorizontal: 12,
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20
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

                <Text style={{ ...FONTS.h3, ...textAndIconStyles }}>Pay Subscription</Text>
            </View>

            <View style={styles.main}>
                <View style={{ flex: 1 }}>
                    <Paystack
                        paystackKey={PAYSTACK_SDK}
                        billingEmail={subscriptionDetails.email}
                        amount={subscriptionDetails.amount}
                        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
                        onCancel={handleCancel}
                        onSuccess={handleSuccess}
                        ref={paystackWebViewRef}
                    />
                </View>

                <View style={styles.main}>
                    <FlatList
                        data={[subscription]}
                        renderItem={({ item }) => <DisPlaySubscription item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.subscribeButton} onPress={() => paystackWebViewRef.current.startTransaction()}>
                <Image source={require("../../assets/Paystack.png")} style={styles.paystackLogo} />
                <Text style={styles.subscribeText}>Subscribe Now</Text>
            </TouchableOpacity>

        </Container>
    )
}

export default PaySubscription

const styles = StyleSheet.create({
    main: {
        // flex: 1,
        marginTop: 20,
    },
    flatListContainer: {
        paddingHorizontal: 16,
    },
    packageContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 200
    },
    cardHeader: {
        backgroundColor: "#3498db",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
    },
    packageName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    cardBody: {
        padding: 10,
    },
    packageAmount: {
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20
    },
    packageDuration: {
        fontSize: 20,
    },
    subscribeButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 20,
        marginTop: 20,
        // Shadow properties
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    paystackLogo: {
        width: 150,
        height: 24,
        marginRight: 10,
    },
    subscribeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.white,
    },
})
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
import { Paystack } from "react-native-paystack-webview";


const PaySubscription = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const user = useSelector((state) => state.user);
    console.log(user.user.email)


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
    const [amount, setAmount] = useState('');
    const [durationName, setDurationName] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, SetEmail] = useState(user.user.email)

    useEffect(() => {
        if (subscription) {
            const { id, name, duration_in_name, amount } = subscription
            setId(id)
            setName(name)
            setDurationName(duration_in_name)
            setAmount(amount)
        }
    }, [subscription])
    console.log(durationName)
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

                <Text style={{ ...FONTS.h3, ...textAndIconStyles }}>Pay Subscription</Text>
            </View>

            <View style={styles.main}>

                <View style={styles.main}>
                    <FlatList
                        data={[subscription]}
                        renderItem={({ item }) => <DisPlaySubscription item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.subscribeButton} onPress={()=> ''}>
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
        marginTop:20
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
    },
    paystackLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    subscribeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.white,
    },
})
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { EditProfile, Login, Signup, Welcome, Profile } from "./screens";
import BottomTabNav from "./navigations/BottomTabNav";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./slices/store";

//  number of downloads and location
//  user subscriptIon admin info
//  nav link will be called subscription plans
//  subscribed members 
//  name in payment details for single user
//  username, amount, reference, status, remove email
//  NOTE: count how many times a user have paid for subscription ***
//  NOTE: show number of times user subscribed to a plan and the name of the plan***

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  
  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    semiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNav}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

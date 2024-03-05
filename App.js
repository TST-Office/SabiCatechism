import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./slices/store";
import ProtectedNavigation from "./navigations/ProtectedNavigation";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useSelector } from "react-redux";
import { ThemeProvider } from "./components/ThemeContext";
import { RootSiblingParent } from 'react-native-root-siblings';
import { LogBox } from 'react-native';
//  number of downloads and location
//  user subscriptIon admin info
//  nav link will be called subscription plans
//  subscribed members
//  name in payment details for single user
//  username, amount, reference, status, remove email
//  NOTE: count how many times a user have paid for subscription ***
//  NOTE: show number of times user subscribed to a plan and the name of the plan***

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    semiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  // temporal fix for now
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     await SplashScreen.hideAsync();
  //   }, 5000); // 5 seconds delay

  //   return () => clearTimeout(timeoutId);
  // }, []);
  useEffect(() => {
    const loadFontsAndHideSplash = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    if (fontsLoaded) {
      loadFontsAndHideSplash();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <ThemeProvider>
            <NavigationContainer>
              <ProtectedNavigation />
            </NavigationContainer>
          </ThemeProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

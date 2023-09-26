import { useColorScheme } from "react-native";
import React, {createContext, useContext, useEffect, useState} from "react";
import { LightBgColors, DarkBgColors } from "./ThemeColors";

export const ThemeContext = createContext({
    dark: false,
    colors: LightBgColors,
    setScheme: () => {}
})


export const ThemeProvider = (props) => {
    const colorScheme = useColorScheme(colorScheme == "dark");
    const [isDark, setIsDark] = useState(colorScheme == "dark");

    useEffect(() => {
        setIsDark(colorScheme == "dark");
    }, [colorScheme]);


    const defaultTheme = {
        dark: isDark,
        colors: isDark ? DarkBgColors : LightBgColors,
        setScheme: (scheme) => setIsDark(scheme === "dark")
    }
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
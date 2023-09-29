import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: '#242760',
    secondary: '#544C4C',
    white: '#FFFFFF',
    black: '#000000',
    gray: 'rgba(36, 39, 96, 0.05)',
    secondaryGray: 'rgba(84, 76, 76, 0.14)'
}

export const DarkBgColors = {
    background: "rgb(8, 14, 44)",
    primary: "#183D3D",
    text: "#E6E6FA",
    headings: "#5C8374",
    tabBackground: "#007260",
    tabActiveText: "#333366",
    bgGray: 'rgba(4, 59, 99, 0.4)',
    moon: "#F6F1D5"
}

export const LightBgColors = {
    background: "#F6F6F6",
    primary: "#D9CAB3",
    text: "#212121",
    headings: "#6D9886",
    tabBackground: "#39B68D",
    tabActiveText: "#000080",
    bgGray: 'rgba(0, 114, 96, 0.05)',
    sun: "#FDB813"

}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,
    radius10: 10,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 20,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
    width75: "75%",
    height320: 320,
    height70: 70,
    width70: 70 ,
    width100: "100%"
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS, DarkBgColors, LightBgColors }

export default appTheme
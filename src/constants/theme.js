import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");



export const COLORS = {
    black : "#1E1E1E",
    white: "#FFFFFF",
    red:"#c50000",
    lightred: "#f9aeae",
    gray: "#6A6A6A",
    blue: "#22A6F2",
    lightblue:"#9bedff",
    green: "#40ED91",
    lightgreen:"#DDFFBB",
    pink: "#FD948B",
    lightpink:"#f6f2f2",
    drakpink: "#FB2576",
    organ: "#FF6000",
    yelow: "#FFD93D",
    goldyelow: "#FF8400",
    violet: "#F10086"
};

export const SIZES = {
//Goble sizes
    base: 9,
    font: 14,
    radius: 12,
    padding: 24,
// Font sizes
   h1: 30,
   h2: 22,
   h3: 16,
   h4: 14,
   body1: 30,
   body2: 22,
   body3: 16,

//App dimension
    width,
    height,
};

export const FONTS={
    h1:{  fontFamily: "font", fontSize: SIZES.h1, lineHeight: 36}

};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;

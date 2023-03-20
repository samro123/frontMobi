import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

export const COLORS = {
    black : "#1E1E1E",
    white: "#FFFFFF",
    gray: "#6A6A6A",
    blue: "#22A6F2"
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
    h1:{  fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36}

};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;

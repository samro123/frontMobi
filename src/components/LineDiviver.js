import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme, icons, imgages } from "../constants";
const {COLORS, SIZES, FONTS} = theme;


const LineDiviver = ({lineStyle}) =>{
        return(
            <View style={{ height: 2, width: "100%",backgroundColor: COLORS.gray, ...lineStyle}}/>
        )
}

export default LineDiviver;
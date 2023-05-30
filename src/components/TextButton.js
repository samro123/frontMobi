import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from "../constants";
const {COLORS, SIZES, FONTS} = theme;


const TextButton = ({
    contentContainerStyle,
    disabled,
    lable,
    labelStyle,
    onPress
})=>{
    return (
        <TouchableOpacity style={{ alignItems: 'center', justifyContent:'center', ...contentContainerStyle }} 
         disabled={disabled}
         onPress={onPress}
        
        >
            <Text style={{ color:COLORS.white, ...labelStyle }}>{lable}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;
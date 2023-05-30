import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme, icons, imgages } from "../constants";
const {COLORS, SIZES, FONTS} = theme;
const ProfileValue = ({icon, lable, value, onPress}) => {
  return (
    <TouchableOpacity style={{ flexDirection:'row', height: 80, alignItems:'center' }} onPress={onPress}>
        {/* Icon */}
        <View style={{ width: 40, height: 40, alignItems: 'center', borderRadius:20, backgroundColor:COLORS.lightpink, justifyContent:'center' }}>
            <Image 
            source={icon}
            resizeMode='contain'
            style={{ width: 25, height: 25, tintColor: COLORS.blue }}
            />
        </View>

        <View
         style={{ flex:1 , marginLeft: SIZES.radius}}  
        >
          {lable && 
           <Text style={{ color: COLORS.gray }}>
            {lable}
           </Text>
 
          }
          <Text style={{fontSize: 10}}>{value}</Text>

        </View>

    </TouchableOpacity>
  )
}

export default ProfileValue
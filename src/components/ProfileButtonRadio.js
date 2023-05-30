import { View, Text, Image, TouchableOpacity, Animated, } from 'react-native'
import React from 'react'
import { theme, icons, imgages } from "../constants";
const {COLORS, SIZES, FONTS} = theme;

const ProfileButtonRadio = ({icon, lable , isSelection,onPress}) => {

    const radioAnimated = React.useRef(new Animated.Value(0)).current;
    const circleColorAnimated = radioAnimated.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.gray,COLORS.blue]
    })
    const lineColorAnimated = radioAnimated.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.red, COLORS.lightred]

    })

    React.useEffect(()=>{
        if(isSelection){
            Animated.timing(radioAnimated,{
                toValue:17,
                duration:300,
                useNativeDriver: false
            }).start();
        } else{
            Animated.timing(radioAnimated,{
                toValue:0,
                duration:300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelection])

  return (
    <View style={{ flexDirection: 'row', height: 80, alignItems: 'center' }}>
        {/* */}
        <View style={{ width: 40, height: 40,alignItems: 'center',justifyContent:'center',backgroundColor:COLORS.gray,borderRadius: 20 }}>
            <Image source={icon} resizeMode='contain' style={{ width: 25, height: 25,tintColor: COLORS.blue }}/>
        </View>

        {/*Lable*/}
        <View style={{ flex: 1,marginLeft: SIZES.radius }}>
            <Text style={{ fontSize: 10 }}>{lable}</Text>
        </View>

        {/**/}
        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent:'center' }}
         onPress={onPress}
        >
            <Animated.View style={{ 
            width: '100%',
            height: 5, 
            borderRadius: 3,
            backgroundColor:lineColorAnimated // Animated
            
            }}/>

            <Animated.View style={{ 
                position: 'absolute',
                left: radioAnimated, //Animate
                width: 25,
                height: 25,
                borderRadius: 15,
                borderWidth: 5,
                borderColor: circleColorAnimated,
                backgroundColor:COLORS.white
             }} />
        </TouchableOpacity>
     
    </View>
  )
}

export default ProfileButtonRadio
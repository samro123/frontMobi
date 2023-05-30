import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, SafeAreaView,TextInput } from 'react-native'
import React from 'react'
import Animated, {
    interpolate,
    useAnimatedStyle,
    withDelay,
    withTiming
} from "react-native-reanimated"

import {icons, imgages, theme} from '../../src/constants'
import {ProgressBar, AppHeader, Buttons,TextButton, ProfileValue, LineDiviver,ProfileButtonRadio} from "../components"
import { ScrollView } from 'react-native-gesture-handler'

const {COLORS, SIZES, FONTS} = theme;

const BottomPopup = ({filterModalSharedValue1,filterModalSharedValue2,id, name, icon}) => {
      console.log(name)
    //const {item} = this.props
    //const {item} = props;
   //console.log(item)
    

    const filterModalContainerAnimatedStyle = useAnimatedStyle(
        ()=> {
            return {
                opacity: interpolate(filterModalSharedValue1.
                value, [SIZES.height, 0], [0,1]),
                transform:[
                    {
                        translateY: filterModalSharedValue1.value
                    }
                ]

            }
        })

    const filterModalBgAnimatedStyle = useAnimatedStyle(()=>{
            return {
                opacity: interpolate(filterModalSharedValue2.
                    value, [SIZES.height, 0], [0,1])
            }
        })
    const filterModalContentAnimatedStyle = useAnimatedStyle(
        ()=> {
            return {
                opacity: interpolate(filterModalSharedValue2.
                    value, [SIZES.height, 0], [0, 1]),
                    transform:[
                        {
                            translateY: filterModalSharedValue2.value
                        }
                    ]
            }
        }
    )

    function renderFooter(){
        return(
            <View style={{ flexDirection:'row',height: 50,
            paddingHorizontal: SIZES.padding }}>

                    <TextButton lable="Lưu" contentContainerStyle={{ 
                    flex:1,
                    borderRadius: SIZES.radius,
                    marginLeft:SIZES.radius,
                    borderWidth: 2,
                    borderColor:COLORS.green,
                    backgroundColor: COLORS.green,

                 }}
                 labelStyle={{ color:COLORS.white, ...FONTS.h3 }}
                 />

            </View>
        )
    } 

    function renderInput(){
        return(
            <View style={{ marginBottom: SIZES.padding, marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5 }}>
            <TextInput
              style={{ flex: 1, padding: 10, fontSize: 16 }}
              placeholderTextColor="grey"
             // onChangeText={setText}
              underlineColorAndroid="transparent"
              returnKeyType="done"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5 , marginTop: 10}}>
            <TextInput
              style={{ flex: 1, padding: 10, fontSize: 16 }}
              placeholderTextColor="grey"
             // onChangeText={setText}
              underlineColorAndroid="transparent"
              returnKeyType="done"
            />
          </View>

          </View>
          
        )
    }
  return (
    //Main Container
   
    <Animated.View 
        style={[{ position: 'absolute', 
        bottom: 0, 
        height: SIZES.height, width:SIZES.width},
         filterModalContainerAnimatedStyle]}
    >
     
    {/** Background Container */}
    <Animated.View style={[{ flex: 1, 
         height: SIZES.height,width:SIZES.width,
         backgroundColor:"rgba(0, 0, 0, 0.7)"}, filterModalBgAnimatedStyle]}>
    {/** Content Container */}
    <Animated.View style={[{ 
        position: 'absolute', 
        bottom: 0,
        height: 300,
        width: SIZES.width,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: COLORS.white,
        //alignItems: 'flex-end'

     }, filterModalContentAnimatedStyle]}>

        {/*header*/}
        <View 
        style={{ 
            flex: 1,
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding }}>

            <View style={{ 
                width: 60
             }}/>
                <Text style={{ flex:1,textAlign: 'center', ...FONTS.h1 }}></Text>

                <TextButton
                lable="Cancel"
                contentContainerStyle={{ 
                    width: 60, 
                    backgroundColor: null
                 }}
                 labelStyle={{ 
                    color: COLORS.black,
                    ...FONTS.h4
                  }}
                  onPress={()=>{
                    filterModalSharedValue2.value
                    = withTiming(SIZES.height,{
                        duration: 500
                    }) 

                    filterModalSharedValue1.value 
                    = withDelay(500, withTiming(SIZES.height,{
                        duration: 100
                    }))
                  }}
                />
        </View>
        
         
        {/** Content */}
    
        <View>
        
        <View   
        style={{ 
            flexDirection: 'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            borderColor:COLORS.gray,
            borderRadius: 5,
            // backgroundColor: COLORS.green,
             height: 40,
              alignItems:'center'
            }}>
                <View
         style={{ flex:1 , marginLeft: SIZES.radius}}  
        >
          
           <Text style={{ color: COLORS.gray, ...FONTS.h5 }}>
             Tu Danh Muc
           </Text>
          <Text style={{...FONTS.h3}}>sam</Text>

        </View>
        
         {/* Icon */}
         <View style={{ width: 40, height: 40, alignItems: 'center', borderRadius:15, backgroundColor:COLORS.red, justifyContent:'center' }}>
                <Image 
                    source={icons.delivery}
                    resizeMode='contain'
                    style={{ width: 25, height: 25, tintColor: COLORS.blue }}
            />
               </View>

        </View>
        
      
        </View>
        
        
        {renderInput()}  
      
       
        

        {/*Footer*/}
        {renderFooter()}

     </Animated.View>
    </Animated.View>
    
    </Animated.View>
    
  )
}

export default BottomPopup

const styles = StyleSheet.create({})
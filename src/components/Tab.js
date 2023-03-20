import React from "react";
import { Image } from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import{Splash, Onboarding,Login, SignIn, Home} from '../screen'

import { COLORS, imgages } from "../constants";

const Tab =  createBottomTabNavigator();
const tabOptions = {
    showLabel : false,
    style: {
        height: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0 ,
            height: 10,
        },
        shawdowOpacity: 0.53,
        shawdowRadius: 13.79,
        elevation: 21,

    }
} 

const Tabs = () =>{
    return (
        <Tab.Navigator 
            tabBarOptions={tabOptions}
            screenOptions={({route})=>({
                tabBarIcon: ({focused})=>{
                    const tintColor = focused ? COLORS.blue : COLORS.gray;
                    switch(route.name){
                        case "Home": 
                            return(
                                <Image
                                source={imgages.category}
                                resizeMode="contain"
                                style={{ 
                                    tintColor: tintColor,
                                    width:30,
                                    height: 30,

                                 }}
                                />
                            )
                            case "Overview": 
                            return(
                                <Image
                                source={imgages.category}
                                resizeMode="contain"
                                style={{ 
                                    tintColor: tintColor,
                                    width:30,
                                    height: 30,
                                    
                                 }}
                                />
                            )
                            case "Finance": 
                            return(
                                <Image
                                source={imgages.category}
                                resizeMode="contain"
                                style={{ 
                                    tintColor: tintColor,
                                    width:30,
                                    height: 30,
                                    
                                 }}
                                />
                            )
                            case "Innformation": 
                            return(
                                <Image
                                source={imgages.category}
                                resizeMode="contain"
                                style={{ 
                                    tintColor: tintColor,
                                    width:30,
                                    height: 30,
                                    
                                 }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
           

        </Tab.Navigator>
    )

}
export default Tabs; 
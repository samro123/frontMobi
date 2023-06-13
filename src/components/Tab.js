import React from "react";
import { Image, StyleSheet, View,Text, TouchableOpacity } from "react-native";
import {createBottomTabNavigator, BottomTabBar} from "@react-navigation/bottom-tabs"
import{ Home1, Edit,Wallet, Profile, Transaction, Home} from '../screen'
import Svg,{Path} from 'react-native-svg'
import {imgages, icons, theme} from '../constants'


const {COLORS, SIZES, FONTS} = theme;
const Tab =  createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) =>(
    <TouchableOpacity onPress={onPress} 
        style={[styles.touchOp, styles.shawdow]}
    >
        <View style={styles.viewTouch}>{children}</View>
    </TouchableOpacity>
);

const Tabs = () =>{
    return (
        <Tab.Navigator 
        
            screenOptions={{ 
                tabBarShowLabel: false,
                tabBarStyle:{
                   position: 'absolute',
                    borderRadius: 15,
                    bottom: 5,
                    left: 10,
                    right: 10,
                    elevation: 0,
                    backgroundColor: '#6E45E2',
                    height: 90,
                    ...styles.shawdow
                    
                }
             }}
        >
                <Tab.Screen name="Home1" component={Home1}  options={{ 
                    tabBarIcon: ({focused}) =>(
                        <View style={styles.viewHome}>
                            <Image 
                            source={icons.income}
                            resizeMode="contain"
                            style={{ tintColor: focused ? COLORS.black : COLORS.white
                                ,...styles.img  }}
                            
                            />
                            <Text style={{ color: focused ? COLORS.black : COLORS.white , ...FONTS.h4  }}>Income</Text>
                        </View>
                    ),
                    headerShown: false
                  
                 }}/>
                <Tab.Screen name="Home2" component={Home}  options={{ 
                    tabBarIcon: ({focused}) =>(
                        <View style={styles.viewHome}>
                            <Image 
                            source={icons.outcome}
                            resizeMode="contain"
                            style={{ tintColor: focused ? COLORS.black : COLORS.white
                                ,...styles.img  }}
                            
                            />
                            <Text style={{ color: focused ? COLORS.black : COLORS.white , ...FONTS.h4 }}>Spend</Text>
                        </View>
                    ),
                    headerShown: false
                 }}/>
                  <Tab.Screen name="Wallet" component={Wallet}  options={{ 
                    tabBarIcon: ({focused}) =>(
                        <View style={styles.viewHome}>
                            <Image 
                            source={icons.wallet}
                            resizeMode="contain"
                            style={{ tintColor: focused ? COLORS.black : COLORS.white
                                ,...styles.img  }}
                            
                            />
                            <Text style={{ color: focused ? COLORS.black : COLORS.white , ...FONTS.h4  }}>Wallet</Text>
                        </View>
                    ),
                    headerShown: false
                 }}/>
                   <Tab.Screen name="Transaction" component={Transaction}  options={{ 
                    tabBarIcon: ({focused}) =>(
                        <View style={styles.viewHome}>
                            <Image 
                            source={icons.uers}
                            resizeMode="contain"
                            style={{ tintColor: focused ? COLORS.black : COLORS.white
                                ,...styles.img  }}
                            
                            />
                            <Text style={{ color: focused ? COLORS.black : COLORS.white , ...FONTS.h4  }}>Transaction</Text>
                        </View>
                    ),
                    headerShown: false
                 }}/>

        </Tab.Navigator>
        
    )

}
export default Tabs; 
const styles = StyleSheet.create({
    img:{
        width: 25,
        height: 25
    },
    viewHome:{
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    shawdow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0 ,
            height: 10,
        },
        shawdowOpacity: 0.25,
        shawdowRadius: 3.5,
        elevation: 5
    },
    touchOp:{
        top: -30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTouch:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.organ
    }
})
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import {Color, FONTS} from '../../src/constants'
const Splash = ({navigation}) => {
  setTimeout(()=>{
    navigation.replace('Onboarding')
  },3000)
  return (
    <View style={{ flex:1 , flexDirection: 'column' ,justifyContent:'center',alignItems:'center', backgroundColor: '#007ACC' }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor='#007ACC'/> 
        <Image source={require('../assets/images/welcome.png')} style={{ width: 250, height: 250 }}/>
        <Text style={{  fontSize:30, color: 'white' }}>Wellcome</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})
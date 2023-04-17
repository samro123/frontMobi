import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, {useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'



const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  if(isLoading){
    <View style={{ flex: 1, justifyContent:'center', alignContent:'center' }}>
        <ActivityIndicator size={'large'}/>
    </View>

  }
  return (
    <NavigationContainer>
       <AuthStack/>
     </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({})
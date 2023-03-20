import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import{Splash, Onboarding,Login, SignIn, Home} from './src/screen'
import Tabs from './src/components/Tab'

const Stack = createNativeStackNavigator();

const App = ()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login}  options={{headerBackTitle:"Back" ,title: 'Login', headerStyle:{} }}  />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerBackTitle:"Back" ,title: 'Sign In', headerStyle:{} }}/>
        <Stack.Screen name="Home" component={Tabs} options={{ title:'Home'}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

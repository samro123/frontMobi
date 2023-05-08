import { View, Text } from 'react-native'
import React, { useContext } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Onboarding,Login, SignIn, Home, Home1, Edit } from '../screen'
import Tabs from '../components/Tab';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const {userInfo} = useContext(AuthContext);
  return (
  <Stack.Navigator >
    {userInfo.token ?  (
    <Stack.Screen name="Home" component={Home} />
    ) : (
      <>
    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
    <Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login}  options={{headerBackTitle:"Back" ,title: 'Login', headerStyle:{} }}  />
    <Stack.Screen name="SignIn" component={SignIn} options={{headerBackTitle:"Back" ,title: 'Sign In', headerStyle:{} }}/>
    <Stack.Screen name="Home1" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name="Edit" component={Edit}/>
    
      </>
    ) }
    
    
  </Stack.Navigator>
  )
}

export default AuthStack
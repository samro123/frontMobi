import { View, Text } from 'react-native'
import React, { useContext } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Onboarding,Login, SignIn, Home, Home1, Edit,Wallet,AddWalletScreen,EditWalletScreen, Adjust,AddInOut, AllCategory} from '../screen'
import Tabs from '../components/Tab';
import { AuthContext } from '../context/AuthContext';
import { wallet } from '../constants/icons';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const {userInfo} = useContext(AuthContext);
  return (
  <Stack.Navigator >
    {userInfo.token ?  (
      <>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name ="EditWalletScreen" component={EditWalletScreen} options={{ headerShown: false }}/>
      <Stack.Screen name ="AddWalletScreen" component={AddWalletScreen} options={{headerBackTitle:"Back" ,title: 'Thêm ví', headerStyle:{backgroundColor:'#2196F3'} }}/>
      <Stack.Screen name ="AddInOut" component={AddInOut} options={{ headerShown: false }}/>
      <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }}/>
      <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }}/>
      <Stack.Screen name ="Adjust" component={Adjust} />
      <Stack.Screen name ="All" component={AllCategory} />
      </>
    ) : (
      <>
    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
    <Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login}  options={{headerBackTitle:"Back" ,title: 'Login', headerStyle:{} }}  />
    <Stack.Screen name="SignIn" component={SignIn} options={{headerBackTitle:"Back" ,title: 'Sign In', headerStyle:{} }}/>
    
    <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }}/>
    <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name ="Adjust" component={Adjust} />
    <Stack.Screen name ="All" component={AllCategory} />

 
    {/* <Stack.Screen name="Home1" component={Home1} /> */}
    {/* <Stack.Screen name="Edit" component={Edit}/> */}
    {/* <Stack.Screen name="Wallet" component={Wallet}/> */}
    

   

    
      </>
    ) }
    
    
  </Stack.Navigator>
  )
}

export default AuthStack
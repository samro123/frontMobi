import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import Buttons from '../components/Buttons'
import { AuthContext } from '../context/AuthContext'

const Home = ({navigation}) => {
  const {userInfo, logout, isLoading} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      <Text style={styles.text}>Home {userInfo.username}</Text>
      <Button title="Logout" color='red' onPress={() => console.log('Logout')}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 18,
    marginBottom: 8,
  }
})
import { StyleSheet, Text, View, Button,TouchableOpacity ,FlatList} from 'react-native'
import React, { useContext,useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import Buttons from '../components/Buttons'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react'
import axios from 'axios';
import {BASE_URL} from '../config'
 
const baseURL = "https://99dc-14-245-71-140.ngrok-free.app/api";

const Home = ({navigation, route}) => {
  const [posts, setPosts] = useState({});
  const {userInfo, logout, isLoading,post} = useContext(AuthContext);
  
  const getPosts = () => {
    axios
      .get(`${baseURL}/home/out-come`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(e => {
        console.log(`Error on getting posts ${e.message}`);
      });
  };

  useEffect(() => {
    getPosts();
  }, [route.params?.post]);

   function Header(){
    const renderItems = ({item})=>(
      <View>
        <Text>{item.category}</Text>
        <Text>{item.price}</Text>
      </View>
    )
      

    return(
      <FlatList
        data={posts.categoryCustomDTO}
        renderItem={renderItems}
      />
    )

   }
 
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
     <View >
      {Header()}
     </View>
      
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
    color: '#181818'
  }
})
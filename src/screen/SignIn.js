import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import Buttons from '../components/Buttons'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {imgages, theme} from '../../src/constants'

const {COLORS, SIZES, FONTS} = theme;
const SignIn = ({navigation}) => {
  const [userName, setName] = useState(null);
  const [passWord, setPassWord] = useState(null);

  const {userInfo,isLoading,register} = useContext(AuthContext);
  const OptionAlert = () => {
   
    // 'Hello',
    // [
    //   {
    //     text: 'Yes',
    //     on_Press: () => {
    //       console.log('Yes');
    //     }
    //   },
    //   {
    //     text: 'No',
    //     on_Press: () => {
    //       console.log('No');
    //     }
    //   },

    // ]
  
  }
  return (
    <ScrollView style={styles.scrollView}> 
    <View style={styles.container}>
      
    
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>

        <Spinner visible={isLoading} />
        {/*login form section */}
        
          <View style={styles.viewForm1}>
              <View style={styles.viewForm2}>
                <Text style={styles.textForm2}>Chào mừng bạn</Text>
                <Image source={require('../assets/images/waving-hand.png')} style={styles.imgForm2}/>
              </View>
            

                {/*login form email */}
              <View style={styles.viewEmail}>
                  <View style={styles.viewEmail1}>
                    <Icon name='envelope-o' size={22} color="#818181"/>
                    <TextInput style={styles.input} value={userName} placeholder="Enter Email" onChangeText={text => setName(text)} placeholderTextColor="#818181"/>
                  </View>

                   {/*login form password */}
           
                  <View style={styles.viewPasswork}>
                    <Icon name='lock' size={22} color="#818181"/>
                    <TextInput style={styles.input} value={passWord} placeholder="Enter Password" onChangeText={text => setPassWord(text)} secureTextEntry placeholderTextColor="#818181"/>

                  </View>
                
                  <View style={styles.viewButton}>
                  <Buttons  btn_text={"Đăng Ký"} on_Press ={()=> { 
                    register(userName, passWord);
                    //alert(`${userInfo.message}`)
                  }}/>
                  </View>


              </View>

          </View>

        {/*login form section */}
          <View style={styles.viewBottom}>
            <View style={styles.viewGoogle}>
              <TouchableOpacity style={styles.social_btn}>
                <Image source={require('../assets/images/search.png')} style={styles.social_img}/>
                <Text style={styles.textGoogle}>Đăng ký với Google</Text>
              </TouchableOpacity>
          
              <View style={styles.viewTextLogin}>
                  <Text >Bạn Đã Có Tài Khoản? </Text>
                  <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <Text style={styles.textLogin}>Đăng Nhập</Text>
                  </TouchableOpacity>
              </View>
              

        

          </View>
          </View>
    </View>
    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  scrollView:{
    backgroundColor:COLORS.white,
  },
  container: {
    flex: 1, 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: COLORS.white,
    flexDirection:'column',

  },
  viewForm1:{
    flex: 3, 
    flexDirection:'column', 
    backgroundColor:COLORS.white, 
    paddingTop: 10, 
    paddingHorizontal:'3%',
  },
 
  viewForm2:{
    flexDirection:'row', 
    justifyContent:'flex-start', 
    alignItems:'center', 
    marginBottom: 20,

  },
  textForm2:{
    fontSize: 20,
     color:'black',
     ...FONTS.hd
  },
  imgForm2: {
    height: 30,
     width: 30,

  },
  viewEmail:{
    flexDirection:'column', 
    marginTop: 10,

  },
  viewEmail1:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#ededed', 
    width:'95%', height: 60, 
    borderRadius:10, 
    paddingLeft:20 ,

  },
  viewPasswork:{
    flexDirection:'row',
     justifyContent:'center', 
     alignItems:'center', 
     backgroundColor:'#ededed', 
     width:'95%', 
     height: 60, 
     borderRadius:10, 
     paddingLeft:20, 
     marginTop:10, 
     marginBottom: 10

  },
  viewButton:{
    alignItems:'center', 
    marginTop:10,

  },
  input:{
    position:'relative',
    height:'100%',
    width:'90%',
    paddingLeft:20,
  },
  social_btn:{
    height:55, width:'100%',
    borderRadius: 10,
    borderColor:'#ddd', 
    flexDirection:'row', 
    alignItems:'center',
    marginBottom:10, 
    backgroundColor:COLORS.white

  },
  social_img: {
    width: 25,
    height: 25, 
    marginLeft:50,
    
  },
  viewBottom:{
    flex: 2, 
    flexDirection:'column', 
    backgroundColor:COLORS.white,
     paddingHorizontal:'3%'
  },
  viewGoogle:{
    flexDirection:'column',
    alignItems:'center',
    width:'95%',

  },
  textGoogle:{
    marginHorizontal:'5%',
     fontSize: 16,
     width:'80%',

  },
  viewTextLogin:{
    flexDirection:'row', 
    alignItems:'center', 
    width: '95%', 
    paddingHorizontal:'20%',
    marginTop: 10,

  },
  textLogin:{
    marginLeft: 10,
    fontSize: 16,
    marginHorizontal: '5%',
    color:'#7F3DFF',
  }


})
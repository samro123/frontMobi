import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import Buttons from '../components/Buttons'

const SignIn = () => {
  return (
    
    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection:'column'}}>
      <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
        {/*login form section */}
          <View style={{ flex: 3, flexDirection:'column', backgroundColor:'#fff', paddingTop: 10, paddingHorizontal:'3%' }}>
              <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom: 20}}>
                <Text style={{ fontSize: 20, color:'black' }}>Wellcome Back</Text>
                <Image source={require('../assets/images/waving-hand.png')} style={{ height: 30, width: 30 }}/>
              </View>
            

                {/*login form email */}
              <View style={{ flexDirection:'column', marginTop: 10 }}>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'#ededed', width:'95%', height: 60, borderRadius:10, paddingLeft:20  }}>
                    <Icon name='envelope-o' size={22} color="#818181"/>
                    <TextInput style={styles.input} placeholder="Enter Email" placeholderTextColor="#818181"/>

                  </View>

                   {/*login form password */}
           
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'#ededed', width:'95%', height: 60, borderRadius:10, paddingLeft:20, marginTop:10, marginBottom: 10  }}>
                    <Icon name='lock' size={22} color="#818181"/>
                    <TextInput style={styles.input} placeholder="Enter Password" placeholderTextColor="#818181"/>

                  </View>
                
                  <View style={{ alignItems:'center', marginTop:10 }}>
                  <Buttons  btn_text={"Sign In"} on_Press ={()=>console.log("Test")}/>
                  </View>


              </View>

          </View>

        {/*login form section */}
          <View style={{ flex: 2, flexDirection:'column', backgroundColor:'#fff', paddingHorizontal:'3%'}}>
            <View style={{ flexDirection:'column', alignItems:'center', width:'95%' }}>
              <TouchableOpacity style={styles.social_btn}>
                <Image source={require('../assets/images/search.png')} style={styles.social_img}/>
                <Text style={{ marginHorizontal:'5%', fontSize: 16,width:'80%' }}>Sign in with Google</Text>
              </TouchableOpacity>
          
              <View style={{ flexDirection:'row', alignItems:'center', width: '95%', paddingHorizontal:'20%', marginTop: 10 }}>
                  <Text >Ban Da Co Tai Khoan?</Text>
                 
                  

              </View>
              

        

          </View>
          </View>
      </ScrollView>

     



    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
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
    backgroundColor:'#fff'

  },
  social_img: {
    width: 25,
    height: 25, 
    marginLeft:50,
    
  }


})
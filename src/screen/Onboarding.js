import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Animated, SafeAreaView } from 'react-native'
import React,{useState, useRef} from 'react'
import {imgages, theme} from '../../src/constants'
import Buttons from '../components/Buttons';
import slides from '../Slide/slides';
import {TextButton} from "../components"


const {COLORS, SIZES, FONTS} = theme;
const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemChanged = useRef(({viewableItem}) => {
    setCurrentIndex(viewableItem[0].index);
  }).current;

  const scrollX = new Animated.Value(0)


  function rederConten(){

    return(
    <Animated.ScrollView 
          horizontal
          pagingEnabled
          scrollEnabled
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment= 'center'
          showsHorizontalScrollIndicator={false}
          onSCroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}] , {useNativeDriver: false})}
        
        >
        {slides.map((item, index) => (
              <View key={index}
                    style={{flex: 1 ,width: SIZES.width }}
              >
                <View style={{ flex:2 , alignItems:'center', justifyContent:'center' }}>
                  <Image 
                  source={item.image}
                  resizeMode="cover"
                  style={
                    {
                      width: "100%",
                      height: "100%"
                    }
                  }/>
                </View>
                <View style={{ flex: 1,position: 'relative'}}>
                  <Text style={{ 
                      ...FONTS.h1,
                      flexWrap: 'wrap',
                      textAlign:'center',
                   }}>{item.title}</Text>
                  <Text style={{ 
                    textAlign: 'center',
                    marginTop: SIZES.base,
                    color: COLORS.gray
                   }}>{item.description}</Text>
                </View>
              </View>
        ))}
    </Animated.ScrollView>
    )
  }

  function redeerDots(){

     const dotPosition = Animated.divide(scrollX,SIZES.width);
     


     return (
        <View style={styles.containerDot}>
          {slides.map((item, index)=>{

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1 , index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            }) 
            console.log(opacity.inputRange)
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base, 17, SIZES.base],
              extrapolate:"clamp"
            })
            console.log(dotSize)
            return (
              <Animated.View
               key={`dot-${index}`}
               opacity={opacity}
              style= {[styles.dot, {width: dotSize , height: dotSize}]}>

              </Animated.View>
            )

          })}
        </View>
     )
  }

  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
        <View style={styles.view1}> 
          <SafeAreaView>
              <View>
              {rederConten()}
              </View>
              <View  style={styles.dotRootcontainer}>
                {redeerDots()}
              </View>    
          </SafeAreaView>
        </View>
         
        
        <View style={styles.view2}>
          <View style={{ flex:2, flexDirection:'column', alignItems:'center'}}>
             {/*Button 
            <Buttons btn_text={"Sign in"} on_Press={()=>navigation.navigate("Home1")}/> */}
             <TextButton 
                    lable="Đăng Nhập"
                    contentContainerStyle={
                      styles.btnLogin
                    }
                    labelStyle={{ color:COLORS.white , ...FONTS.h2}}
                    onPress={()=>navigation.navigate("Login")}
              />
            <TextButton 
                    lable="Đăng Ký"
                    contentContainerStyle={
                      styles.btnLogin
                    }
                    labelStyle={{ color:COLORS.white , ...FONTS.h2}}
                    onPress={()=>navigation.navigate("SignIn")}
              />
          </View>
        </View>
        {/*Button */}
      
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex:1 , 
    backgroundColor:COLORS.white

  },
  view1: {
    flex:3 ,
    flexDirection:"column",
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent: 'center'
   
  },
  view2:{
    flex:1, 
    backgroundColor:COLORS.white

  },
  text:{
    fontFamily:'Helvetica',
     color:'black', 
     fontSize:30,

  },
  text1:{
     maxWidth: '90%' ,
     fontFamily: 'Helvetica', 
     color:'#999', fontSize:14,
     textAlign:'center',
     paddingTop:8

  },
  dotRootcontainer:{
    //position: 'absolute',
    alignItems:'center',
    bottom: SIZES.height > 700 ? '30%' : '12%'

  },
  containerDot:{
    flexDirection:'row',
    height: SIZES.padding
  },
  dot:{
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius /2
  },
  btnLogin:{
    height: 50,
    width:"70%",
    paddingHorizontal: SIZES.radius,
    borderRadius: 20,
    backgroundColor: "#7F3DFF",
    marginTop: 10
  },
  
})
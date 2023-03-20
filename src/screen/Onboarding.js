import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Animated, SafeAreaView } from 'react-native'
import React,{useState, useRef} from 'react'
import * as Font from 'expo-font';
import {imgages, theme} from '../../src/constants'
import Buttons from '../components/Buttons';
import OnboardingItem from '../components/OnboardingItem';
import slides from '../Slide/slides';

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
        {/*Imge 
        <View style={{ flex:2 ,flexDirection:"column",alignItems:'center', backgroundColor:'#fff' }}>
          <ImageBackground source={require('../assets/images/welcome.png')} style={{flex:1 ,width:250, height:250 }}/>
        </View>
        {/*Imge */} 
        <View style={styles.view1}>
           {/*Imge 
        <FlatList data={slides}
          renderItem={({item})=> <OnboardingItem item={item}/>} 
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>item.id}
          onScroll={Animated.event([{nativeEvent: {contentOffset:{x: scrollX}}}], {useNativeDriver: false,})}
          />
          */} 
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
          {/*Text 
          <View style={{ flex:1, flexDirection:'column', alignItems:'center',justifyContent:'flex-start', backgroundColor:'#fff' }}>
            <Text style={styles.text}>Wellcome</Text>
            <Text style={styles.text1}>font name you registered with is different from the font name you want to use.</Text>
          </View> 
          {/*Text */}
            {/*Button */} 
          <View style={{ flex:2, flexDirection:'column', alignItems:'center'}}>
            <Buttons btn_text={"Login"} on_Press={()=>navigation.navigate("Login")}/>
            <Buttons btn_text={"Sign in"} on_Press={()=>navigation.navigate("SignIn")}/>
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
  
})
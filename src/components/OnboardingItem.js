import { StyleSheet, Text, View , useWindowDimensions, Image} from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

export default OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.img ,{width, resizeMode:'contain'}]}></Image>

      <View style={{ flex:0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
    
  )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    img:{
        flex: 0.7,
        justifyContent:'center'
    },
    title:{
        fontWeight: '800',
        fontSize: 28,
        marginTop: 10,
        textAlign: 'center'


    },
    description:{
        fontWeight: '300',
        textAlign: 'center',
        color:'#818181',
        paddingHorizontal: 64

    }
})
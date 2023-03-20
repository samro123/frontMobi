import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'

const Buttons = ({on_Press, btn_text}) => {
  return (
    <TouchableOpacity 
    style={styles.button} 
    onPress={on_Press}>
        <Text style={styles.text}>{btn_text}</Text>
    </TouchableOpacity>
  )
}

export default Buttons

const styles = StyleSheet.create({
  button:{
    justifyContent:'center',
     width:'90%', 
     backgroundColor:'#7F3DFF', 
     height:50, 
     marginBottom: 20, 
     borderRadius: 10
  },
  text:{
    fontSize: 15, letterSpacing: 1.5,textAlign:'center', position:'relative', color:'white'

  }
})
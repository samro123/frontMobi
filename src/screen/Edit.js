import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity , SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import {imgages, icons, theme} from '../../src/constants'
import RadioForm from 'react-native-simple-radio-button'
import {Button} from 'react-native-elements'


const {COLORS, SIZES, FONTS} = theme;

const Edit = () => {
    const [value, setValue] = useState(0);
    const items = [
        {label: "Thu" , value : 0},
        {label: "Chi" , value : 1},
    ]

  return (
    < SafeAreaView style={styles.container}>
        <View style={styles.view1}>
         <View style={styles.viewText1}>
         <TextInput style={styles.input1}>Tien An</TextInput>
         </View>
         

         <View style={styles.viewText}>
         <Text style={styles.text}>So du</Text>
         <View style={styles.viewText2}>
            <TextInput style={styles.input2}>
               500000
            </TextInput>
         </View>
         <View style={styles.viewText3}>
            <Text style={styles.text1}>Thay doi bieu tuong</Text>
            <View style={styles.viewIcon1}>
            <Image style={styles.icon1} source={icons.game}/>
            </View> 
         </View>

         <View style={styles.viewText3}>
            <Text style={styles.text1}>Thay doi mau</Text>
            <View style={styles.viewIcon2}>
            <Image style={styles.icon1} source={icons.game}/>
            </View> 
         </View>

         <View style={styles.viewText4}>
            <Text>Loai danh muc</Text>
            <View style={styles.radioButton}>
                <RadioForm radio_props={items} initial={value} onPress={(value) =>  [setValue(value), console.log(items.label)]}  labelHorizontal={false} formHorizontal/>
            </View>
         </View>

         <View style={styles.viewText5}>
           <TouchableOpacity>
                <Text style={styles.text2}> 
                    Xoa Danh Muc
                </Text>
            </TouchableOpacity>

         </View>
         </View>

        
        
        </View>

        <View style={styles.view2}>
                <Button title="Soild"/>
        </View>
      
        </SafeAreaView>
  )
}

export default Edit

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    view1:{
        flex: 6,
        flexDirection:'column',
        paddingHorizontal: '5%',
        
    },
    view2:{
        flex:1,
        alignItems: 'center',
        marginLeft: '60%'

    },
    viewText1:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        width:'90%'

    },
    viewText2:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        width:'90%'
    },
    viewText3:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    viewText4:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    viewText5:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    viewText:{
        flexDirection: 'column',
    },
    viewIcon1:{
        alignItems: 'center',
        justifyContent:'center',
        width: 50,
        height: 50,
        backgroundColor: COLORS.goldyelow,
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: 55
    },
    viewIcon2:{
        alignItems: 'center',
        justifyContent:'center',
        width: 50,
        height: 50,
        backgroundColor: COLORS.goldyelow,
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: 100
    },
    input1:{
        flex:1,
        padding: 5,
        color:COLORS.black,
        marginTop: 20,
        marginBottom:20,
        borderBottomWidth: 1,
        fontSize: SIZES.body3
    },
    input2:{
        flex:1,
        padding: 5,
        color:COLORS.black,
        borderBottomWidth: 0.5,
        fontSize: SIZES.body3, 
        color: COLORS.red
    },
   
    text:{
        marginTop: SIZES.padding
    },
    text1:{
        fontSize: SIZES.h3,
        marginBottom: 10,
    },
    text2:{
        fontSize: SIZES.h3,
        color:COLORS.red,
        marginBottom: 10
    },
    icon1:{
        width: 20,
        height: 20,
        tintColor: COLORS.white
    },
    radioButton:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 10,
        marginLeft: 20
        
    }
})
import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity , SafeAreaView, Modal, Animated, FlatList} from 'react-native'
import React, { useState, useEffect,useRef } from 'react'
import {imgages, icons, theme} from '../../src/constants'
import RadioForm from 'react-native-simple-radio-button'
import {Button} from 'react-native-elements'


const {COLORS, SIZES, FONTS} = theme;
let featuresData = [
    {
        id: 1,
        icon: icons.wallet,
        color: COLORS.red,
        backgroundColor: COLORS.lightred,
        description: "Game",
        total: 10.00
    },
    {
        id: 2,
        icon: icons.delivery,
        color: COLORS.green,
        backgroundColor: COLORS.lightgreen,
        description: "Delivery",
        total: 5.00
    },
    {
        id: 3,
        icon: icons.food,
        color: COLORS.pink,
        backgroundColor: COLORS.lightpink,
        description: "Food",
        total: 7.00
    },
    {
        id: 4,
        icon: icons.health,
        color: COLORS.blue,
        backgroundColor: COLORS.lightblue,
        description: "Health",
        total: 9.00
    },
    {
        id: 5,
        icon: icons.phone,
        color:COLORS.pink,
        backgroundColor: COLORS.lightpink,
        description: "Phone",
        total: 12.00
    },
    {
        id: 6,
        icon: icons.shoppe,
        color:COLORS.blue,
        backgroundColor: COLORS.lightblue,
        description: "Shopping",
        total: 25.00
    }
]


const ModalPoup =({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(()=> {
        toggleModal();
    }, [visible])
    const toggleModal = ()=>{
        if(visible){
            setTimeout(() => setShowModal(true) ,200);
            Animated.spring(scaleValue, {
                toValue:1,
                duration: 10,
                useNativeDriver: true,
            }).start();
        }else{
            
            setTimeout(() => setShowModal(false), 200 );
            Animated.timing(scaleValue ,{
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }
    return <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
            <Animated.View style={[styles.modalContainer, {transform: [{scale:scaleValue}]}]}>
                {children}
            </Animated.View>
        </View>
    </Modal>
};


const Edit = () => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [value, setValue] = useState(0);
    const [featuresDatas, setFeaturesData] = useState(featuresData)

    const [chooseData, setChooseData] = useState(icons.delivery)  // thay doi icon 
    const [chooseDataColor, setChooseDataColor] = useState(COLORS.organ)
    //radio button
    const items = [
        {label: "Thu" , value : 0}, 
        {label: "Chi" , value : 1},
    ]

    const setData = (item) =>{ // 
        setChooseData(item) 
    }

    function renderFeattures(){
        const onPressItem = (item) =>{
            setData(item.icon)
        }
        const renderItem = ({item, index}) =>(
            <TouchableOpacity 
                key={index}
                onPress={() => [onPressItem(item) , setVisible(false)]}
            >
            <View style={{ 
                height: 50,
                width: 50,
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 20,
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
             }}>
                <Image 
                    source={item.icon}
                    resizeMode="contain"
                    style={{ 
                        height: 20,
                        width: 20,
                        tintColor: item.color
                     }}
                />
            </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                    data={featuresDatas}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    keyExtractor={item =>`${item.id}`}
                    renderItem={renderItem}
                    style={{ marginTop: SIZES.padding }}
                />
        )
    }
    
    const setDataColor = (item) =>{
        setChooseDataColor(item)
    }

    function renderColor(){
        const onPressItem = (item) =>{
            setDataColor(item.backgroundColor)
        }
        const renderItem = ({item, index}) =>(
            <TouchableOpacity 
                key={index}
                onPress={() => [onPressItem(item) , setVisible1(false)]}
            >
            <View style={{ 
                height: 50,
                width: 50,
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 20,
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
             }}>
            </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                    data={featuresDatas}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    keyExtractor={item =>`${item.id}`}
                    renderItem={renderItem}
                    style={{ marginTop: SIZES.padding }}
                />
        )
    }

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
             <ModalPoup visible={visible}> 
               <View style={{ alignItems:'center' }}>
                 <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                         <Image style={styles.modalIcon} source={{ uri: icons.cancel }} />
                    </TouchableOpacity>
                    
                 </View>
               </View> 
               <View>
                  {renderFeattures()}
               </View>
               <Text style={styles.modalText}>Chon icon phu hop voi ban</Text>
             </ModalPoup>
            <Text style={styles.text1}>Thay doi bieu tuong</Text>
            <View style={{ backgroundColor: chooseDataColor, ...styles.viewIcon1 }}>
                <TouchableOpacity onPress={() => setVisible(true)} ><Image style={styles.icon1} source={chooseData} /></TouchableOpacity>
            
            </View> 
         </View>

         <View style={styles.viewText3}>
         <ModalPoup visible={visible1}> 
               <View style={{ alignItems:'center' }}>
                 <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible1(false)}>
                         <Image style={styles.modalIcon} source={{ uri: icons.cancel }} />
                    </TouchableOpacity>
                    
                 </View>
               </View> 
               <View>
                  {renderColor()}
               </View>
               <Text style={styles.modalText}>Chon icon phu hop voi ban</Text>
             </ModalPoup>
            <Text style={styles.text1}>Thay doi mau</Text>
            <TouchableOpacity onPress={() => setVisible1(true)}> 
                <View style={ {backgroundColor: chooseDataColor, ...styles.viewIcon2} }>
            </View> 
            </TouchableOpacity>
         </View>

         <View style={styles.viewText4}>
            <Text>Loai danh muc</Text>
            <View style={styles.radioButton}>
                <RadioForm radio_props={items} initial={value} onPress={(value) =>  [setValue(value), console.log(items.label)]}  labelHorizontal={false} formHorizontal/>
            </View>
         </View>

         <View style={styles.viewText5}>
           <TouchableOpacity >
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
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: 55
    },
    viewIcon2:{
        alignItems: 'center',
        justifyContent:'center',
        width: 50,
        height: 50,
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
        
    },
    modalBackGround:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer:{
        width: '80%',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    modalHeader:{
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    modalIcon:{
        width: 20,
        height: 20
    },
    modalText:{
        marginVertical: 30,
        fontSize: 20,
        textAlign:'center'

    },

})
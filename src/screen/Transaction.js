import { View, Text, StyleSheet, TouchableOpacity,Image, Animated, FlatList,Modal, } from 'react-native'
import React from 'react'
import {imgages, icons, theme} from '../../src/constants'
import { BottomPopup } from '../components';
import { set, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { AuthContext } from '../context/AuthContext'
import { useState,useContext,useEffect, useRef } from 'react'
import axios from 'axios';
import {BASE_URL} from '../config'


const {COLORS, SIZES, FONTS} = theme;

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
      description: "Shoppinggggg",
      total: 25.00
  },
  {
      id: 7,
      icon: icons.more,
      backgroundColor: COLORS.white,
      description: "Nore",
  }
]


const Transaction = ({navigation}) => {
         
    const [visible, setVisible] = useState(false)

       const [posts, setPosts] = useState({});
       const {userInfo, logout, isLoading,post} = useContext(AuthContext);
       //get api 
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/transaction/detail`, {
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
  }, []);

  //end api get

  const transactionData = posts && posts.data ? Object.values(posts.data).flatMap(dateData => dateData.transactionDTOS) : [];

 
    function renderData(){
      return(
        <View>
          <Text>Sam</Text>
        </View>
      )
    }
    function renderListTransaction(){

      const headerFeature = ()=>(
        <View style={styles.viewFeature}>
            <View style={{ flex:1 }}><Text>Features</Text></View>
            <View style={styles.viewFeatureHeader}>
                <TouchableOpacity style={styles.touchTouch1} onPress={() => setVisible(true)}>
                    <Image source={icons.adjust} style={{ width:20, height:20, }}/>
                </TouchableOpacity>
            </View>

            <ModalPoup visible={visible}> 
               <View style={{ alignItems:'center' }}>
                 <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                         <Image style={styles.modalIcon} source={{ uri: icons.cancel }} />
                    </TouchableOpacity>
                    
                 </View>
               </View> 
               <View>
                  {renderData()}
               </View>
               <Text style={styles.modalText}>Chon icon phu hop voi ban</Text>
             </ModalPoup>
            
        </View>
      )

      const renderItem = ({item})=>(
           <View style={styles.profileSectionContainer}>
                <TouchableOpacity style={{ flexDirection:'row', height: 60, alignItems:'center' }}>
              {/* Icon */}
                <View style={{ width: 40, height: 40, alignItems: 'center', borderRadius:15, backgroundColor:COLORS.red, justifyContent:'center' }}>
                <Image 
                    source={icons.delivery}
                    resizeMode='contain'
                    style={{ width: 25, height: 25, tintColor: COLORS.blue }}
            />
               </View>

        <View
         style={{ flex:1 , marginLeft: SIZES.radius}}  
        >
          
           <Text style={{ color: COLORS.gray }}>
            {item.note}
           </Text>
 
          
          <Text style={{fontSize: 10}}>{item.price}</Text>

        </View>

        <View
         
        >
          
           <Text style={{ color: COLORS.red }}>
             {item.total}
           </Text>
        </View>

    </TouchableOpacity>
            </View>
      )
      
      return(
        <FlatList
        ListHeaderComponent={headerFeature}
        data={transactionData}
        //columnWrapperStyle={{ justifyContent: 'flex-start' }}
        keyExtractor={item =>`${item.id}`}
        renderItem={renderItem}
        style={{ marginTop: SIZES.padding }}
    />
      )
    }
   
  return (
    <View style={{ flex: 1 }}>
    <View style={{ paddingHorizontal: SIZES.padding }}>
        {renderListTransaction()}

       
        {/** Bottom Popup */}
        
    </View>
    {/**
    <BottomPopup 
        filterModalSharedValue1 = {filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
        item={items}
        />
         */}
    </View>
  )
}



export default Transaction

const styles = StyleSheet.create({
    profileSectionContainer:{
      marginTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      borderWidth: 1,
      borderColor:COLORS.gray,
      borderRadius: 10
    },
    viewFeature:{
      marginBottom: SIZES.padding,
      justifyContent:'space-between', 
      flexDirection: 'row'
  },
  viewFeatureHeader:{
      alignItems: 'center', 
      justifyContent: 'center'
  },
  viewItemFeature:{
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      marginBottom: 5,
      marginTop: 5,
      borderRadius: 20,

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
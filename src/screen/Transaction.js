import { View, Text, StyleSheet, TouchableOpacity,Image, Animated, FlatList,Modal, } from 'react-native'
import React from 'react'
import {imgages, icons, theme} from '../../src/constants'
import { BottomPopup,TextButton } from '../components';
import { set, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { AuthContext } from '../context/AuthContext'
import { useState,useContext,useEffect, useRef } from 'react'
import axios from 'axios';
import {BASE_URL} from '../config'
import { useIsFocused } from '@react-navigation/native';
import { AppHeader, LineDiviver } from "../components";


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
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState({})
    const isFocused = useIsFocused();
    const setPress = (item)=>{
      setItems(item)
    }

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
  }, [isFocused]);

  //end api get

   //delete api
   const deletePost = () => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/transaction/${items.id}`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Home1', {post: post});
        setVisible(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
      });
  };

  const transactionData = posts && posts.data ? Object.values(posts.data).flatMap(dateData => dateData.transactionDTOS) : [];

  function renderFooter(){
    return(
        <View style={{ flexDirection:'row',height: 50,
        paddingHorizontal: SIZES.padding }}>

                <TextButton lable="Xóa" contentContainerStyle={{ 
                flex:1,
                borderRadius: SIZES.radius,
                marginLeft:SIZES.radius,
                borderWidth: 2,
                borderColor:COLORS.green,
                backgroundColor: COLORS.green,

             }}
             labelStyle={{ color:COLORS.white, ...FONTS.h3 }}
             onPress={deletePost}
             />

            <TextButton lable="Hủy" contentContainerStyle={{ 
                flex:1,
                borderRadius: SIZES.radius,
                marginLeft:SIZES.radius,
                borderWidth: 2,
                borderColor:COLORS.green,
                backgroundColor: COLORS.green,

             }}
             labelStyle={{ color:COLORS.white, ...FONTS.h3 }}
             onPress={() => setVisible(false)}
             />

        </View>
    )
} 
    function renderData(){
      return(
        <View>
          <View style={{ justifyContent:"center", marginBottom: 10, paddingHorizontal: 10 }}>
          <Text style={{ justifyContent:"center", alignItems:"center",textAlign: 'center', ...FONTS.h3 }} >Bạn Có Muốn Xóa ghi chú</Text>
          <Text style={{ justifyContent:"center", alignItems:"center",textAlign: 'center', ...FONTS.h2 }}>{items.note}</Text>
          </View>
           {renderFooter()}
        </View>
      )
    }
    function renderListTransaction(){

      const headerFeature = ()=>(
        <View style={styles.viewFeature}>
            <View style={{ flex:1 }}><Text style={{ ...FONTS.hn}}>Thêm giao dịch</Text></View>
            <View style={styles.viewFeatureHeader}>
                <TouchableOpacity style={styles.touchTouch1} onPress={() => navigation.navigate("All")}>
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
             </ModalPoup>
            
        </View>
      )

      const renderItem = ({item})=>(
            <View style={{ marginTop: SIZES.padding }}>
              <View style={{ marginBottom:3 }}>
              <Text style={{ ...FONTS.hn }}>{item.modifiedDate}</Text>
            </View>
           <View style={styles.profileSectionContainer}>
            
                <TouchableOpacity 
                style={{ flexDirection:'row', height: 60, alignItems:'center' }}
                onPress={()=> 
                  [setVisible(true),
                  setPress(item)]
                }
                
                >
              {/* Icon */}
                <View style={{ width: 40, height: 40, alignItems: 'center', borderRadius:10, backgroundColor:item.categoryDTO.color, justifyContent:'center' }}>
                <Image 
                    source={{ uri:item.categoryDTO.icon }}
                    resizeMode='contain'
                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
            />
               </View>

        <View
         style={{ flex:1 , marginLeft: SIZES.radius}}  
        >
          
           <Text style={{ color: COLORS.black, ...FONTS.h3 }}>
            {item.categoryDTO.name}
           </Text>
 
          
          <Text style={{fontSize: 10, ...FONTS.h4}}>{item.note}</Text>

        </View>

        <View >
          
           <Text style={{ color: COLORS.red,...FONTS.h4 }}>
             {item.price} đ
           </Text>
        </View>

      

    </TouchableOpacity>
            </View>
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

    function renderHeader(){
      return(
        <View >
             <AppHeader
               title={"Giao dich"}
               headerBg={"#60c5a8"}
               iconColor={"black"}
               menu //or back
               
               optionalBadge={5}
               right="more-vertical"
               rightFunction={() => console.log('right')}
               optionalIcon="bell"
               optionalFunc={() => console.log('optional')}
              />
        </View>
      )
    }
   
  return (
    <View style={{ flex: 1 }}>
      <View >
        {renderHeader()}
      </View>
    <View style={{ paddingHorizontal: SIZES.padding, backgroundColor:COLORS.white,flex: 1 , marginBottom: 100 }}>
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
      //marginTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      borderWidth: 2,
      borderColor:COLORS.pink,
      borderRadius: 10,
      borderRightWidth: 8,
      borderRightColor:COLORS.pink,
      borderBottomWidth: 8,
      borderBottomColor:COLORS.pink,
      backgroundColor:"#ffecd2",
      
    },
    viewFeature:{
      //marginBottom: 10,
      justifyContent:'space-between', 
      flexDirection: 'row',
     
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
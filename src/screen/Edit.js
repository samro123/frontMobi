import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Modal,
    Animated
  } from "react-native";
  import React, { useState, useContext, useEffect,useRef } from "react";
  import { imgages, icons, theme } from "../constants";
  import RadioForm from "react-native-simple-radio-button";
  import { Button, ListItem } from "react-native-elements";
  import {BASE_URL} from '../config'
  import axios from 'axios';
  import { AuthContext } from '../context/AuthContext'
  import Spinner from 'react-native-loading-spinner-overlay';
  import { TextButton, AppHeader } from "../components";
 

  const { COLORS, SIZES, FONTS } = theme;
  
  let featuresData = [
    {
        id: 1,
        icon: "https://i.ibb.co/HqJyqy2/console.png",
        color: COLORS.red,
        backgroundColor: COLORS.lightred,
        description: "Game",
        total: 10.00
    },
    {
        id: 2,
        icon: "https://i.ibb.co/k9SS9mV/delivery-truck.png",
        color: COLORS.green,
        backgroundColor: COLORS.lightgreen,
        description: "Delivery",
        total: 5.00
    },
    {
        id: 3,
        icon: "https://i.ibb.co/2FxfdyS/dish.png",
        color: COLORS.pink,
        backgroundColor: COLORS.lightpink,
        description: "Food",
        total: 7.00
    },
    {
        id: 4,
        icon: "https://i.ibb.co/6DNM3hP/healthcare.png",
        color: COLORS.blue,
        backgroundColor: COLORS.lightblue,
        description: "Health",
        total: 9.00
    },
    {
        id: 5,
        icon: "https://i.ibb.co/VQmjsHk/phone-call.png",
        color:COLORS.pink,
        backgroundColor: COLORS.lightpink,
        description: "Phone",
        total: 12.00
    },
    {
        id: 6,
        icon: "https://i.ibb.co/R7NmPW4/shopping-bag.png",
        color:COLORS.blue,
        backgroundColor: COLORS.lightblue,
        description: "Shopping",
        total: 25.00
    },
    {
      id: 7,
      icon: "https://i.ibb.co/VNYPN5n/income.png",
      color:COLORS.blue,
      backgroundColor: "#FEFF86",
      description: "Shopping",
      total: 25.00
  },
  {
    id: 8,
    icon: "https://i.ibb.co/9VRD1Pg/cash.png",
    color:COLORS.blue,
    backgroundColor: COLORS.lightblue,
    description: "Shopping",
    total: 25.00
},
{
  id: 9,
  icon: "https://i.ibb.co/BqR903d/stock-market.png",
  color:COLORS.blue,
  backgroundColor: COLORS.lightblue,
  description: "Shopping",
  total: 25.00
},
{
  id: 10,
  icon: "https://i.ibb.co/cNB9bbK/coins.png",
  color:COLORS.blue,
  backgroundColor: COLORS.lightblue,
  description: "Shopping",
  total: 25.00
},
{
  id: 11,
  icon: "hhttps://i.ibb.co/gFZ7tDS/real-estate.png",
  color:COLORS.blue,
  backgroundColor: COLORS.lightblue,
  description: "Shopping",
  total: 25.00
},

{
  id: 12,
  icon: "https://i.ibb.co/m8drDfh/paw.png",
  color:COLORS.blue,
  backgroundColor: COLORS.lightblue,
  description: "Shopping",
  total: 25.00
},
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



  const Edit = ({navigation, route}) => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [value, setValue] = useState(0);
    const [featuresDatas, setFeaturesData] = useState(featuresData)
    const post = route.params.post;
    const post1= route.params.post1;

   

    const [chooseData, setChooseData] = useState(post1.icon)  // thay doi icon 
    const [chooseDataColor, setChooseDataColor] = useState(post1.color)// thay doi mau

    //api category const
    const [name, setName] = useState(null);
    const [icon, setIcon] = useState(null);
    const [color, setColor] = useState(null);
   
    const [loading, setLoading] = useState(false);
    const {userInfo} = useContext(AuthContext);
     
    //put api
    const editPost = () => {
      setLoading(true);
  
      axios
        .put(
          `${BASE_URL}/category/${post1.id}`,
          {
            name,
            icon:chooseData,
            color:chooseDataColor,
            parent_id: post
          },
          {
            headers: {Authorization: `Bearer ${userInfo.token}`},
          },
        )
        .then(res => {
          let post = res.data;
  
          setLoading(false);
          navigation.navigate('Adjust', {
            post: post,
          });
          console.log(res.data);
        })
        .catch(e => {
          setLoading(false);
          console.log(`Error on updating post ${e.message}`);
        });
    };
    //

    //delete api
    const deletePost = () => {
      setLoading(true);
  
      axios
        .delete(`${BASE_URL}/category/${post1.id}`, {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        })
        .then(res => {
          let post = res.data;
          setLoading(false);
          // navigation.goBack();
          console.log(post)
          navigation.navigate('Adjust', {post: post});
        })
        .catch(e => {
          setLoading(false);
          console.log(`Error on deleting post ${e.message}`);
        });
    };
     
   
    

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
                 // source={item.icon}
                  source={{ uri: item.icon }}
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

    function renderHeader(){
      return(
        <View >
             <AppHeader
               title={"Sửa Danh Mục"}
               headerBg={"#60c5a8"}
               iconColor={"black"}
               back
               onRightPress={()=>navigation.navigate("Adjust")}
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
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <Spinner visible={loading} />
         <View>
          {renderHeader()}
         </View>
  
          <View style={[styles.box2]}>
          <View style={styles.viewText3}>
          <ListItem.Content>
                  <ListItem.Title><Text style={{ ...FONTS.h3 }}>Tên danh mục</Text></ListItem.Title>
                  <TextInput
                        placeholder="Danh mục" 
                        style={{ flex: 1, padding: 1, fontSize: 20 }}
                        value={name}
                        onChangeText={val => {
                        setName(val);
                        }}
                  />
                    
    </ListItem.Content>
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
              <Text style={styles.text1}>Thay đổi</Text>
              <View style={{ backgroundColor: chooseDataColor, ...styles.viewIcon1 }}>
                <TouchableOpacity onPress={() => setVisible(true)} ><Image style={styles.icon1} source={{uri:chooseData}} />
                </TouchableOpacity>
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
              <Text style={styles.text1}>Thay đổi màu</Text>
              
              <TouchableOpacity onPress={() => setVisible1(true)}> 
              <View style={{backgroundColor: chooseDataColor, ...styles.viewIcon2}}>

              </View>
            </TouchableOpacity>
              
            </View>
  
            <View style={styles.viewText3}>
              <Text style={{color: COLORS.blue, ...styles.text1}}>Thêm danh mục</Text>
            </View>

            <TouchableOpacity onPress={deletePost}>
            <View style={styles.viewText3}>
            <Text
            style={{
              fontSize: SIZES.h3,
              marginBottom: 10,
              color: "red",
              fontWeight: "700",
              ...FONTS.h3
            }}>
            Xoá danh mục
          </Text>
          </View>
            </TouchableOpacity>
            
            <View style={{ flex: 1, alignItems: "flex-end", width: "90%", marginTop:20 }}>
              <TextButton 
                    lable="Lưu"
                    contentContainerStyle={
                      styles.btnLogin
                    }
                    labelStyle={{ color:COLORS.white , ...FONTS.h3}}
                    onPress={editPost}
              />
            </View>
          </View>
  
        </View>
      </SafeAreaView>
    );
  };
  
  export default Edit;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    //header
    box1: {
      flex: 1,
      backgroundColor: "#2196F3",
      alignItems: "center",
      justifyContent: "center",
    },
    //content
    box2: {
      flex: 8,
      // backgroundColor: "#8BC34A",
      alignItems: "stretch",
      padding: 30,
      // justifyContent: "center",
    },
  
    //footer
    box3: {
      flex: 1,
      backgroundColor: "#e3aa1a",
      alignItems: "center",
      justifyContent: "center",
    },
    viewText3: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      borderBottomWidth: 0.3,
      borderBottomColor: COLORS.gray,
      marginTop: 10,
      height: 55,
    },
    viewIcon1: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 20,
      marginBottom: 10,
      // marginLeft: 55
    },
    icon1: {
      width: 20,
      height: 20,
      tintColor: COLORS.white,
    },
    text1: {
      ...FONTS.h3,
      marginBottom: 10,
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

  viewIcon2:{
    alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 20,
      marginBottom: 10,
      // marginLeft: 55
},

btnLogin:{
  height: 50,
  width:"50%",
  paddingHorizontal: SIZES.radius,
  borderRadius: 20,
  backgroundColor: "#7F3DFF",
  marginTop: 10
},
  });
  
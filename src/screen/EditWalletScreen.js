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


const { COLORS, SIZES, FONTS } = theme;

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



const EditWalletScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [value, setValue] = useState(0);
  const [featuresDatas, setFeaturesData] = useState(featuresData)
  const post = route.params.post;
  

 

  const [chooseData, setChooseData] = useState(icons.delivery)  // thay doi icon 
  const [chooseDataColor, setChooseDataColor] = useState(post.color)// thay doi mau

  //api category const
  const [name, setName] = useState(null);
  const [icon, setIcon] = useState(null);
  const [amount, setAmount] = useState(null);
  const [color, setColor] = useState(null);
 
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);
   
  //put api
  const editPost = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/wallet/${post.id}`,
        {
          name,
          icon,
          amount,
          color:chooseDataColor,
        },
        {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        },
      )
      .then(res => {
        let post = res.data;

        setLoading(false);
        navigation.navigate('Wallet', {
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
      .delete(`${BASE_URL}/wallet/${post.id}`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Wallet', {post: post});
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Spinner visible={loading} />
        <View style={[styles.box1]}>
          <Text>Sửa danh mục</Text>
          
        </View>

        <View style={[styles.box2]}>
        <View style={styles.viewText3}>
        <ListItem.Content>
                <ListItem.Title>Tên danh mục</ListItem.Title>
                <TextInput
                      placeholder="Titel"
                      style={styles.input}
                      value={name}
                      onChangeText={val => {
                      setName(val);
                      }}
                />
                  
  </ListItem.Content>
          </View>

          <View style={styles.viewText3}>
        <ListItem.Content>
                <ListItem.Title>Tiền</ListItem.Title>
                <TextInput
                      placeholder="Titel"
                      style={styles.input}
                      value={amount}
                      onChangeText={val => {
                      setAmount(val);
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
              <TouchableOpacity onPress={() => setVisible(true)} ><Image style={styles.icon1} source={chooseData} />
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
            <Text style={styles.text1}>Thêm người dùng ví</Text>
          </View>

          <TouchableOpacity onPress={deletePost}>
          <View style={styles.viewText3}>
          <Text
            style={{
              fontSize: SIZES.h3,
              marginBottom: 10,
              color: "red",
              fontWeight: "700",
            }}>
            Xoá ví
          </Text>
        </View>
          </TouchableOpacity>
          
          <View style={{ flex: 1, alignItems: "flex-end", width: "90%", marginTop:20 }}>
            <Button  title="Lưu nè" style={{width:100}} onPress={editPost}/>
          </View>
        </View>

        <View style={[styles.box3]}>
          <Text>Foteer</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditWalletScreen;

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
    fontSize: SIZES.h3,
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
});

import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView, ScrollView } from "react-native";
import { imgages, icons, theme } from "../../src/constants";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AddWalletScreen } from "../screen";
import { AppHeader, LineDiviver } from "../components";
import { AuthContext } from '../context/AuthContext'

import { useState,useContext,useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';


import {BASE_URL} from '../config'
const { COLORS, SIZES, FONTS } = theme;
const list = [
  {
    name: "Tiền mặt",
    icon: "game",
    amount: "500000",
    color: "#F44336",
  },
  {
    name: "Thẻ",
    icon: "flight-takeoff",
    amount: "400000",
    color: "#4CAF50",
  },
  {
    name: "Thẻ",
    icon: "flight-takeoff",
    amount: "300000",
    color: "#333",
  },
];
const totalAmount = list.reduce((sum, item) => {
  return sum + parseInt(item.amount);
}, 0);

const Wallet = ({navigation}) => {
  
  const [posts, setPosts] = useState({});
  const {userInfo} = useContext(AuthContext);
  const isFocused = useIsFocused();

  

  if (posts && posts.data && posts.data.length > 0) {
    const data = posts.data;
    const id = data[0].id;
    console.log(id); // output: 1
  } else {
    console.log('Response or data is undefined or empty');
  }
  
  const total = posts.data ? posts.data.reduce((sum,item)=>{
        return sum + parseInt(item.amount)
  },0) : 0;
  
  //console.log(total)

  //get wallet
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/wallet`, {
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
  function renderHeader(){
    return(
      <View>
           <AppHeader
             title={"Wallet"}
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
    
    <View style={styles.container}>
      <View style={[styles.box1]}>
        {renderHeader()}
      </View>
       <ScrollView>
      <View style={[styles.box2]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...FONTS.h1, opacity: 0.5 }}>TÀI KHOẢN</Text>
          <Text style={{ ...FONTS.h2, color: "green" }}>{total} đ</Text>
        </View>
        <View>
          {posts.data&&posts.data.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate("EditWalletScreen",{post: l});
              }}>
              <ListItem bottomDivider>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50,
                    height: 50,
                    backgroundColor: l.color,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}>
                  <Image style={styles.icon1} source={icons.wallet2} />
                </View>
                <ListItem.Content>
                  <ListItem.Title><Text style={{ ...FONTS.h3 }}>{l.name}</Text></ListItem.Title>
                  <ListItem.Subtitle style={{ color: "green" }}>
                    {l.amount} đ
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <LineDiviver/>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddWalletScreen");
          }}>
          <View>
            <ListItem>
              <View style={styles.viewIcon1}>
                <Image style={styles.icon1} source={icons.more} />
              </View>
              <ListItem.Content>
                <ListItem.Title>Thêm tài khoản</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
     
    </View>

    
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  //header
  box1: {
   
    backgroundColor: "#2196F3",
    justifyContent: "flex-start",
  },
  //content
  box2: {
    flex: 8,
    // backgroundColor: "#8BC34A",
    alignItems: "stretch",
    padding: 30,
    // justifyContent: "center",
    marginBottom: 50
  },

  //footer
  box3: {
    flex: 1,
    backgroundColor: "#e3aa1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20
  },
  viewIcon1: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: COLORS.goldyelow,
    borderRadius: 20,
    marginBottom: 10,
    // marginLeft: 55
  },
  icon1: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});

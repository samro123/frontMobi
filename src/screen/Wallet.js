import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import {imgages, icons, theme} from '../../src/constants'
import { Avatar, ListItem } from "react-native-elements"; 
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {AddAccountScreen} from '../screen'


const {COLORS, SIZES, FONTS} = theme;
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
    color: "#333fas",
  },
];
const totalAmount = list.reduce((sum, item) => {
  return sum + parseInt(item.amount);
}, 0);


const Wallet = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.box1]}>
        <Text>Tất cả tài khoản</Text>
        <Text>{totalAmount}</Text>
      </View>

      <View style={[styles.box2]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>TÀI KHOẢN</Text>
          <Text style={{ fontSize: 20, color: "green" }}>{totalAmount} đ</Text>
        </View>
        <View>
          {list.map((l, i) => (
            <ListItem key={i} bottomDivider>
            <View style={{  alignItems: 'center',
                          justifyContent:'center',
                          width: 50,
                          height: 50,
                          backgroundColor: l.color,
                          borderRadius: 20,
                          marginBottom: 10,}}>
              <Image style={styles.icon1} source={icons.game}/>
            </View> 
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle style={{ color: "green" }}>
                  {l.amount} đ
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
        <TouchableOpacity   onPress={() => {
        navigation.navigate("AddAccountScreen", { name: "AddAccountScreen" });
      }}>
          <View>
            <ListItem>
            <View style={styles.viewIcon1}>
                <Image style={styles.icon1} source={icons.more}/>
              </View> 
              <ListItem.Content>
                <ListItem.Title>Thêm tài khoản</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </TouchableOpacity>
      
      </View>

      <View style={[styles.box3]}>
        <Text>Foteer</Text>
      </View>
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  //header
  box1: {
    flex: 1,
    backgroundColor: "#2196F3",
    alignItems: 'center',
    justifyContent:'center',
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
    alignItems: 'center',
    justifyContent:'center',
  },
  viewIcon1:{
    alignItems: 'center',
    justifyContent:'center',
    width: 50,
    height: 50,
    backgroundColor: COLORS.goldyelow,
    borderRadius: 20,
    marginBottom: 10,
    // marginLeft: 55
},
icon1:{
  width: 20,
  height: 20,
  tintColor: COLORS.white
},
})
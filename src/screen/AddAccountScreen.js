import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import React, { useState } from "react";
  import { imgages, icons, theme } from "../constants";
  import RadioForm from "react-native-simple-radio-button";
  import { Button, ListItem } from "react-native-elements";
  
  const { COLORS, SIZES, FONTS } = theme;
  
  const AddAccountScreen = () => {
    const [value, setValue] = useState(0);
    const items = [
      { label: "Thu", value: 0 },
      { label: "Chi", value: 1 },
    ];
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
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={[styles.box1]}>
            <Text>Thêm Ví</Text>
            <Text>{list[0].name}</Text>
          </View>
  
          <View style={[styles.box2]}>
          <View style={styles.viewText3}>
          <ListItem.Content>
                  <ListItem.Title>Số dư</ListItem.Title>
                  <TextInput style={{color:'red'}}>
                    {list[0].amount} 
                    </TextInput>
                </ListItem.Content>
            </View>
            <View style={styles.viewText3}>
              <Text style={styles.text1}>Thay đổi</Text>
              <View style={styles.viewIcon1}>
                <Image style={styles.icon1} source={icons.game} />
              </View>
            </View>
  
            <View style={styles.viewText3}>
              <Text style={styles.text1}>Thay đổi màu</Text>
              <View style={styles.viewIcon1}>
                <Image style={styles.icon1} source={icons.game} />
              </View>
            </View>
  
            <View style={styles.viewText3}>
              <Text style={styles.text1}>Thêm người dùng ví</Text>
            </View>
  
            <View style={{ flex: 1, alignItems: "flex-end", width: "90%", marginTop:20 }}>
              <Button  title="Lưu nè" style={{width:100}}/>
            </View>
          </View>
  
          <View style={[styles.box3]}>
            <Text>Foteer</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddAccountScreen;
  
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
    text1: {
      fontSize: SIZES.h3,
      marginBottom: 10,
    },
  });
  
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView,StatusBar, ImageBackground ,Animated, TextInput} from 'react-native'
import React,{useState, useContext, useEffect} from 'react'
import { imgages, icons, theme } from '../../constants';
//import {imgages, icons, theme} from '../../src/constants'
import {VictoryPie} from 'victory-native'
//import { LinearGradient } from 'expo-linear-gradient';
//import { BottomPopup } from '../components/BottomPopup';
//import { AppHeader} from "../components"
const {COLORS, SIZES, FONTS} = theme;
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { set, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { BottomPopup } from '../../components';
import { useIsFocused } from '@react-navigation/native';



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

const InCategory = () => {

    const [featuresDatas, setFeaturesData] = useState(featuresData);
    const filterModalSharedValue1 = useSharedValue(SIZES.height);
    const filterModalSharedValue2 = useSharedValue(SIZES.height);
    const [item1s, setItems] = useState({});

    const [posts, setPosts] = useState({});
    const [posts1, setPosts1] = useState({});
    const [walletId, setWalletId] = useState({});
    const {userInfo} = useContext(AuthContext);
    const isFocused = useIsFocused();
    


    const setPress = (item)=>{
      setItems(item)
    }

  //get api 
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/category/in-come`, {
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

   //Api Wallet
   const [postWallet, setPostWallet] = useState({});
   //get wallet
   const getPostWallet = () => {
     axios
       .get(`${BASE_URL}/wallet`, {
         headers: {Authorization: `Bearer ${userInfo.token}`},
       })
       .then(res => {
         console.log(res.data);
         setPostWallet(res.data);
       })
       .catch(e => {
         console.log(`Error on getting posts ${e.message}`);
       });
   };
 
   useEffect(() => {
     getPostWallet();
   }, []);
   
  // console.log(postWallet)
  //id wallet
  
  
  const [idWallet, setidWallet] = useState({});

  useEffect(() => {
    if (postWallet && postWallet.data && postWallet.data.length > 0) {
      const data = postWallet.data;
      const id = data[0].id;
      setidWallet(id);
    } else {
      console.log('Response or data is undefined or empty');
    }
  }, [postWallet]);

  
    


 //Api end 






    function renderFeatures(){
        const headerFeature = ()=>(
            <View style={{ marginBottom: SIZES.padding,justifyContent:'space-between', flexDirection: 'row' }}>
                <View style={{ flex:1 }}><Text style={{ ...FONTS.h2 }}>Các danh mục</Text></View>
                
            </View>
        )
        
        const renderItem = ({item}) =>(
            <TouchableOpacity style={styles.touchFeature} 
            onPress={()=>{
                filterModalSharedValue1.value = withTiming(0,{
                  duration: 100
                })
                filterModalSharedValue2.value = withDelay(100, 
                  withTiming(0, {
                    duration: 500
                  }))
                  setPress(item)
                }}
            >    
              <Text>{item.name}</Text>
               
                <View style={{ 
                    height: 50,
                    width: 50,
                    marginBottom: 5,
                    marginTop: 5,
                    borderRadius: 20,
                    backgroundColor: item.color,
                    alignItems: 'center',
                    justifyContent: 'center'
                 }}>
                    <Image 
                        //source={icons.delivery}
                        //source={{ uri: item.icon }}
                        source={{ uri: item.icon }}
                        resizeMode="contain"
                        style={{ 
                            height: 20,
                            width: 20,
                            tintColor: "#5D5D5D"
                         }}
                    />
                </View>
      
            </TouchableOpacity>
        )
      
        return(
            <FlatList
                ListHeaderComponent={headerFeature}
                data={posts.data}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'flex-start' }}
                keyExtractor={item =>`${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding }}
            />
        )
      }
      function renderBottom(){
        return(
            <View style={{ flex:1 }}>
                 <BottomPopup 
                   filterModalSharedValue1 = {filterModalSharedValue1}
                    filterModalSharedValue2={filterModalSharedValue2}
                    id={item1s.id}
                    name={item1s.name}
                    icon={item1s.icon}
                    color={item1s.color}
                    idWallet={idWallet}
                 />
            </View>
        )
      }
  return (
    
    <View style={{ flex: 1 }}>
    <View style={{ paddingHorizontal: SIZES.padding }}>   
         {renderFeatures()}
    </View>
        
         {renderBottom()}
     </View>
    
  )
}

export default InCategory

const styles = StyleSheet.create({
    touchFeature:{
        marginBottom: SIZES.padding,
        
        marginHorizontal: SIZES.base,
        width: 60,
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView,StatusBar, ImageBackground ,Animated} from 'react-native'
import React,{useState, useContext, useEffect} from 'react'
import {imgages, icons, theme} from '../../src/constants'
import {VictoryPie} from 'victory-native'
import { LinearGradient } from 'expo-linear-gradient';
import { BottomPopup } from '../components/BottomPopup';
import { AppHeader} from "../components"
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config'
import { useIsFocused } from '@react-navigation/native';

const {COLORS, SIZES, FONTS} = theme;

const confirmStatus = "C";
const pendingStatus = "P";

let categoriesData= [
    {
        id: 1 ,
        name: "Education",
        color: COLORS.blue,
        expenses:[
            {
                id: 1,
                title: "Tuition Fee",
                total: 100.00,
                status: pendingStatus,
            },
            {
                id: 2,
                title: "React Native",
                total: 30.00,
                status: pendingStatus,
            },
            {
                id: 3,
                title: "My SQL",
                total: 20.00,
                status: confirmStatus,
            },
            {
                id: 4,
                title: "PHP",
                total: 20.00,
                status: confirmStatus,
            },
        ],
    },
    {
        id: 2,
        name: "Nutrition",
        color: COLORS.white,
        expenses:[
            {
                id: 5,
                title: "Vitamins",
                total: 25.00,
                status: pendingStatus,
            },
            {
                id: 6,
                title: "Protein proder",
                total: 50.00,
                status: confirmStatus,
            },
        ],
    },
    {
        id: 3,
        name: "Child",
        color: COLORS.green,
        expenses:[
            {
                id: 7,
                title: "Toys",
                total: 25.00,
                status: confirmStatus,
            },
            {
                id: 8,
                title: "Baby Car Seat",
                total: 100.00,
                status: pendingStatus,
            },
            {
                id: 9,
                title: "Papers",
                total: 100.00,
                status: pendingStatus,
            },
        ],
    },
    {
        id: 4,
        name: "Nutrition",
        color: COLORS.pink,
        expenses:[
            {
                id: 10,
                title: "Vitamins",
                total: 25.00,
                status: pendingStatus,
            },
            {
                id: 11,
                title: "Protein proder",
                total: 25.00,
                status: confirmStatus,
            },
        ],
    },
  
]



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

let specialPromoData = [
    {
        id: 1,
        img: imgages.onboarding1,
        title: "Bonus CashBank2",
        description: "Don't miss it. Grap it now"
    },
    {
        id: 2,
        img: imgages.onboarding1,
        title: "Bonus CashBank2",
        description: "Don't miss it. Grap it now"
    },
    {
        id: 3,
        img: imgages.onboarding1,
        title: "Bonus CashBank2",
        description: "Don't miss it. Grap it now"
    },
    {
        id: 4,
        img: imgages.onboarding1,
        title: "Bonus CashBank2",
        description: "Don't miss it. Grap it now"
    }
]

const Home1 = ({navigation}) => {
    const [categories, setCategories] = useState(categoriesData)
    const [featuresDatas, setFeaturesData] = useState(featuresData)
    const [specialPromoDatas, setSpecialPromoData] = useState(specialPromoData)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [posts, setPosts] = useState({});
    const {userInfo} = useContext(AuthContext);
    const isFocused = useIsFocused();

  //get api 
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/home/out-come`, {
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
    console.log('call get post')
    getPosts();
  }, [isFocused]);

  //end api get



    function processCategoryDataToDisplay(){
        //Filter expenses with "Confirmed" status
        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.status == "C")
            var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        }) 

        //Filter out categories with no data/expenses
        let filterChartData = chartData.filter(a => a.y > 0 )
        //Calculate the total expenses
        let totalExpenses = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        //Calculate percentage and repopulate chart data
        let finalChartData = filterChartData.map((item) =>{
            let percentage = (item.y / totalExpenses * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id,
            }
        })

        return finalChartData;
            
    }
    function renderChart(){
        let chartData = processCategoryDataToDisplay()
        let colorScales =chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a,b) => a + (b.expenseCount || 0), 0)
        return (
            <View style={styles.viewChart}>
                <VictoryPie 
                data={chartData}
                colorScale={colorScales}
                labels={(datum) => `${datum.y}`}
                radius={SIZES.width * 0.4 - 30}
                innerRadius={90}
                labelRadius={({innerRadius}) => (SIZES.width * 0.4 + innerRadius) /2.5}
                style={{ 
                    labels: {fill: COLORS.white},
                    parent: {
                        ...styles.view1

                    }
                 }}
                width={SIZES.width * 0.8}
                height={SIZES.height * 0.5}
                />
                <View style={styles.textChart}>
                    <Text style={{
                     color:'black',
                     ...FONTS.h1 }}>{posts.totalOutCome}</Text>
                    <Text>{posts.totalInCome}</Text>
                </View>
            </View>
        )
    }
    function renderHeader(){
       return(
        <View style={{ flex:1 }}>
             <AppHeader
             title={"Home"}
             headerBg={"#60c5a8"}
             iconColor={"black"}
             back
             onRightPress={()=>navigation.navigate("Tabs")}
             optionalBadge={5}
             right="more-vertical"
             rightFunction={() => console.log('right')}
             optionalIcon="bell"
             optionalFunc={() => console.log('optional')}
            />
        </View>
       )
    }

    function renderFeatures(){
        const headerFeature = ()=>(
            <View style={styles.viewFeature}>
                <View style={{ flex:1 }}><Text>Features</Text></View>
                <View style={styles.viewFeatureHeader}>
                    <TouchableOpacity style={styles.touchTouch1} onPress={()=>navigation.navigate("Adjust")}>
                        <Image source={icons.adjust} style={{ width:20, height:20, }}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
        
        const renderItem = ({item}) =>(
            <TouchableOpacity style={styles.touchFeature} 
                onPress={()=> navigation.navigate("Edit", {post: 1, post1: 2})}
            >    
                <View style={{ justifyContent: 'center' }}><Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 70,justifyContent: 'center',alignItems: 'center' }}>{item.category}</Text></View>
                
                <View style={{ 
                    
                    backgroundColor: item.color,
                    ...styles.viewItemFeature
                 }}>
                    <Image 
                        //source={item.icon}
                        source={{ uri:item.icon }}
                        resizeMode="contain"
                        style={{ 
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white
                         }}
                    />
                </View>
                <Text style={{ ...FONTS.h4 }}>{item.price}</Text>

            </TouchableOpacity>
        )

        return(
            <FlatList
                ListHeaderComponent={headerFeature}
                data={posts.categoryCustomDTO}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'flex-start' }}
                keyExtractor={item =>`${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding }}
            />
        )
    }
    function renderHeaderChart(){
        return(
            <View style={{ flexDirection:'row',marginVertical: SIZES.padding }}>
                <View style={{ flex:1 }}>
                    <Text>HELLO !</Text>
                    <Text>Sam</Text>

                </View>
                <View style={{ alignItems: 'center',  justifyContent: 'center' }}>
                    <TouchableOpacity style={{ alignItems: 'center',  justifyContent: 'center', height: 40, width:40,backgroundColor:COLORS.white, borderRadius: 20 }}>
                        <Image source={icons.uers} style={{ width:20, height:20, }}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function renderPromos(){

        const HeaderComponent=() => (
            <View>
            {renderHeaderChart()}
            {renderChart()}
            {renderFeatures()}
            </View>
        )
        
        const renderItems = ({item})=>(
           
            <TouchableOpacity
                style={styles.touchFlat}
                 
                >
                    <View
                        style={styles.touchView1}>
                            <Image
                                source={imgages.onboarding2}
                                resizeMode="cover"
                                style={styles.touchImg}

                            />


                    </View>
                    <View style={styles.touchView2}>
                       
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        
                    </View>
                  
            </TouchableOpacity>
            
            
        )
            
            
             

        return(
            <FlatList
            ListHeaderComponent={HeaderComponent}
            contentContainerStyle={{ paddingHorizontal: SIZES.padding  }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent:'space-between'}}
            data={specialPromoDatas}
            renderItem={renderItems}
            keyExtractor={item =>`${item.id}`}
            showsVerticalScrollIndicator={false}
            
            />
        )

    }
  return (
    <View style={{ flex:1 }}>
    <StatusBar barStyle="light-content" hidden={true}/> 
    <View style={{flex:0.1, justifyContent:'center' }}>{renderHeader()}</View>
    <View style={styles.view2}>
    
    {renderPromos()}  
    </View>
    
    
    
    {/*
    <LinearGradient colors={[COLORS.pink , COLORS.blue]} style={{ flex:1 }}>
        <View style={styles.container}>
            
            
         <View style={styles.view2}>
             {renderPromos()}   
         </View>
      </View>
    
    </LinearGradient>
    */}
    </View>
    
  )
}

export default Home1

const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        alignItems:'center',
        justifyContent:'flex-start'
    },
   
    view1:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    view2:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewChart:{
        alignItems:'center',
        justifyContent:'center'
    },
    header:{
        
        width: '100%',
        backgroundColor: COLORS.blue,
    }, 
    headerPlaceHolde: {
        height: 40,
    },
    uperHeader:{
        height: 40,
    },
    lowHeader:{
        height: 96
    },
    textChart:{
        position: "absolute",
        top: '42%',
        left: '35%',
    },
    touchFlat:{
        marginVertical: SIZES.base,
        marginHorizontal: SIZES.base,
        width: SIZES.width / 2.5
    },
    touchView1:{
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.blue

    },
    touchImg:{
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    },
    touchView2:{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    headerView:{
        width: '100%',
        height: 200,
       
        
    },
    touchFeature:{
        marginBottom: SIZES.padding,
        
        marginHorizontal: SIZES.base,
        width: 60,
        alignItems: 'center'
    },
    textFeature:{
        textAlign:'center',
        flexWrap:'wrap', 
    },
    textTotalFeature:{
        textAlign: 'center',
        flexWrap:'wrap'
    },
    shawdow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0 ,
            height: 10,
        },
        shawdowOpacity: 0.25,
        shawdowRadius: 3.5,
        elevation: 5
    },
    headerViewImge:{
        marginTop: SIZES.padding ,
        width: '100%',
        alignItems: 'baseline',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: SIZES.padding
    },
    headerIcon:{
        width: 35,
        height: 35,
        alignItems:'center',
        justifyContent:'center'
    },
    touchTouch1:{
        alignItems: 'center',  
        justifyContent: 'center', 
        height: 40, width:40,
        backgroundColor:COLORS.white, 
        borderRadius: 20
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

    }


   
   

})
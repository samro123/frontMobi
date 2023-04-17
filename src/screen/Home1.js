import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import {imgages, icons, theme} from '../../src/constants'
import {VictoryPie} from 'victory-native'
import { LinearGradient } from 'expo-linear-gradient';

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
        description: "Shopping",
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
                radius={SIZES.width * 0.4 - 10}
                innerRadius={70}
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
                    <Text>{totalExpenseCount}</Text>
                    <Text>Expenses</Text>
                </View>
            </View>
        )
    }
    function renderHeader(){
        return(
            <View style={styles.headerView}>
               <View style={{ flex: 1 }}>
                <Text>Hello</Text>
                <Text>ByProgram</Text>

               </View>
            </View>
        )
    }

    function renderFeatures(){
        const headerFeature = ()=>(
            <View style={{ marginBottom: SIZES.padding }}>
                <Text>Features</Text>
            </View>
        )
        
        const renderItem = ({item}) =>(
            <TouchableOpacity style={styles.touchFeature} 
                onPress={()=> navigation.navigate("Edit")}
            >    
                <Text>{item.description}</Text>
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
                <Text>{item.total}</Text>

            </TouchableOpacity>
        )

        return(
            <FlatList
                ListHeaderComponent={headerFeature}
                data={featuresDatas}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item =>`${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding }}
            />
        )
    }

    function renderPromos(){

        const HeaderComponent=() => (
            <View>
            {renderHeader()}
            {renderChart()}
            {renderFeatures()}
            </View>
        )
           
        

        const renderItems = ({item})=>(
           
            <TouchableOpacity
                style={styles.touchFlat}
                 onPress={()=> console.log(item.title)}
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
    <LinearGradient colors={[COLORS.pink , COLORS.blue]} style={{ flex:1 }}>
        <SafeAreaView style={styles.container}>
            {/*
         <View style={styles.view1}>
            {renderChart()}
         </View>
          */}
         <View style={styles.view2}>
             {renderPromos()}   
         </View>
      </SafeAreaView>
    
    </LinearGradient>
  )
}

export default Home1

const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        alignItems:'center',
        justifyContent:'center'
    },
   
    view1:{
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
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
    textChart:{
        position: "absolute",
        top: '42%',
        left: '42%',
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
        flexDirection:'row', 
        marginVertical: SIZES.padding

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
   

})
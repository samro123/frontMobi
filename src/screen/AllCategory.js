import { StyleSheet, Text, View, Animated, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import {icons, imgages, theme} from '../../src/constants'
import { LineDiviver } from '../components';
import InCategory from './TabAdjust/InCategory';
import OutCategory from './TabAdjust/OutCategory';


const {COLORS, SIZES, FONTS} = theme;


let list = [
    {
        id: 0,
        label: "Chi Phí",
    },
    {
        id: 1,
        label: "Thu Nhập",
    },
]

const ListDatass = list.map((lists)=>({
    ...lists,
    ref: React.createRef()
}))

const TabIndicator = ({measureLayout,scrollX}) =>{

    const inputRange = list.map((_, i)=> i * SIZES.width) 
    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })
    return(
        <Animated.View
            style={{ 
                position:'absolute',
                bottom: 0,
                height: 4,
                width: tabIndicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor:COLORS.blue,
                transform: [{translateX}]
             }}
        />
    )
}

const Tabs = ({scrollX ,onTabPress})=>{

    const [measureLayout, setMeasureLayout]= React.useState([])
    const containerRef = React.useRef()

    React.useEffect(() =>{
        let ml = []

        ListDatass.forEach(lists =>{
            lists?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height)=>{
                    ml.push({
                        x, y, width, height
                    })

                    if(ml.length === list.length){
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])
    
    return (
        <View 
            ref={containerRef}
            style={{ flex: 1, flexDirection:'row' }}
        >
            {/*Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX}/>}

            {/* Tabs */}
            {ListDatass.map((item, index) =>{
                return(
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        ref={item.ref}
                        style={{ flex: 1, paddingHorizontal: 15,alignItems: 'center',  justifyContent: 'center' }}
                        onPress={()=>onTabPress(index)}
                    >
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
const AllCategory = ({navigation}) => {
    const [listDatas, setListDatas] = React.useState(list)
    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    const onTabPress = React.useCallback(tabIndex =>{
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    } )

    function renderContent(){
        return(
            <View style={{ flex:1 }}>
                {/*Tabs*/}
                <View style={{ height: 60 }}>
                    <Tabs scrollX={scrollX} onTabPress={onTabPress}/>
                </View>
                {/*Liner Divider*/}
                <LineDiviver 
                    lineStyle={{ backgroundColor:COLORS.gray }}
                />

                {/*Content*/}
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    keyboardDismissMode="on-drag"
                    showsHorizontalScrollIndicator={false}
                    data={listDatas}
                    keyExtractor={item =>`${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: {contentOffset: {x : 
                            scrollX
                            }}}
                        ],{useNativeDriver: false})
                    }
                    renderItem={({item,index}) =>{
                        return(
                            <View style={{ width:SIZES.width }}>
                                {index == 0 && <InCategory/>}
                                {index == 1 && <OutCategory/>}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

  return (
    <View style={{ flex: 1 , backgroundColor:COLORS.white }}>
      {renderContent()}
    </View>
  )
}

export default AllCategory

const styles = StyleSheet.create({})
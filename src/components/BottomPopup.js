import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import {imgages, icons, theme} from '../../src/constants'
const deviceHeight = Dimensions.get('window').height
export class BottomPopup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    show = ()=>{
        this.setState({show:true})
    }
    close = ()=>{
        this.setState({show:false})
    }

    renderOutsideTouch(onTouch){
        const view = <View style={{ flex: 1,  width:'100%'}}/>
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }} >
                {view}
            </TouchableWithoutFeedback>
        )
    }
    
    renderTitle = ()=>{
        const {title, image} = this.props
        return (
            <View >
                <Text style={styles.text1}>
                     {title}
                </Text>
                <Image source={image} style={styles.img1}/>
               
           </View>
        )
    }

    renderContent = ()=>{
        return(
            <View>
                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text>Danh Muc</Text>
                        <Text>Do an</Text>
                    </View>
                    <View style={styles.viewImg1}>
                        <Image source={imgages.category} style={styles.img1}/>
                    </View>

                </View>
                <View></View>
            </View>
        )

    }
    render(){
        let {show} = this.state
        const {onTouchOutside,title, image} = this.props
        return(
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.close}
            > 
                <View style={styles.container}>
                    {this.renderOutsideTouch(onTouchOutside)}
                    <View style={styles.view1}>
                        
                        {this.renderContent()}
                        
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent:'flex-end', 
        backgroundColor:'#000000AA'
    },
    view1:{
        backgroundColor:'#FFFFFF',
        width:'100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: deviceHeight * 0.4
    },
    view2:{
        width:'100%',
        backgroundColor:'#75DD79',
        justifyContent: 'space-around',
        alignItems:'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    view3:{
        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
   
    text1:{
        color: '#182E44',
        fontSize: 20,
        fontWeight: '500',
        margin: 15
    },
    img1:{
        width: 30,
        height: 30
    },
    viewImg1:{
        height: 50,
        width: 50,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#FFF8FF',
        borderWidth: 1.5  
    }
    
    
})
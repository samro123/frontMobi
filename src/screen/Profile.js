import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import {icons, imgages, theme} from '../../src/constants'
import {ProgressBar, AppHeader, Buttons,TextButton, ProfileValue, LineDiviver,ProfileButtonRadio} from "../components"

const {COLORS, SIZES, FONTS} = theme;

const Profile = ({navigation}) => {
    const [newCourseNotifition, setNewCourseNotifition] = React.useState(false)
    const [studyReminder, setStudyReminder] = React.useState(false)
    function renderProfileCard(){
        return(
          <View style={{ 
            flexDirection:'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            paddingVertical: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.green,
         
           }}>
               {/* Profile Imge*/}
               <TouchableOpacity 
                style={{ width: 80, height: 80 }}>
                <Image source={imgages.finance} 
                  style={{ width:"100%", height:"100%", borderRadius: 40,borderWidth: 1, borderColor: COLORS.white }}
                />

                <View style={{ position: 'absolute', width:'100%', height:'100%', alignItems:'center', justifyContent:'flex-end' }}>
                  <View
                  style={{ 
                    width: 30,
                    height:30,
                    marginBottom:-15,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderRadius:15,
                    backgroundColor: COLORS.lightpink
                   }}
                  >
                    <Image source={icons.camera} resizeMode='contain' style={{ width: 17, height:17, }}/>

                  </View>

                </View>

               </TouchableOpacity>

               {/* Details */}
               <View style={{ flex:1, marginLeft: SIZES.radius, alignItems: 'flex-start' }}>
                   <Text style={{ color: COLORS.white, fontSize: 20 }}>ByProgram</Text>
                   <Text style={{ color: COLORS.white, fontSize: 10 }}>Full Stack Developer</Text>

                   {/* Progress*/}
                   <ProgressBar 
                    progress="58%"
                    containerStyle={{ 
                      marginTop: SIZES.padding
                     }}
                   />
                   <View style={{ flexDirection: 'row' }}>
                     <Text style={{ flex:1, color:COLORS.white }}>Overall Progress</Text>
                     <Text style={{ color:COLORS.white}}>50%</Text>
                   </View>
                    
                    {/* Member */}
                   <TextButton 
                    lable="+ Become Member"
                    contentContainerStyle={
                      {
                        height: 35,
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: 20,
                        backgroundColor: COLORS.white
                      }
                    }
                    labelStyle={{ color:COLORS.blue }}
                   />
                    
               </View>
          </View>
        )
          
    }


  function renderProfileSection1(){
      return(
        <View style={styles.profileSectionContainer}>
          <ProfileValue 
           icon={icons.phone}
           lable="Name"
           value="ByProgram"
          />
          <LineDiviver/> 

          <ProfileValue 
           icon={icons.game}
           lable="Name"
           value="ByProgram"
          />
          <LineDiviver/>

          <ProfileValue 
           icon={icons.game}
           lable="Name"
           value="ByProgram"
          />
          <LineDiviver/>

          <ProfileValue 
           icon={icons.game}
           lable="Name"
           value="ByProgram"
          />
        </View>
      )
  }
  
  function renderProfileSection2(){
    return (
      <View style={styles.profileSectionContainer}>
          <ProfileValue 
           icon={icons.game}
           lable="Name"
           value="ByProgram"
          />
          <LineDiviver/>
          <ProfileButtonRadio
            icon={icons.food}
            lable="New Course Notifications"
            isSelection={newCourseNotifition}
            onPress={()=>setNewCourseNotifition(!newCourseNotifition)}
          />

          <LineDiviver/>
          <ProfileButtonRadio
            icon={icons.food}
            lable="New study"
            isSelection={studyReminder}
            onPress={()=>setStudyReminder(!studyReminder)}
          />


      </View>
    )
  }

  function renderHeader(){
    return(
      <View >
           <AppHeader
             title={"Cá Nhân"}
             headerBg={"#60c5a8"}
             iconColor={"black"}
             back
             onRightPress={()=>navigation.navigate("Home1")}
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
    <View 
    style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View>
        {renderHeader()}
      </View>
      <ScrollView contentContainerStyle={{ 
        paddingHorizontal:SIZES.padding,
        paddingBottom: 150
       }}>
        {renderProfileCard()}
        {/*Profile section 1*/}
        {renderProfileSection1()}

         {/*Profile section 2*/}
         {renderProfileSection2()}

      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    profileSectionContainer:{
      marginTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      borderWidth: 1,
      borderColor:COLORS.gray,
      borderRadius: 10
    }
})
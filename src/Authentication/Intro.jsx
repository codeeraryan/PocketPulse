import { Text, View,Image, StatusBar, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import darkColorSchemes from '../../assets/colors'
import tailwind from 'twrnc'

const Intro = ({navigation}) => {
    const insets=useSafeAreaInsets();
    const userDetail=useContext(FirebaseContext);
    console.log(userDetail);
    
    
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.darkMode.background}}>
    <View  style={tailwind`top:${insets.top} justify-around h-full `}>
      <View>
        <Pressable onPress={()=>{userDetail.setIsLoginActive(true);navigation.navigate("Auth")}}><Text  style={tailwind`absolute right-0 pt-5 pr-5 text-white font-semibold text-[4.5]`}>Sign In</Text></Pressable>
        <View style={tailwind`items-center justify-center mt-50`}><Image style={tailwind`h-75 w-50`}  source={require("../../assets/images/symboll.png")}/></View>
      </View>
      <View style={tailwind` mx-8 gap-3 `} >
        <View style={tailwind`gap-5 `}>
        <Text style={tailwind`text-white text-2xl font-semibold mx-3 text-center`}>Manage & take control of your finances </Text>
        <Text style={tailwind`text-white/50 text-center`}>Add ur Income & expeses on a single place to stay aware of your limits</Text>
        </View>
        <TouchableOpacity onPress={()=>{userDetail.setIsLoginActive(false);navigation.navigate("Auth")}} style={tailwind`bg-[#c7ea46] justify-center items-center  rounded-xl p-3 `} ><Text style={tailwind`font-semibold text-xl`}>Get Started</Text></TouchableOpacity>
        </View>
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>
    </View>
  )
}


export default Intro


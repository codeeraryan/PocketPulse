import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image } from 'react-native';
import darkColorSchemes from '../../assets/colors';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { FirebaseContext } from '../context/FirebaseContext';

const Spalsh = ({navigation}) => {
     useEffect(()=>{setTimeout(()=>{userDetail.isLogin?navigation.navigate("tab"):navigation.navigate("Intro")},2000)},[])
     const userDetail=useContext(FirebaseContext);
      const [fontsLoaded] = useFonts({"DsSemi": require("../../assets/fonts/DancingScript-SemiBold.ttf"),"Agu": require("../../assets/fonts/agu.ttf")})
     
       if (!fontsLoaded) {
         return null
       }
  return (
    <View style={styles.container}>
    <View style={{height:330,width:310,}}><Image style={{height:"100%",width:"100%",}} source={require("../../assets/images/symbol1.png")}/></View>
    <Text style={{color:darkColorSchemes.darkMode.textPrimary,fontFamily:"Agu",fontSize:40}}>PocketPulse</Text>
    <StatusBar hidden={true} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkColorSchemes.darkMode.background,
      color:darkColorSchemes.darkMode.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Spalsh;



  
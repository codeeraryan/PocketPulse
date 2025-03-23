import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import darkColorSchemes from "../../assets/colors";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseContext } from "../context/FirebaseContext";


const Splash = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // To track when auth check is complete
  const {isLogin}=useContext(FirebaseContext);

  const getUserInfo=async()=>{
    try { const userHai= await AsyncStorage.getItem("userCred");
    const  result=await JSON.parse(userHai);
    setData(result); // Update the state with the resolved value
  
  }
    catch(err){
     console.log(err)
    }
    finally{
     setLoading(false);
    }
    
   }
  useEffect(() => {
  getUserInfo();
    },[loading]);

  

  // Navigate based on auth state once checked
  useEffect(() => {
    if(loading==false)
      setTimeout(() => {
       data ? navigation.navigate("tab") :navigation.navigate("Intro");
      }, 2000);
    
  },[loading]);

  const [fontsLoaded] = useFonts({
    DsSemi: require("../../assets/fonts/DancingScript-SemiBold.ttf"),
    Agu: require("../../assets/fonts/agu.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Ensure fonts are loaded before rendering
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 330, width: 310 }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={require("../../assets/images/wel.png")}
        />
      </View>
      <Text
        style={{
          color: darkColorSchemes.darkMode.textPrimary,
          fontFamily: "Agu",
          fontSize: 40,
        }}
      >
        PocketPulse
      </Text>
      <StatusBar hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColorSchemes.darkMode.background,
    color: darkColorSchemes.darkMode.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Splash;

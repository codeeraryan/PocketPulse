import { initializeApp } from "firebase/app";
import { createContext } from "react";
import { Alert, ToastAndroid } from "react-native";
import { getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut } from "firebase/auth";
import React from "react";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import { apiKey } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "pocketpulse3.firebaseapp.com",
  projectId: "pocketpulse3",
  storageBucket: "pocketpulse3.firebasestorage.app",
  messagingSenderId: "511973618838",
  appId: "1:511973618838:web:a8072dd268920270c07eb7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db=getFirestore(app);
export {db}

export  const FirebaseContext=createContext();

export const FirebaseProvider=({children})=>{
  const [isLogin,setIsLogin]=useState(false);
    const [isLoginActive,setIsLoginActive]=useState(false);
    const [userInfo,setUserInfo]=useState("");
   const [image, setImage] = useState(null);
  const signUp=async(name,email,password,navigation)=>{
    try{
      const userCredential=await createUserWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      setIsLogin(true);
      ToastAndroid.show(`Registered successfully`, ToastAndroid.SHORT);
      setUserInfo(userCredential);
      AsyncStorage.setItem("userCred",JSON.stringify(userCredential));
      navigation.navigate("tab")
    }
    catch(error){ ToastAndroid.show(`error occured: ${error.message}`, ToastAndroid.SHORT);}
  }

  const Logout=async(navigation)=>{
    try{
      await signOut(auth);
      await AsyncStorage.removeItem("userCred");
      setIsLogin(false);
      navigation.replace('Intro')
       
      ToastAndroid.show('user Logged Out', ToastAndroid.SHORT);

    }
    catch(error){
      ToastAndroid.show(`error occured: ${error.message}`, ToastAndroid.SHORT);}
    }

  const Login=async(email,password,navigation)=>{
    try{
      const userCredential=await signInWithEmailAndPassword(auth,email,password);
      console.log(userCredential)
      setIsLogin(true);
      ToastAndroid.show(`Welcome back ${userCredential.user.displayName}`, ToastAndroid.SHORT);
      setUserInfo(userCredential);
      AsyncStorage.setItem("userCred",JSON.stringify(userCredential));
      navigation.navigate("tab");
    }
    catch(error){
      ToastAndroid.show(`error occured: ${error.message}`, ToastAndroid.SHORT);}
    }

 
  
  
  

  return (
    <FirebaseContext.Provider value={{signUp,Login,Logout,isLogin,setIsLogin,isLoginActive,setIsLoginActive,userInfo,image, setImage}}>{children}</FirebaseContext.Provider>
  )
}
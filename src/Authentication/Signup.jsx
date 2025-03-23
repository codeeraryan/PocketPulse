import {  Text, View, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useContext  } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import darkColorSchemes from '../../assets/colors'
import tailwind from 'twrnc'
import { AtSign, Eye, EyeOff, LockKeyhole, UserPen } from 'lucide-react-native'


const Signup = ({navigation}) => {
     const insets=useSafeAreaInsets();
        const userDetail=useContext(FirebaseContext);
       
        const [email,setEmail]=useState("")
        const [pass,setPass]=useState("")
        const [name,setName]=useState("")
        const [secure,setSecure]=useState(false)
      
        const handleSignUp=()=>{
          userDetail.signUp(name,email,pass,navigation);
        
        }
        
  return (
   <View  style={tailwind`top:${insets.top}  h-full mx-8 `}>
    <KeyboardAvoidingView enabled behavior='position' >
        <View>
        <Text  style={tailwind`mt-30 text-white font-semibold text-3xl`}>Let's</Text>
        <Text  style={tailwind` text-white font-semibold text-3xl`}>Get Started</Text>
        <Text  style={tailwind` text-white mt-10`}>Create an account to track Your expenses</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tailwind`gap-3 mt-8`} >
        <View style={tailwind`gap-5`}>
         <View style={tailwind`p-2  border-2 border-white rounded-xl mt-5 items-center justify-start gap-3 flex-row `}><UserPen color={'white'}/><TextInput onChangeText={value=>setName(value)} value={name} placeholderTextColor={darkColorSchemes.darkMode.textSecondary} style={tailwind`text-white w-full`} placeholder='Enter your name' /></View>  
         <View style={tailwind`p-2  border-2 border-white rounded-xl  items-center justify-start gap-3 flex-row `}><AtSign color={'white'}/><TextInput   onChangeText={value=>setEmail(value)} value={email} placeholderTextColor={darkColorSchemes.darkMode.textSecondary} style={tailwind`text-white w-full`} placeholder='Enter your email' /></View>  
         <View style={tailwind`p-2  border-2 border-white rounded-xl  items-center justify-start gap-3 flex-row `}><LockKeyhole color={'white'}/><TextInput secureTextEntry={!secure}   onChangeText={value=>setPass(value)} value={pass}  placeholderTextColor={darkColorSchemes.darkMode.textSecondary} style={tailwind`text-white w-[75%]`} placeholder='Enter your password' /><TouchableOpacity style={tailwind`flex-row `} onPress={()=>{setSecure(prev=>!prev)}}>{pass&&<View>{secure?<Eye color={'white'}/>:<EyeOff color={'white'}/>}</View>}</TouchableOpacity></View>  
      </View>
        <TouchableOpacity onPress={handleSignUp} style={tailwind`bg-[#c7ea46] justify-center items-center  rounded-xl p-3 `}><Text style={tailwind`font-semibold text-xl`}>SignUp</Text></TouchableOpacity>
         <View style={tailwind`flex-row justify-center gap-1 mt-5 items-center `}><Text style={tailwind`text-white`}>Already have an account?</Text><TouchableOpacity onPress={()=>{userDetail.setIsLoginActive(true);navigation.navigate("Auth")}}><Text style={tailwind`text-[#c7ea46] font-semibold`}>Login</Text></TouchableOpacity></View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
     
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>
    
  )
}

export default Signup


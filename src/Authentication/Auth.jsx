import { View,Pressable } from 'react-native'
import React, { useContext } from 'react'
import darkColorSchemes from '../../assets/colors'
import tailwind from 'twrnc'
import { FirebaseContext } from '../context/FirebaseContext'
import Login from './Login'
import Signup from './Signup'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
const Auth = ({navigation}) => {
        const userDetail=useContext(FirebaseContext);
         const insets=useSafeAreaInsets();
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.darkMode.background}}>
 <Pressable style={{top:insets.top,zIndex:2}} onPress={()=>navigation.goBack()} ><View style={tailwind`p-2 w-12 ml-4 mt-2 bg-[#c7ea46] items-center justify-center rounded-full`}><ChevronLeft color={'white'} size={30}/></View></Pressable>
      {userDetail.isLoginActive?
       <Login navigation={navigation}/>:<Signup navigation={navigation}/>
      }
    </View>
  )
}

export default Auth
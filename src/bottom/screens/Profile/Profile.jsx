import { View, Text,Image, Settings} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import darkColorSchemes from '../../../../assets/colors'
import { FirebaseContext } from '../../../context/FirebaseContext'
import { useContext } from 'react'
import { ChevronRight, GlobeLock, LogOut, SettingsIcon, UserPen } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
const Profile = ({navigation}) => {
      const insets=useSafeAreaInsets();
      const {userInfo,image}=useContext(FirebaseContext);
      console.log(image)
      
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.moodyBlack.background}}>
    <View  style={tailwind`top:${insets.top} mt-10  mx-4 h-full gap-5`}>
      <View style={tailwind`items-center gap-4`}>
        <Text style={tailwind`text-white text-2xl font-semibold`}>Profile</Text>
        <View style={tailwind`h-50 w-50  rounded-full overflow-hidden`}><Image style={tailwind`h-[100%] w-[100%]`} source={image?{uri:image}:require("../../../../assets/images/defaultAvatar.png")}/></View> 
        <View style={tailwind`items-center gap-2`}><Text style={tailwind`text-white text-xl font-semibold`}>{userInfo.user.displayName}</Text>
        <Text style={tailwind`text-white  font-semibold`}>{userInfo.user.email}</Text></View>
      </View>
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")} style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
         <View style={tailwind`flex-row gap-4 items-center`}><View style={tailwind`p-2 rounded-xl bg-blue-400`}>{<UserPen color={'white'}/>}</View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-[4] `}>Edit Profile</Text></View></View>
          <View ><ChevronRight color={'white'}/></View>
    </TouchableOpacity>
      <TouchableOpacity style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
         <View style={tailwind`flex-row gap-4 items-center`}><View style={tailwind`p-2 rounded-xl bg-green-400`}>{<SettingsIcon color={'white'}/>}</View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-[4] `}>Setting</Text></View></View>
          <View ><ChevronRight color={'white'}/></View>
    </TouchableOpacity>
      <TouchableOpacity style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
         <View style={tailwind`flex-row gap-4 items-center`}><View style={tailwind`p-2 rounded-xl bg-gray-400`}>{<GlobeLock color={'white'}/>}</View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-[4] `}>Privacy Policy</Text></View></View>
          <View ><ChevronRight color={'white'}/></View>
    </TouchableOpacity>
      <TouchableOpacity style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
         <View style={tailwind`flex-row gap-4 items-center`}><View style={tailwind`p-2 rounded-xl bg-red-400`}>{<LogOut color={'white'}/>}</View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-[4] `}>Logout</Text></View></View>
          <View ><ChevronRight color={'white'}/></View>
    </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default Profile
import { View, Text,Image, TextInput, ImageBackground} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import darkColorSchemes from '../../../../assets/colors'
import { FirebaseContext } from '../../../context/FirebaseContext'
import { useContext } from 'react'
import {ChevronLeft,Pen, Pencil } from 'lucide-react-native'
import { TouchableOpacity,Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({navigation}) => {
      const insets=useSafeAreaInsets();
      const {userInfo,image, setImage}=useContext(FirebaseContext);
     
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
      
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.moodyBlack.background}}>
    <View  style={tailwind`top:${insets.top}   mx-2 h-full gap-5`}>
      <View style={{top:insets.top,marginBottom:20}}><View style={tailwind`flex-row items-center gap-15`}><Text style={tailwind`text-white text-2xl font-semibold`}>Edit Profile</Text></View></View>    
    <View style={tailwind`items-center gap-4 `}>
        <View style={tailwind`h-50 w-50`}><TouchableOpacity style={tailwind`z-2 items-center justify-center absolute bottom-5 border-black-400 border-[1px] right-2  p-4 bg-white rounded-full h-5 w-5`} onPress={pickImage}><Pencil  color={'black'}/></TouchableOpacity><Image  style={tailwind`h-[100%] w-[100%] rounded-full  `} source={image?{uri:image}:require("../../../../assets/images/defaultAvatar.png")}/></View> 
        <View style={tailwind`items-center gap-2`}><Text style={tailwind`text-white text-xl font-semibold`}>{userInfo.user.displayName}</Text>
        <Text style={tailwind`text-white  font-semibold`}>{userInfo.user.email}</Text></View>
      </View>
       
       <View>
       <View><Text style={tailwind`text-white ml-2 text-xl font-semibold m-1`}>Name</Text><View style={tailwind`p-2  border-2 border-white rounded-xl  items-center justify-start gap-3 flex-row `}><TextInput placeholderTextColor={darkColorSchemes.darkMode.textSecondary} style={tailwind`text-white w-[85%]`} placeholder={userInfo.user.displayName} /><TouchableOpacity style={tailwind`flex-row `} ><View><Pen color={'white'}/></View></TouchableOpacity></View>  
       </View>
   
      
      </View>
    </View>
    </View>
  )
}

export default EditProfile
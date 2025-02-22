import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import darkColorSchemes from '../../../assets/colors';
import tailwind from 'twrnc';
import { ChevronLeft } from 'lucide-react-native';

const AddTransaction = ({navigation}) => {
    const insets=useSafeAreaInsets();
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.moodyBlack.background}}>
      <View style={{top:insets.top}}>
       <View style={tailwind`flex-row gap-15 items-center`}><TouchableOpacity onPress={()=>navigation.goBack()} ><View style={tailwind`p-2 w-12 ml-4 mt-2 bg-[#c7ea46] items-center justify-center rounded-full`}><ChevronLeft color={'white'} size={30}/></View></TouchableOpacity><Text style={tailwind`text-white text-xl font-semibold`}>AddTransaction</Text></View>
      </View>
      <StatusBar barStyle={'light-content'} hidden={false} />
    </View>
  )
}

export default AddTransaction


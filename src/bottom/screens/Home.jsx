import { View, Text, StatusBar,Image,TouchableOpacity,Pressable, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import darkColorSchemes from '../../../assets/colors'
import { FirebaseContext } from '../../context/FirebaseContext'
import {  ArrowDownCircle, ArrowUpCircle, DollarSign, Ellipsis, Heart, Search, Shirt } from 'lucide-react-native'
import TransactionCard from '../../Components/TransactionCard'
const Home = () => {
  const insets=useSafeAreaInsets();
  const userDetail=useContext(FirebaseContext);
  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.darkMode.background}}>
    <View  style={tailwind`top:${insets.top} mt-15 h-full mx-6`}>
      <View>
       <View style={tailwind`flex-row items-center justify-between mx-2`}> 
      <View><Text style={tailwind`text-white `}>Hello,</Text>
        <Text style={tailwind` text-white font-semibold text-[4.5]`}>{userDetail.userInfo.user.displayName}</Text></View>
        <Search color={'white'}/>
      </View>
        <View style={tailwind`items-center justify-center mt-5  `}><ImageBackground resizeMode='stretch' style={tailwind`h-50 w-[100%] rounded-xl gap-5 `}  source={require("../../../assets/images/card.png")}>
        <View style={tailwind`mx-6 mt-4 flex-row justify-between items-center`}><View><Text style={tailwind` font-semibold`}>Total Balance</Text><Text style={tailwind`text-2xl font-semibold`}>$ 7</Text></View><Ellipsis color={"black"}/></View> 
        <View style={tailwind`flex-row justify-between mx-6`}>
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowDownCircle color={'black'}/><Text>Income</Text></View><Text style={tailwind`text-green-400 ml-2 font-semibold text-[4]`}>$ 53.00</Text></View> 
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowUpCircle color={'black'}/><Text>Expense</Text></View><Text style={tailwind`text-red-400 ml-2 font-semibold text-[4]`}>$ 46.00</Text></View> 
        </View>
        </ImageBackground></View>
      </View>
      <View style={tailwind` gap-3 `} >
        <View style={tailwind`gap-5 `}>
        <Text style={tailwind`text-white text-xl font-semibold  `}>Recent Transactions</Text>
        </View>
        {/* transaction card */}
        <TransactionCard section="Health" fee="Checkup fee" Icon={Heart} feeType="Expense" amount="- $43" day="11dec" />
        <TransactionCard section="Internship" fee="salary" Icon={DollarSign} feeType="Income" amount="+ $53" day="16dec" />
        <TransactionCard section="Clothing" fee="winter shopping" Icon={Shirt} feeType="Expense" amount="- $3" day="31july" />
        </View>
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>
    </View>
    
  )
}

export default Home
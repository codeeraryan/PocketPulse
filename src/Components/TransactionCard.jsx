import { View, Text ,TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

const TransactionCard = ({section, fee, Icon, feeType, day,amount}) => {
  return (
    <TouchableOpacity style={tailwind`flex-row p-2 justify-between items-center bg-gray-200/10 rounded-2xl`}>
         <View style={tailwind`flex-row gap-4 items-center`}><View>{<Icon color={'#c7ea46'}/>}</View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-xl `}>{section}</Text><Text style={tailwind`text-white`}>{fee}</Text></View></View>
          <View style={tailwind`gap-1`}><Text style={tailwind`text-white font-semibold text-xl ${feeType=="Expense"?`text-red-400`:`text-green-400`}`}>{amount}</Text><Text style={tailwind`text-white`}>{day}</Text></View>
    </TouchableOpacity>
  )
}

export default TransactionCard
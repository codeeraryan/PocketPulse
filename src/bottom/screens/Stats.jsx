import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import darkColorSchemes from '../../../assets/colors';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { useStat } from '../../context/StatProvider';

const Stats = () => {
      const insets=useSafeAreaInsets();
        const {transactionStat,setTransactionStat,expenseStat,setExpenseStat,incomeStat,setIncomeStat}=useStat();
      
      const data = [
        { value: expenseStat/transactionStat*100, color: '#AB2346', text: 'expense' },
        { value: incomeStat/transactionStat*100, color: '#35FF69', text: 'income' },
      ]; 

      const barChartData = [
        {
          value: 50,
          label: "Mon",
          frontColor: "#3498db",
        },
        {
          value: 70,
          label: "Tue",
          frontColor: "#9b59b6",
        },
        {
          value: 40,
          label: "Wed",
          frontColor: "#e74c3c",
        },
        {
          value: 90,
          label: "Thu",
          frontColor: "#f1c40f",
        },
        {
          value: 60,
          label: "Fri",
          frontColor: "#2ecc71",
        },
        {
          value: 80,
          label: "Sat",
          frontColor: "#34495e",
        },
        {
          value: 100,
          label: "Sun",
          frontColor: "#1abc9c",
        },
      ];

      // const barData = [];

      const [active,setActive]=useState('today')

      const handleCategory=(category)=>{
         setActive(category);
      }

    const CategoryName=(name)=>{
     return name==active?`bg-slate-500`:`bg-zinc-900`
    }

  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.darkMode.background}}>
    <View  style={tailwind`top:${insets.top} mt-10 h-full mx-6 `}>
      <View>
      <Text style={tailwind`text-white text-2xl font-semibold mx-3 text-center`}>Statistics</Text>
      </View>
      <View style={tailwind`flex justify-center items-center gap-10`} >
        <View style={tailwind` flex flex-row rounded-full overflow-hidden justify-center m-4 bg-zinc-900 `}>
           <TouchableOpacity onPress={()=>handleCategory('today')}><View style={tailwind`p-4 px-8 rounded-full  ${CategoryName('today')}`}><Text style={tailwind`text-gray-400 `}>Today</Text></View></TouchableOpacity>
           <TouchableOpacity onPress={()=>handleCategory('weekly')}><View style={tailwind`p-4 px-8 rounded-full  ${CategoryName('weekly')}`}><Text style={tailwind`text-gray-400 `}>Weekly</Text></View></TouchableOpacity>
           <TouchableOpacity onPress={()=>handleCategory('monthly')}><View style={tailwind`p-4 px-8 rounded-full  ${CategoryName('monthly')}`}><Text style={tailwind`text-gray-400 `}>Monthly</Text></View></TouchableOpacity>
        </View>
        <View style={tailwind`flex justify-center items-center text-white`}>
        {active=='today'&& <View className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
      <Text style={tailwind`text-xl font-bold mb-4 text-slate-200`}>Financial Overview :- </Text>
      <View style={tailwind`w-full max-w-md`}>
        <PieChart
          data={data}
          showText={true}
          labelsPosition='outward'
          focusOnPress={true}
          donut={true}
          innerRadius={30}
          radius={160}
          textStyle={{ fontSize: 14, fontWeight: '500' }}
        />
      </View>
      <View style={tailwind`flex flex-col bg-gray-800 rounded shadow-sm p-4`}>
  <View style={tailwind`flex-row border-b border-gray-200 pb-2`}>
    {/* Table Header */}
    <Text style={tailwind`flex-1 text-sm font-bold text-gray-200`}>Color</Text>
    <Text style={tailwind`flex-1 text-sm font-bold text-gray-200`}>Text</Text>
    <Text style={tailwind`flex-1 text-sm font-bold text-gray-200 text-right`}>Value</Text>
  </View>
  {data.map((item, index) => (
    <View key={index} style={tailwind`flex-row items-center py-2 border-b border-gray-100`}>
      {/* Table Cells */}
      <View style={tailwind`flex-1 flex px-2`}>
        <View
          style={[
            tailwind`w-4 h-4 rounded-full`,
            { backgroundColor: item.color },
          ]}
        />
      </View>
      <Text style={tailwind`flex-1 text-sm text-gray-200`}>{item.text}</Text>
      <Text style={tailwind`flex-1 text-lg font-bold text-gray-200 text-right`}>{item.value}%</Text>
    </View>
  ))}
</View>

    </View>}
        {active=='weekly'&&<BarChart
           data={barChartData}
           barWidth={30}
           spacing={20}
           roundedTop
           hideRules
          // onPress={handleBarPress}
        />}
        {active=='monthly'&&<RadarChart data = {[50, 80, 90, 70]} />}
        </View>
{/* <BarChart data = {data}  /> */}
        </View>
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>
    </View>    
  )
}


const styles= StyleSheet.create({
  axisText:
  {fontSize: 10,
  color: '#333',}
})

export default Stats
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import Stats from './screens/Stats';
import Wallet from './screens/Wallet';
import Profile from './screens/Profile/Profile';
import  {ChartBarIcon, HomeIcon, WalletIcon,UserIcon} from "react-native-heroicons/solid";
import darkColorSchemes from '../../assets/colors';
import tailwind from 'twrnc';


const BottomNavigator = () => {
    const Stack=createBottomTabNavigator();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:darkColorSchemes.darkMode.background,position:'absolute',bottom:16,paddingInline:0,marginInline:'20%',borderRadius:26,height:60,width:'55%'}}}>
        <Stack.Screen  name="Home" component={Home}  options={{tabBarIcon:tabInfo=><HomeIcon style={tailwind`mt-4`} size={tabInfo.focused?30:20} color={tabInfo.focused?"#c7ea46":"gray"} />}} />
        <Stack.Screen  name="stats" component={Stats} options={{tabBarIcon:tabInfo=><ChartBarIcon style={tailwind`mt-4`} size={tabInfo.focused?30:20} color={tabInfo.focused?"#c7ea46":"gray"} />}} />
        <Stack.Screen  name="profile" component={Profile} options={{tabBarIcon:tabInfo=><UserIcon style={tailwind`mt-4`} size={tabInfo.focused?30:20} color={tabInfo.focused?"#c7ea46":"gray"} />}} />
    </Stack.Navigator>
  )
}

export default BottomNavigator
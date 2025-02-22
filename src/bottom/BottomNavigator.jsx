import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import Stats from './screens/Stats';
import Wallet from './screens/Wallet';
import Profile from './screens/Profile/Profile';
import  {ChartBarIcon, HomeIcon, WalletIcon,UserIcon} from "react-native-heroicons/solid";
import darkColorSchemes from '../../assets/colors';


const BottomNavigator = () => {
    const Stack=createBottomTabNavigator();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:darkColorSchemes.darkMode.background}}}>
        <Stack.Screen  name="Home" component={Home}  options={{tabBarIcon:tabInfo=><HomeIcon color={tabInfo.focused?"#c7ea46":"gray"} />}} />
        <Stack.Screen  name="stats" component={Stats} options={{tabBarIcon:tabInfo=><ChartBarIcon color={tabInfo.focused?"#c7ea46":"gray"} />}} />
        <Stack.Screen  name="wallet" component={Wallet} options={{tabBarIcon:tabInfo=><WalletIcon color={tabInfo.focused?"#c7ea46":"gray"} />}} />
        <Stack.Screen  name="profile" component={Profile} options={{tabBarIcon:tabInfo=><UserIcon color={tabInfo.focused?"#c7ea46":"gray"} />}} />
    </Stack.Navigator>
  )
}

export default BottomNavigator
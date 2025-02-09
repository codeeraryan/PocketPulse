//contains splash and bottomNavigation
import React from 'react'
import Spalsh from './bottom/Spalsh'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './bottom/BottomNavigator'
import Signup from './Authentication/Signup'
import Login from './Authentication/Login'
import Intro from './Authentication/Intro'
import Auth from './Authentication/Auth'

const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
   
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Splash' component={Spalsh} />
            <Stack.Screen name='Intro' component={Intro} />
            <Stack.Screen name='SignUp' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='tab' component={BottomNavigator} />
            <Stack.Screen name='Auth' component={Auth} />
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default AppNavigation
import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Profile = () => {
      const insets=useSafeAreaInsets();
  return (
    <View style={{top:insets.top,height:"100%",alignItems:"center",justifyContent:"center"}}>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile
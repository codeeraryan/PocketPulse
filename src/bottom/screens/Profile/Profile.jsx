import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import darkColorSchemes from '../../../../assets/colors';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { ChevronRight, GlobeLock, LogOut, SettingsIcon, UserPen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoading from 'expo-skeleton-loading'

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { image, Logout} = useContext(FirebaseContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout=()=>{
     Logout(navigation);
  }

  const getUserInfo = async () => {
    try {
      const userHai = await AsyncStorage.getItem("userCred");
      const result = await JSON.parse(userHai);
      setData(result); // Update the state with the resolved value
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false); // Set loading to false after data fetch attempt
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: darkColorSchemes.moodyBlack.background }}>
      <View style={tailwind`top:${insets.top} mt-10 mx-4 h-full gap-5`}>
        {loading ? (
          <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
          <View style={tailwind`items-center gap-4 opacity-25`}>
          <Text style={tailwind`text-white text-2xl font-semibold`}>Profile</Text>
          <View style={tailwind`h-50 w-50 rounded-full overflow-hidden`}>
            <Image
              style={tailwind`h-[100%] w-[100%]`}
              source={require("../../../../assets/images/defaultAvatar.png")}
            />
          </View>
          <View style={tailwind`items-center gap-2`}>
              <Text style={tailwind`text-white text-xl font-semibold`}>userName</Text>
              <Text style={tailwind`text-white font-semibold`}>userEmail</Text>
            </View>
            </View>
            </SkeletonLoading>
            ) :
         (
         
          <View style={tailwind`items-center gap-4`}>
            <Text style={tailwind`text-white text-2xl font-semibold`}>Profile</Text>
            <View style={tailwind`h-50 w-50 rounded-full overflow-hidden`}>
              <Image
                style={tailwind`h-[100%] w-[100%]`}
                source={image ? { uri: image } : require("../../../../assets/images/defaultAvatar.png")}
              />
            </View>
            {data && data.user ? (
               
              <View style={tailwind`items-center gap-2`}>
                <Text style={tailwind`text-white text-xl font-semibold`}>{data.user.displayName}</Text>
                <Text style={tailwind`text-white font-semibold`}>{data.user.email}</Text>
              </View>
              
            ) : (
              <Text style={tailwind`text-white`}>User data not available</Text>
            )}
          </View>
        )}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}
          >
            <View style={tailwind`flex-row gap-4 items-center`}>
              <View style={tailwind`p-2 rounded-xl bg-blue-400`}>
                <UserPen color={"white"} />
              </View>
              <View style={tailwind`gap-1`}>
                <Text style={tailwind`text-white font-semibold text-[4] `}>Edit Profile</Text>
              </View>
            </View>
            <View>
              <ChevronRight color={"white"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
            <View style={tailwind`flex-row gap-4 items-center`}>
              <View style={tailwind`p-2 rounded-xl bg-green-400`}>
                <SettingsIcon color={"white"} />
              </View>
              <View style={tailwind`gap-1`}>
                <Text style={tailwind`text-white font-semibold text-[4] `}>Settings</Text>
              </View>
            </View>
            <View>
              <ChevronRight color={"white"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
            <View style={tailwind`flex-row gap-4 items-center`}>
              <View style={tailwind`p-2 rounded-xl bg-gray-400`}>
                <GlobeLock color={"white"} />
              </View>
              <View style={tailwind`gap-1`}>
                <Text style={tailwind`text-white font-semibold text-[4] `}>Privacy Policy</Text>
              </View>
            </View>
            <View>
              <ChevronRight color={"white"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={tailwind`flex-row p-4 m-1 justify-between items-center bg-gray-200/5 rounded-2xl`}>
            <View style={tailwind`flex-row gap-4 items-center`}>
              <View style={tailwind`p-2 rounded-xl bg-red-400`}>
                <LogOut color={"white"} />
              </View>
              <View style={tailwind`gap-1`}>
                <Text style={tailwind`text-white font-semibold text-[4] `}>Logout</Text>
              </View>
            </View>
            <View>
              <ChevronRight color={"white"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

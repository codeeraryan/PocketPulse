import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tailwind from "twrnc";
import darkColorSchemes from "../../../../assets/colors";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { Pencil, Pen } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { image, setImage } = useContext(FirebaseContext);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true); // Set initial loading to true

  const getdata = async () => {
    try {
      const userHai = await AsyncStorage.getItem("userCred");
      if (!userHai) {
        console.warn("No user data found");
        return;
      }
      const result = JSON.parse(userHai);
      setData(result); // Update the state with fetched data
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoad(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: darkColorSchemes.moodyBlack.background }}>
      {load ? (
        <Text style={tailwind`text-white text-center mt-5`}>Loading...</Text>
      ) : (
        <View style={tailwind`top:${insets.top} mx-2 h-full gap-5`}>
          <View style={{ top: insets.top, marginBottom: 20 }}>
            <Text style={tailwind`text-white text-2xl font-semibold`}>Edit Profile</Text>
          </View>
          <View style={tailwind`items-center gap-4`}>
            <View style={tailwind`h-50 w-50`}>
              <TouchableOpacity
                style={tailwind`z-2 items-center justify-center absolute bottom-5 border-black border-[1px] right-2 p-4 bg-white rounded-full h-5 w-5`}
                onPress={pickImage}
              >
                <Pencil color={"black"} />
              </TouchableOpacity>
              <Image
                style={tailwind`h-[100%] w-[100%] rounded-full`}
                source={image ? { uri: image } : require("../../../../assets/images/defaultAvatar.png")}
              />
            </View>
            <View style={tailwind`items-center gap-2`}>
              <Text style={tailwind`text-white text-xl font-semibold`}>{data.user.displayName}</Text>
              <Text style={tailwind`text-white font-semibold`}>{data.user.email}</Text>
            </View>
          </View>

          <View>
            <View>
              <Text style={tailwind`text-white ml-2 text-xl font-semibold m-1`}>Name</Text>
              <View style={tailwind`p-2 border-2 border-white rounded-xl items-center justify-start gap-3 flex-row`}>
                <TextInput
                  placeholderTextColor={darkColorSchemes.darkMode.textSecondary}
                  style={tailwind`text-white w-[85%]`}
                  placeholder={data.user.displayName}
                />
                <TouchableOpacity style={tailwind`flex-row`}>
                  <Pen color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) }
    </View>
  );
};

export default EditProfile;



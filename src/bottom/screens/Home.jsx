import { View, Text, StatusBar,Image,TouchableOpacity,Modal,TextInput, ImageBackground,StyleSheet, ToastAndroid, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import darkColorSchemes from '../../../assets/colors'
import { FirebaseContext } from '../../context/FirebaseContext'
import {  ArrowDownCircle, ArrowUpCircle, DollarSign, Ellipsis, Heart, Search, Shirt,Plus, X, IndianRupee } from 'lucide-react-native'
import TransactionCard from '../../Components/TransactionCard'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../context/FirebaseContext'
import { useFonts } from 'expo-font'
const Home = ({navigation}) => {
  const insets=useSafeAreaInsets();
  const userDetail=useContext(FirebaseContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const [fontsLoaded] = useFonts({"Agu": require("../../../assets/fonts/agu.ttf")})
       
         if (!fontsLoaded) {
           return null
         }
   
  const [formData, setFormData] = useState({
    amount: "",
    current: "Expense",
    name: "",
    description: "",
    date: "",
  });


  const getTransaction = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "formData"));
      const transactionList = [];
      querySnapshot.forEach((doc) => {
        transactionList.push(doc.data());
      });
      setTransaction(transactionList);
    } catch (error) {
      console.error('Error fetching formdata:', error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "formData"), formData);
      ToastAndroid.show(`Transaction ${formData.name} added`, ToastAndroid.SHORT);
      setModalVisible(false);
      // Fetch updated list after adding new student
      getTransaction();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []); 

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <View style={{flex:1,backgroundColor:darkColorSchemes.moodyBlack.background }}>
    <View  style={tailwind`top:${insets.top} mt-15 h-full mx-6`}>
      <View>
       <View style={tailwind`flex-row items-center justify-between mx-2`}> 
      <View><Text style={tailwind`text-white `}>Hello, 👀</Text>
        <Text style={{color:'silver',fontWeight:'medium',fontSize:25,fontFamily:"Agu"}}>{userDetail.userInfo.user.displayName}</Text></View>
        <Search color={'white'}/>
      </View>
        <View style={tailwind`items-center justify-center mt-5  `}><ImageBackground resizeMode='stretch' style={tailwind`h-50 w-[100%] rounded-xl gap-5 `}  source={require("../../../assets/images/card.png")}>
        <View style={tailwind`mx-6 mt-4 flex-row justify-between items-center`}><View><Text style={tailwind` font-semibold`}>Total Balance</Text><Text style={tailwind`text-2xl font-semibold`}><IndianRupee size={20} color={'black'}/> 7</Text></View><Ellipsis color={"black"}/></View> 
        <View style={tailwind`flex-row justify-between mx-6`}>
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowDownCircle color={'black'}/><Text>Income</Text></View><Text style={tailwind`text-green-400 ml-2 font-semibold text-[4]`}><IndianRupee size={15} color={'#65f21d'}/> 53.00</Text></View> 
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowUpCircle color={'black'}/><Text>Expense</Text></View><Text style={tailwind`text-red-400 ml-2 font-semibold text-[4]`}><IndianRupee size={15} color={'#f99367'}/> 46.00</Text></View> 
        </View>
        </ImageBackground></View>
      </View>
      <View style={tailwind` gap-3 mt-10 `} >
        <View style={tailwind`gap-5 `}>
        <Text style={tailwind`text-white text-xl font-semibold  `}>Recent Transactions :</Text>
        </View>
        {/* transaction card */}

        {transaction[0]?transaction.map((value,index)=><TransactionCard key={index}  section={value.name} fee={value.description} Icon={Heart} feeType={value.current} amount={value.amount} day={value.date} />):   <ActivityIndicator style={tailwind`mt-20`} size="large" color="#c7ea46" />}
        </View>
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>

    <TouchableOpacity onPress={()=>setModalVisible(true)}  style={tailwind` absolute bottom-0 right-0 p-3 rounded-full m-4 bg-[#c7ea46]`}><Plus color="black"/></TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay} >
          <View style={styles.modalContent}>
            <View style={tailwind`flex-row gap-15 border-b-[1px] mb-3 border-white`}>
            <TouchableOpacity onPress={()=>setModalVisible(false)}><X color={'white'}/></TouchableOpacity>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            </View>
        
            <RadioButtonGroup
        containerStyle={{ marginBottom: 10 ,flexDirection:'row'}}
        selected={formData.current}
        onSelected={(value) => handleInputChange("current",value)}
        radioBackground="green"
      >
        <RadioButtonItem value="Income" label={
            <Text style={{ color: "white" , margin:10, }}>Income</Text>
          }/>
        <RadioButtonItem
          value="Expense"
          label={
            <Text style={{ color: "white" , margin:10, }}>Expense</Text>
          }
        />
      </RadioButtonGroup>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={formData.amount}
              onChangeText={(value) => handleInputChange("amount", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="name"
              placeholderTextColor="#888"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#888"
              placeholder="description"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              placeholderTextColor="#888"
              value={formData.date}
              onChangeText={(value) => handleInputChange("date", value)}
            />
           <TouchableOpacity style={tailwind`p-2 rounded-full bg-[#c7ea46] justify-center items-center `} onPress={handleAddTransaction}><Text style={tailwind`text-black text-xl font-semibold`}>Submit</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderColor:"gray",
    borderWidth:0.2,
    width: "90%",
    backgroundColor:darkColorSchemes.moodyBlack.background,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    color:"white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    color:'white',
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Home
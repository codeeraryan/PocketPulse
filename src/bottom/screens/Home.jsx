import { View, Text, StatusBar,TouchableOpacity,Modal,TextInput, ImageBackground,StyleSheet, ToastAndroid, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import { Image } from "expo-image";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import darkColorSchemes from '../../../assets/colors'
import SkeletonLoading from 'expo-skeleton-loading'
import { FirebaseContext } from '../../context/FirebaseContext'
import {  ArrowDownCircle, ArrowUpCircle, DollarSign, Ellipsis, Heart, Search, Shirt,Plus, X, IndianRupee } from 'lucide-react-native'
import TransactionCard from '../../Components/TransactionCard'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../context/FirebaseContext'
import { useFonts } from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useStat } from '../../context/StatProvider';

const Home = ({navigation}) => {
  const insets=useSafeAreaInsets();
  const userDetail=useContext(FirebaseContext);
  const {transactionStat,setTransactionStat,expenseStat,setExpenseStat,incomeStat,setIncomeStat}=useStat();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show,setShow] = useState(false);
  const [data,setData] = useState(null);
 
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
      // Only attempt to fetch transactions if data exists and has a user property
      if (data && data.user && data.user.uid) {
        const uid = data.user.uid;
        const querySnapshot = await getDocs(collection(db, "users", uid, "expenses"));
        const transactionList = [];
        querySnapshot.forEach((doc) => {
          transactionList.push({id: doc.id, ...doc.data()});
        });
        
        setTransaction(transactionList);
       
      } else {
        console.log('User data not yet available');
      }
    } catch (error) {
      console.error('Error fetching formdata:', error);
    }
  };
  
  // Also modify the useEffect to wait for data before calling getTransaction
  useEffect(() => {
    getUserInfo();
    // Only call getTransaction after data is loaded
  }, []);
  
  // Add another useEffect that depends on data changes
  useEffect(() => {
    if (data) {
      getTransaction();
    }
  }, [data]);

  useEffect(() => {
    let total=0;
    let income=0;
    let expense=0;
    transaction.forEach((value)=>{
      total=total+Number(value.amount);
      if(value.current=='Expense'){
        expense=expense+Number(value.amount);
      }
      if(value.current=='Income'){
        income=income+Number(value.amount);
      }
    })
    setTransactionStat(()=>total)
    setExpenseStat(()=>expense)
    setIncomeStat(()=>income)
 
    
  }, [transaction]);

  const getUserInfo=async()=>{
   try { const userHai= await AsyncStorage.getItem("userCred");
   const  result=await JSON.parse(userHai);
   setData(result); // Update the state with the resolved value
 
 }
   catch(err){
    console.log(err)
   }
   finally{
    setLoading(false);
   }
   
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"users",data.user.uid, "expenses"), formData);
      ToastAndroid.show(`Transaction ${formData.name} added`, ToastAndroid.SHORT);
      setModalVisible(false);
      // Fetch updated list after adding new student
      getTransaction();
    } catch (e) {
      console.error("Error adding document: ", e);
    }finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

 


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
{loading?<Text style={tailwind`text-white`}>fetching...</Text>:<Text style={{color:'silver',fontWeight:'medium',fontSize:25,fontFamily:"Agu"}}>{data.user.displayName}</Text>}</View>
        <Search color={'white'}/>
      </View>
        <View style={tailwind`items-center justify-center mt-5  `}><ImageBackground resizeMode='stretch' style={tailwind`h-50 w-[100%] rounded-xl gap-5 `}  source={require("../../../assets/images/card.png")}>
        <View style={tailwind`mx-6 mt-4 flex-row justify-between items-center`}><View><Text style={tailwind` font-semibold`}>Total transaction</Text><Text style={tailwind`text-2xl font-semibold`}><IndianRupee size={20} color={'black'}/>{transactionStat}</Text></View><Ellipsis color={"black"}/></View> 
        <View style={tailwind`flex-row justify-between mx-6`}>
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowDownCircle color={'black'}/><Text>Income: </Text></View><Text style={tailwind`text-green-400 ml-2 font-semibold text-[4]`}><IndianRupee size={15} color={'#65f21d'}/>{incomeStat}</Text></View> 
         <View style={tailwind`gap-1`}><View style={tailwind`flex-row gap-1 items-center`}><ArrowUpCircle color={'black'}/><Text>Expense: </Text></View><Text style={tailwind`text-red-400 ml-2 font-semibold text-[4]`}><IndianRupee size={15} color={'#f99367'}/>{expenseStat}</Text></View> 
        </View>
        </ImageBackground></View>
      </View>
      <View style={tailwind` gap-3 mt-8 `} >
        <View style={tailwind`gap-5 `}>
        <Text style={tailwind`text-white text-xl font-semibold  `}>Recent Transactions :</Text>
        </View>
        {/* transaction card */}
{/* transaction card */}
{transaction.length > 0 ? 
  transaction.map((value, index) => (
    <TransactionCard 
      key={index} 
      getTransaction={getTransaction} 
      section={value.name} 
      fee={value.description} 
      Icon={Heart} 
      id={value.id} 
      uid={data.user.uid}
      feeType={value.current} 
      amount={value.amount} 
      day={value.date} 
    />
  )) : 
  loading ? 
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
      <View style={tailwind`gap-5`}>
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
      </View>
    </SkeletonLoading> :
    <View style={tailwind`flex mt-10 items-center justify-center`}>
      <Image  style={tailwind`h-50 w-50  rounded-xl gap-5 `}  source={require("../../../assets/images/noTransaction.png")} />
      <Text style={tailwind`text-gray-500 text-lg text-center py-5`}>No transactions</Text>
    </View>
}</View>
      <StatusBar barStyle={'light-content'} hidden={false}  />
    </View>

    <TouchableOpacity onPress={()=>setModalVisible(true)}  style={tailwind` absolute bottom-20 right-0 p-3 rounded-full m-4 bg-[#c7ea46]`}><Plus color="black"/></TouchableOpacity>
    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      {/* Header */}
      <View style={tailwind`flex-row items-center justify-between border-b-[1px] mb-5 pb-3 border-white`}>
        <TouchableOpacity 
          onPress={() => setModalVisible(false)}
          style={tailwind`p-2`}
        >
          <X color={'white'} size={22} />
        </TouchableOpacity>
        <Text style={[styles.modalTitle, tailwind`m-0`]}>Add Transaction</Text>
        <View style={tailwind`w-8`} />
      </View>
      
      {/* Transaction Type Selection */}
      <View style={tailwind`mb-4`}>
        <Text style={tailwind`text-white text-base mb-2`}>Transaction Type</Text>
        <RadioButtonGroup
          containerStyle={tailwind`flex-row justify-center gap-8`}
          selected={formData.current}
          onSelected={(value) => handleInputChange("current", value)}
          radioBackground="#c7ea46"
        >
          <RadioButtonItem 
            value="Income" 
            label={
              <Text style={tailwind`text-white text-base ml-2`}>Income</Text>
            }
          />
          <RadioButtonItem
            value="Expense"
            label={
              <Text style={tailwind`text-white text-base ml-2`}>Expense</Text>
            }
          />
        </RadioButtonGroup>
      </View>

      {/* Form Fields */}
      <View style={tailwind`gap-3`}>
        <View>
          <Text style={tailwind`text-white text-base mb-1 ml-1`}>Amount</Text>
          <TextInput
            style={[styles.input, formData.current === "Income" ? tailwind`border-green-400` : tailwind`border-red-400`]}
            placeholder="Enter amount"
            keyboardType="numeric"
            placeholderTextColor="#888"
            value={formData.amount}
            onChangeText={(value) => handleInputChange("amount", value)}
          />
        </View>

        <View>
          <Text style={tailwind`text-white text-base mb-1 ml-1`}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Transaction name"
            placeholderTextColor="#888"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        <View>
          <Text style={tailwind`text-white text-base mb-1 ml-1`}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            placeholderTextColor="#888"
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
          />
        </View>

        <View>
          <Text style={tailwind`text-white text-base mb-1 ml-1`}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#888"
            value={formData.date}
            onChangeText={(value) => handleInputChange("date", value)}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={tailwind`p-3 mt-6 rounded-full bg-[#c7ea46] justify-center items-center`} 
        onPress={handleAddTransaction}
      >
        <Text style={tailwind`text-black text-lg font-bold`}>
          Add Transaction
        </Text>
      </TouchableOpacity>
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
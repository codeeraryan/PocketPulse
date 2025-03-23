import { View, Text, TouchableOpacity, Modal, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import {  HandCoins, IndianRupee, LucideDelete, Trash, Wallet, X  } from 'lucide-react-native';
import { doc,deleteDoc } from 'firebase/firestore';
import { db } from '../context/FirebaseContext';

const TransactionCard = ({ section, fee, feeType, day, amount ,id,getTransaction,uid }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

 const handleDeleteExpense =async(expenseId)=>{
  try{
    await deleteDoc(doc(db,"users",uid, "expenses",expenseId));
    ToastAndroid.show('Transaction Deleted', ToastAndroid.SHORT);
    getTransaction();
    setIsModalVisible(false)

  }
  catch(err){
    console.log(err.message);    
  }

 }
  return (
    <>
      {/* Transaction Card */}
      <TouchableOpacity
        style={tailwind`flex-row p-2 justify-between items-center bg-gray-200/5 rounded-2xl`}
        onPress={() => setIsModalVisible(true)}
      >
        {/* Left Section */}
        <View style={tailwind`flex-row gap-4 items-center`}>
          <View>
            {feeType === 'Expense' ? (
              <View style={tailwind`p-2 rounded-xl bg-white items-center`}><HandCoins color={'#f96767'} /></View>
            ) : (
              <View style={tailwind`p-2 rounded-xl bg-white items-center`}><Wallet color={'#65f21d'} /></View>
            )}
          </View>

          <View style={tailwind`gap-1 overflow-hidden`}>
            <Text
              style={tailwind`text-white font-semibold text-[4] ${feeType === 'Expense' ? 'text-red-400' : 'text-green-400'} w-50`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {section}
            </Text>
            <Text
              style={tailwind`text-white flex-wrap w-50 overflow-hidden`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {fee}
            </Text>
          </View>
        </View>

        {/* Right Section */}
        <View style={tailwind`gap-1 items-end w-20 pr-2`}>
          <Text
            style={tailwind`text-white font-semibold text-[5] items-center justify-center ${
              feeType === 'Expense' ? 'text-red-400' : 'text-green-400'
            }`}
          >
            <IndianRupee
              size={15}
              color={feeType === 'Expense' ? '#f96767' : '#65f21d'}
            />
            {amount}
          </Text>
          <Text style={tailwind`text-white text-[3]`}>{day}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Transaction Details */}
      <Modal
  visible={isModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={[styles.modalContent, tailwind`rounded-2xl shadow-lg`]}>
      {/* Header with title and actions */}
      <View style={tailwind`flex-row justify-between items-center mb-6 pb-3 border-b border-gray-700`}>
        <TouchableOpacity
          style={tailwind`p-2 rounded-full bg-gray-800`}
          onPress={() => setIsModalVisible(false)}
        >
          <X color="white" size={20} />
        </TouchableOpacity>
        
        <Text style={[styles.title, tailwind`text-xl font-bold text-white`]}>
          Transaction Details
        </Text>
        
        <TouchableOpacity 
          style={tailwind`p-2 rounded-full bg-red-900 bg-opacity-30`} 
          onPress={() => handleDeleteExpense(id)}
        >
          <Trash color="red" size={20} />
        </TouchableOpacity>
      </View>

      {/* Transaction Type Badge */}
      <View style={tailwind`mb-5 self-start`}>
        <View 
          style={[
            tailwind`px-4 py-2 rounded-full`, 
            feeType === 'Expense' 
              ? tailwind`bg-red-900 bg-opacity-20` 
              : tailwind`bg-green-900 bg-opacity-20`
          ]}
        >
          <Text 
            style={[
              tailwind`font-semibold`, 
              { color: feeType === 'Expense' ? '#f96767' : '#65f21d' }
            ]}
          >
            {feeType}
          </Text>
        </View>
      </View>

      {/* Transaction Details */}
      <View style={tailwind`bg-gray-800 bg-opacity-80 rounded-xl p-4 mb-4`}>
        <View style={[styles.detailRow, tailwind`mb-3`]}>
          <Text style={[styles.label, tailwind`text-gray-400`]}>Amount:</Text>
          <Text style={[styles.value, tailwind`text-lg font-bold text-white flex-row items-center`]}>
            <IndianRupee size={16} color="#c7ea46" /> {amount}
          </Text>
        </View>

        <View style={[styles.detailRow, tailwind`mb-3`]}>
          <Text style={[styles.label, tailwind`text-gray-400`]}>Section:</Text>
          <Text style={[styles.value, tailwind`text-white font-medium`]}>{section}</Text>
        </View>

        <View style={[styles.detailRow, tailwind`mb-3`]}>
          <Text style={[styles.label, tailwind`text-gray-400`]}>Date:</Text>
          <Text style={[styles.value, tailwind`text-white`]}>{day}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={tailwind`mb-3`}>
        <Text style={[styles.label, tailwind`text-gray-400 mb-1`]}>Description:</Text>
        <View style={tailwind`bg-gray-800 bg-opacity-70 p-4 rounded-xl`}>
          <Text style={[styles.value, tailwind`text-white`]} numberOfLines={5}>
            {fee}
          </Text>
        </View>
      </View>
    </View>
  </View>
</Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slight transparency for the modal background
  },
  modalContent: {
    backgroundColor: 'rgba(32, 32, 32, 0.9)', // Same as the transaction card background
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth:1.5,
    borderColor:'gray',
    borderStyle:'dashed',
    color: 'silver', // Highlighted color for the title
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  gapAfterFee: {
    marginBottom: 10, // Adds gap after the "Fee" row for clarity
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c7ea46',
    marginRight:8,
  },
  value: {
    fontSize: 16,
    width:200,
    fontWeight: '500',
    color: '#fff',
    flexWrap:'wrap',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#c7ea46',
    padding: 10,
    borderRadius: 5,
    width: '50%',
  },
  closeButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TransactionCard;

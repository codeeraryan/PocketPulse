import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { HandCoins, IndianRupee, Wallet, X } from 'lucide-react-native';

const TransactionCard = ({ section, fee, feeType, day, amount }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              <Wallet color={'#65f21d'} />
            )}
          </View>

          <View style={tailwind`gap-1 overflow-hidden`}>
            <Text
              style={tailwind`text-white font-semibold text-[4] text-[#c7ea46] w-50`}
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
          <View style={styles.modalContent}>
            {/* Title */}
            <TouchableOpacity
           
              onPress={() => setIsModalVisible(false)}
            >
            <View style={tailwind`flex-row  gap-10 items-center mb-5 `}><X color={'white'}/>
            <Text style={styles.title}>Transaction Details :</Text></View>
            </TouchableOpacity>
            {/* Details */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Section:</Text>
              <Text style={styles.value}>{section}</Text>
            </View>
            <View style={[styles.detailRow, styles.gapAfterFee]}>
              <Text style={styles.label}>Fee:</Text>
              <Text style={styles.value} numberOfLines={5}>{fee}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Type:</Text>
              <Text
                style={[
                  styles.value,
                  { color: feeType === 'Expense' ? '#f96767' : '#65f21d' },
                ]}
              >
                {feeType}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Day:</Text>
              <Text style={styles.value}>{day}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Amount:</Text>
              <Text style={styles.value}>
                <IndianRupee size={14} color="#c7ea46" /> {amount}
              </Text>
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

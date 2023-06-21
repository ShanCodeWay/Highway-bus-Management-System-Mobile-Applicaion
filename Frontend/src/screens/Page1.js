import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Page1 = ({ navigation }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const handleDestinationChange = (itemValue) => {
    setSelectedDestination(itemValue);
  };

  const handleStartTimeChange = (itemValue) => {
    setSelectedStartTime(itemValue);
  };

  const handleEndTimeChange = (itemValue) => {
    setSelectedEndTime(itemValue);
  };

  const handleSearch = () => {
    if (!selectedDestination || !selectedStartTime || !selectedEndTime) {
      alert('Please select destination, start time, and end time.');
      return;
    }

   
    navigation.navigate('Page2', {
      selectedDestination,
      selectedStartTime,
      selectedEndTime,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SELECT ROUTE</Text>

      <Text style={styles.label}>Select Destination:</Text>
      <Picker
        selectedValue={selectedDestination}
        onValueChange={handleDestinationChange}
        style={styles.picker}
      >
        <Picker.Item label="Destination" value="" />
        <Picker.Item label="Moratuwa-Kadawatha" value="Moratuwa-Kadawatha" />
        <Picker.Item label="Kadawatha-Moratuwa" value="Kadawatha-Moratuwa" />
      </Picker>

      <Text style={styles.label}>Select Start Time:</Text>
      <Picker
        selectedValue={selectedStartTime}
        onValueChange={handleStartTimeChange}
        style={styles.picker}
      >
        <Picker.Item label="Start time" value="" />
        <Picker.Item label="06:00 AM" value="06:00 AM" />
        <Picker.Item label="07:00 AM" value="07:00 AM" />
        <Picker.Item label="08:00 AM" value="08:00 AM" />
        <Picker.Item label="09:00 AM" value="09:00 AM" />
        <Picker.Item label="10:00 AM" value="10:00 AM" />
        <Picker.Item label="11:00 AM" value="11:00 AM" />
        <Picker.Item label="12:00 AM" value="12:00 AM" />
        <Picker.Item label="01:00 AM" value="01:00 AM" />
      </Picker>

      <Text style={styles.label}>Select End Time:</Text>
      <Picker
        selectedValue={selectedEndTime}
        onValueChange={handleEndTimeChange}
        style={styles.picker}
      >
        <Picker.Item label="End time" value="" />
        <Picker.Item label="06:00 AM" value="06:00 AM" />
        <Picker.Item label="07:00 AM" value="07:00 AM" />
        <Picker.Item label="08:00 AM" value="08:00 AM" />
        <Picker.Item label="09:00 AM" value="09:00 AM" />
        <Picker.Item label="10:00 AM" value="10:00 AM" />
        <Picker.Item label="11:00 AM" value="11:00 AM" />
        <Picker.Item label="12:00 PM" value="12:00 PM" />
        <Picker.Item label="01:00 PM" value="01:00 PM" />
        <Picker.Item label="02:00 PM" value="02:00 PM" />
        <Picker.Item label="03:00 PM" value="03:00 PM" />
        <Picker.Item label="04:00 PM" value="04:00 PM" />
        <Picker.Item label="05:00 PM" value="05:00 PM" />
        <Picker.Item label="06:00 PM" value="06:00 PM" />
        <Picker.Item label="07:00 PM" value="07:00 PM" />
        <Picker.Item label="08:00 PM" value="08:00 PM" />
      </Picker>

      <View style={{ height: 20 }} />

      <Button title="Search" onPress={handleSearch} color="#191970" />

      {/* You can add additional UI elements or components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: '#03254c',
    height: 150,
    width: 300,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#187bcd',
  },
  picker: {
    height: 50,
    width: 350,
    marginTop: 20,
    backgroundColor: '#c0c0c0',
  },
});

export default Page1;


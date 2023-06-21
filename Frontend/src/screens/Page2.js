import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import axios from 'axios';


const Page2 = ({ navigation }) => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:1337/api/bus-schedules')
      .then(response => {
        setBuses(response.data.data);
        console.log('Fetched bus schedules:', response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch bus schedules:', error);
        alert('Failed to fetch bus schedules. Please try again.');
      });
  }, []);

  const formData = {
    busnum: '123',
    route: 'Route A',
    stime: '10:00 AM',
    etime: '12:00 PM',
    price: 10.5,
    delays: false,
  };
  
  fetch('/api/bus-schedules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
      // Handle the response data as needed
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occurred during the request
    });
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {buses.map(bus => (
          <View key={bus._id}>
            <Text>Bus Number: {bus.busnum}</Text>
            <Text>Route: {bus.route}</Text>
            <Text>Start Time: {bus.stime}</Text>
            <Text>End Time: {bus.etime}</Text>
            <Text>Price: {bus.price}</Text>
            <Text>Delays: {bus.delays}</Text>
            <Image
              source={require('../../assets/bus.png')}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() => navigation.replace('Page3')}
              style={styles.bookButton}
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bus: {
    backgroundColor: '#c0c0c0',
    padding: 50,
    borderRadius: 20,
    marginBottom: 2,
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  busInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#000080',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    color: '#000080',
    fontWeight: 'bold',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  busNumber: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  stime: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 20,
    height: 20,
    bottom: 90,
    right: 30,
  },
  delay: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'red',
  },
  day: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default Page2;


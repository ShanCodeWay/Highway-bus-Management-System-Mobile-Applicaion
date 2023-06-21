import React from 'react';
import { View, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
    <View style={{ height: 20 }} />
      <Button
        title="Select Bus Routes"
        onPress={() => navigation.navigate('Page1')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Bus Shedule"
        onPress={() => navigation.navigate('Page2')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Ticket Reservation"
        onPress={() => navigation.navigate('Page3')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Loging"
        onPress={() => navigation.navigate('Page4')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Page5')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Select Reservation"
        onPress={() => navigation.navigate('Page6')}
      />   
    </View>    
  );
};
export default Home;

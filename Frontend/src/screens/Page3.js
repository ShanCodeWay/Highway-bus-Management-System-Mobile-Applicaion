import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Btn from './Button';
const Page3 = (props) => {
  return (
    
      <View style={{ marginHorizontal: 30, marginVertical: 60 }}>
      <Text style={styles.headerText}>Let's start Reservations</Text>
      <Image source={require('../../assets/SignIn.png')} style={styles.image} />
        {/* Line break */}
        <View style={{ height: 40 }} />
      
      <Btn bgColor='#000080'textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Page4")} />
      <Btn bgColor='#000080' textColor='white' btnLabel="Signup" Press={() => props.navigation.navigate("Page5")} />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  headerText:{
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '500',
    color: '#000080',
    height: 150,
    width: 300,
    fontWeight: 'bold',
  },
  image: {
    width: 350,
    height: 150,
    resizeMode: 'contain',
    textAlign:'center'
  },
  
});

export default Page3;
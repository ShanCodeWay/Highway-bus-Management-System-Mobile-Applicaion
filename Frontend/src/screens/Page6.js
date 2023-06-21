import React from 'react';
import {View, StyleSheet, Text,Image} from 'react-native';
import Btn from './Button';


const Page6 = (props) => {
  return (
    <Background>
    
    
      <View style={{ marginHorizontal: 28, marginVertical: 70 }}>
      <Text style={{ color: '#000080', fontSize: 40,marginHorizontal: 20 ,textAlign: 'center'}}>SELECT TYPE  </Text>

      {/* Line break */}
      <View style={{ height: 50 }} /> 
      <Btn bgColor={'#000080'} textColor='white' btnLabel="Seats Reservations"  />
       <View style={{ height: 30 }} />
      <Btn bgColor={'#000080'} textColor='white' btnLabel="Luggage Reservations" />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  imageStyles: {
    width: 100,
    height: 100,
    bottom: 1, 
    right: 5,
    
  },
})


export default Page6;
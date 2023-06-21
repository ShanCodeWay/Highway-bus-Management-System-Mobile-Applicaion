import React from 'react';
import {TextInput} from 'react-native';


const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, 
      color: '#187bcd', 
      paddingHorizontal: 40, 
      width: '78%', 
      backgroundColor: 'rgb(220,220, 220)', 
      marginVertical: 10}}
      placeholderTextColor='#187bcd'></TextInput>
  );
};

export default Field;
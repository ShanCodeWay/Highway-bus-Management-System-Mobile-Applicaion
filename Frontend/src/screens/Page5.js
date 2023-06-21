import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    if (name === '' || nic === '' || contactNumber === '' || email === '' || password === '') {
      alert('All fields are required');
      return;
    }

    if (!/^([0-9]{1,10}|[A-Za-z]{1})$/.test(nic)) {
      alert('NIC should contain either numbers or a single letter and have a maximum length of 10');
      return;
    }

    if (!/^\d{1,11}$/.test(contactNumber)) {
      alert('Contact number should contain only numbers and have a maximum length of 11');
      return;
    }

    if (!validatePassword(password)) {
      alert(
        'Password should contain at least 8 characters, including numbers, symbols, uppercase and lowercase letters'
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/signin', {
        name,
        nic,
        contactNumber,
        email,
        password,
      });

      console.log(response.data);
      alert('Sign In Successful');

      // navigation logic here
      navigation.replace('Page6');
    } catch (error) {
      console.error(error);
      alert('Sign In Failed');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const toggleShowPassword = () => {
    setIsPasswordVisible((prevValue) => !prevValue);
  };

  const handleNameChange = (text) => {
    const formattedName = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setName(formattedName);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.signupText}>SIGN UP</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/bus.png')} style={styles.imageStyles} />
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>NAME</Text>
          <TextInput
            style={styles.signupInput}
            value={name}
            onChangeText={handleNameChange}
            autoCompleteType="name"
          />
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>NIC</Text>
          <TextInput
            style={styles.signupInput}
            value={nic}
            onChangeText={(text) => setNic(text)}
            maxLength={10}
          />
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>CONTACT NUMBER</Text>
          <TextInput
            style={styles.signupInput}
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              autoCompleteType="password"
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={styles.passwordToggle}>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, textAlign: 'center' }}>
          Already Joined?{' '}
          <Text
            style={{ color: 'darkred', fontWeight: 'bold' }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign In
          </Text>
        </Text>
        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 40,
    textAlign: 'center',
    height: 68,
    marginBottom: 10,
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 15,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: '#000080',
    height: 35,
    marginBottom: 10,
    justifyContent: 'center',
    marginHorizontal: 58,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 100,
    height: 100,
    marginVertical: 0,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1,
    height: 15,
  },
  passwordToggle: {
    color: '#000080',
    marginLeft: 10,
  },
});

export default SignIn;


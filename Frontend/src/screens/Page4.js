import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Sign In Successful
        navigation.replace('Page6');
      } else {
        alert(data.message); // Invalid email or password
      }
    } catch (error) {
      console.error(error);
      alert('Sign In Failed');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 70 }}>
        <Text style={styles.signupText}>SIGN IN</Text>

        <View style={styles.imageContainer}>
          <Image source={require('../../assets/SignIn.png')} style={styles.imageStyles} />
        </View>

        <View style={{ height: 5 }} />

        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>

        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
          <TextInput
            style={styles.signupInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCompleteType="password"
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, textAlign: 'center' }}>
          Not yet registered?{' '}
          <Text
            style={{ color: 'darkred', fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Page6')}
          >
            Sign Up
          </Text>
        </Text>

        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    background: '#F0F0F0',
  },
  signupText: {
    fontSize: 40,
    textAlign: 'center',
    height: 68,
    marginBottom: 10,
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: '#000080',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
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
    marginVertical: 5,
  },
});

export default SignIn;


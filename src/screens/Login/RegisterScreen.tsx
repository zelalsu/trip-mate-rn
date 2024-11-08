import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Register function
  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  // Sign out function
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('User signed out!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!user) {
    return (
      <View style={{padding: 20, flex: 1}}>
        <Text>Register</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{borderWidth: 1, padding: 10, marginVertical: 10}}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{borderWidth: 1, padding: 10, marginVertical: 10}}
        />
        <Button title="Register" onPress={register} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>Welcome, {user.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default RegisterScreen;

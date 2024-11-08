import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('12345678');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User logged in!');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('No user found with this email!');
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Incorrect password!');
        }

        console.error(error);
      });
  };

  // Sign out function

  return (
    <View style={{padding: 20, flex: 1}}>
      <Text>Login</Text>
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
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text>REgiste</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default LoginScreen;

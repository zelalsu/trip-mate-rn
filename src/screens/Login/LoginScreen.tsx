import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from '@constants/colors';
import CustomInput from '@components/Input/CustomInput';
import CustomButton from '@components/Button/CustomButton';
import SocialLoginButton from '@components/Button/SocialLoginButton';
import Car from '@assets/svg/car.svg';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('');

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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subText}>
              Complete your details to log into your account
            </Text>
            <Car />
            <View style={styles.inputContainer}>
              <CustomInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              <CustomInput
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <SocialLoginButton />
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.registerLink}>Are you new here?</Text>
            </TouchableOpacity>

            <CustomButton onPress={login} label={'LOG IN'} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.darkBlue,
    fontSize: 35,
    fontWeight: 'bold',
  },
  subText: {
    color: Colors.lightGray,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 50,
  },
  registerLink: {
    marginTop: 10,

    color: Colors.darkBlue,
  },
});

export default LoginScreen;

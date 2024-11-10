import React, {useState} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '@components/Input/CustomInput';
import CustomButton from '@components/Button/CustomButton';
import {Colors} from '@constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {formatDate, enforceDateFormat, validateDate} from '@utils/DateUtils'; // Importing utility functions
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [manualDate, setManualDate] = useState(''); // Store manually entered date
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthDate;
    setShowPicker(Platform.OS === 'ios' ? true : false);
    setBirthDate(currentDate);
    setManualDate(formatDate(currentDate)); // Update manual date when picker value changes
  };

  const handleManualDateChange = (text: string) => {
    setManualDate(enforceDateFormat(text)); // Format the manual date input
  };

  // Register function
  const register = () => {
    if (!validateDate(manualDate)) {
      Alert.alert(
        'Invalid date format',
        'Please enter the date in DD-MM-YYYY format.',
      );
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        // Store additional user data in Firestore
        firestore()
          .collection('users') // 'users' collection
          .doc(user.uid) // Use the UID of the authenticated user
          .set({
            name: name, // Assuming 'name' is stored somewhere in your state
            phoneNumber: phoneNumber, // Assuming phone number is stored in state
            email: email,
            birthDate: firestore.Timestamp.fromDate(birthDate), // Veya formatlanmış tarih
          })
          .then(() => {
            Alert.alert('User account created & signed in!');
          })
          .catch(error => {
            console.error('Error saving user data: ', error);
          });
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
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>Welcome onboard!</Text>
            <Text style={styles.subText}>
              Please fill in your details to create a new account.
            </Text>
            <CustomInput
              label="Name-Surname"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <CustomInput
              label="Phone Number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
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

            <CustomInput
              label="Birth Date"
              placeholder="DD-MM-YYYY"
              value={manualDate}
              onChangeText={handleManualDateChange}
            />

            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={styles.button}>
              <Text style={styles.text}>Select Birth Date</Text>
            </TouchableOpacity>

            {showPicker && (
              <RNDateTimePicker
                testID="dateTimePicker"
                value={birthDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <CustomButton onPress={register} label={'SIGN UP'} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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

  button: {
    alignSelf: 'flex-end', // This aligns the TouchableOpacity to the right
  },
  text: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.darkBlue,
    textAlign: 'right', // This aligns the text to the right inside the TouchableOpacity
  },
});

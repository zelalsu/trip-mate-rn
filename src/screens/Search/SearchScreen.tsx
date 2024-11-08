import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const SearchScreen = () => {
  const user = auth().currentUser;

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

  //

  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default SearchScreen;

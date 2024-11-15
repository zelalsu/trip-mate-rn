// components/CustomBackButton.js
import React from 'react';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '@constants/colors';

const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <IconM
      name="arrow-back-ios-new"
      size={24}
      style={{
        borderWidth: 1,
        width: 35,
        height: 35,
        padding: 4,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: Colors.lightGray,
      }}
      color={Colors.mediumPurple} // graniteBlack rengini kullanabilirsin
      onPress={() => navigation.goBack()}
    />
  );
};

export default CustomBackButton;

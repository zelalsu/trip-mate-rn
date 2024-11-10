// components/CustomTextInput.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInput from 'react-native-text-input-interactive';
import {Colors} from '@constants/colors';

interface CustomInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: CustomInputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        mainColor={Colors.darkBlue}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        originalColor={Colors.lightGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: Colors.graniteBlack,
    fontSize: 14,
    marginBottom: 5,
  },
});

export default CustomInput;

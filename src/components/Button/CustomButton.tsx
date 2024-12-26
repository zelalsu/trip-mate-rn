import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import {Colors} from '@constants/colors';

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void; // Event tipini belirttik
  style?: ViewStyle | TextStyle; // style opsiyonel, ve ViewStyle/TextStyle'ı kabul eder
}

const CustomButton = ({label, onPress, style}: CustomButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, style]}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.lightGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

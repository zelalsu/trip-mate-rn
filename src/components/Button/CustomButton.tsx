import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '@constants/colors';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}

const CustomButton = ({label, onPress}: CustomButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
  },
  buttonContainer: {
    width: Dimensions.get('window').width - 30,
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

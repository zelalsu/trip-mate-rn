import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import TextInput from 'react-native-text-input-interactive'; // from your package
import {Colors} from '@constants/colors';

interface CustomInputProps {
  label?: string;
  value: string | number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: any;
  onFocus?: () => void; // Modal açma veya diğer işlemler için kullanılacak
  editable?: boolean; // Varsayılan olarak true olacak
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onFocus,
  icon,
  editable = true, // Varsayılan olarak true
}: CustomInputProps) => {
  const handleIconPress = () => {
    if (onFocus) {
      onFocus(); // İkona basıldığında modal açma gibi işlevler tetiklenir
    }
  };

  const handleTouchablePress = () => {
    if (!editable && onFocus) {
      onFocus(); // Yazı alanı düzenlenemiyorsa tıklama davranışı devreye girer
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTouchablePress} // Sadece alan tıklamalarını işler
      style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        iconImageSource={icon}
        enableIcon
        placeholder={placeholder}
        value={String(value)}
        editable={editable} // editable prop'u kontrol ediliyor
        textInputStyle={{width: '100%'}}
        mainColor={Colors.darkBlue}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        originalColor={Colors.lightGray}
        onIconPress={handleIconPress} // Sadece ikon tıklamalarını işler
        onFocus={editable ? onFocus : undefined} // editable true ise onFocus çalışır
      />
    </TouchableOpacity>
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

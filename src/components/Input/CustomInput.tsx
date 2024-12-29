import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import TextInput from 'react-native-text-input-interactive'; // from your package
import {Colors} from '@constants/colors';
import window from '@constants/dimension';

interface CustomInputProps {
  label?: string;
  value: string | number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: any;
  onFocus?: () => void; // Modal açma veya diğer işlemler için kullanılacak
  editable?: boolean; // Varsayılan olarak true olacak
  row?: boolean;
  style?: any;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onFocus,
  icon,
  row,
  style,
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
      style={[
        styles.container,
        {
          flex: row ? 1 : undefined,
          paddingVertical: row ? 10 : 0,
        },
      ]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        iconImageSource={icon}
        enableIcon
        placeholder={placeholder}
        value={String(value)}
        editable={editable} // editable prop'u kontrol ediliyor
        textInputStyle={[
          style,
          {
            fontWeight: '500',
            height: 65,
            width: row ? window.width / 2.6 : '100%',
            borderColor: row ? 'transparent' : Colors.darkBlue,
            backgroundColor: row ? 'transparent' : undefined,
            borderRightWidth: 4,
            // borderWidth: 0.8,
          },
        ]}
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
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    color: Colors.mediumGray,
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default CustomInput;

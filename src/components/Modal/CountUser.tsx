import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '@components/Button/CustomButton';

interface CountUserProps {
  value: number; // Kullanıcı veya koltuk sayısı
  onChange: (newValue: number) => void; // Değer değişimi için callback
  title: string; // Dinamik başlık
  minValue?: number; // Minimum değer (varsayılan 1)
  maxValue?: number; // Maksimum değer (opsiyonel)
}

const CountUser: React.FC<CountUserProps> = ({
  value,
  onChange,
  title,
  minValue = 1, // Varsayılan minimum değer
  maxValue, // Maksimum değer (opsiyonel)
}) => {
  const handlePress = (type: 'decrease' | 'increase') => {
    if (type === 'decrease' && value > minValue) {
      onChange(value - 1);
    } else if (
      type === 'increase' &&
      (maxValue === undefined || value < maxValue)
    ) {
      onChange(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          label="-"
          onPress={() => handlePress('decrease')}
        />
        <Text style={styles.text}>{value}</Text>
        <CustomButton
          style={styles.button}
          label="+"
          onPress={() => handlePress('increase')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    width: 50,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CountUser;

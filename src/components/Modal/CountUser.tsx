import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '@components/Button/CustomButton';

const CountUser = ({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handlePress = (type: 'decrease' | 'increase') => {
    if (type === 'decrease' && value > 1) {
      setValue(value - 1);
    } else if (type === 'increase') {
      setValue(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reverze etmek istediğin koltuk sayısı</Text>
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
    justifyContent: 'center', // Konteyneri dikeyde ortalamak için
    alignItems: 'center', // Konteyneri yatayda ortalamak için
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Başlık metnini ortalamak için
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center', // Düğmelerin ortalanmasını sağlamak için
  },
  button: {
    marginHorizontal: 20,
    width: 50, // Sabit genişlik
  },
  text: {
    fontSize: 24,
    textAlign: 'center', // Metni yatayda ortalamak için
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CountUser;

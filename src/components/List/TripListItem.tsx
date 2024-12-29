import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Star from '@assets/svg/star.svg';
import Stars from '@assets/svg/stars.svg';
import {Colors} from '@constants/colors';
import CustomButton from '@components/Button/CustomButton';
const TripListItem = () => {
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={require('@assets/svg/Foto.png')} style={styles.image} />
        <View style={{flex: 1}}>
          <Text style={styles.name}>SIFFAT ULLAH SHAH</Text>
          <View style={styles.userContainer}>
            <Star width={20} height={20} />
            <Text>(4.8)</Text>
          </View>
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.name}>April 3, 2022 | 8:00 AM</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.starsContainer}>
        <Stars />
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            Abbaseen House queen road, Estonia...
          </Text>
          <Text style={styles.addressText}>
            234 kings roads, new city Estonia 345...
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.detailItemContainer}>
            <Text style={styles.detailLabel}>Vehicle</Text>
            <Text style={styles.detailValue}>Mercedes</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.detailItemContainer}>
            <Text style={styles.detailLabel}>Total seats</Text>
            <Text style={styles.detailValue}>2</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.detailItemContainer}>
            <Text style={styles.detailLabel}>Per seat</Text>
            <Text style={styles.detailValue}>€ 234</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <CustomButton onPress={onPress} label={'Request'} />
      </View>
    </View>
  );
};

export default TripListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  userContainer: {
    gap: 10,

    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    marginLeft: 'auto',
    fontSize: 20,
  },
  lineContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    height: 0.5,
    backgroundColor: 'gray',
    flex: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    gap: 15,
  },
  addressText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10, // İçeriğin üst ve alt kısmına boşluk ekleniyor
    borderTopWidth: 0.5,
    borderTopColor: '#ddd', // Üst sınır ekleniyor
    alignItems: 'center', // Değerlerin yatayda ortalanmasını sağlar
  },

  infoContainer: {
    gap: 10,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600', // Label metni için daha kalın yazı tipi
    color: '#B3B3B3', // Daha koyu renk
  },
  detailValue: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500', // Değer metni için biraz daha normal yazı tipi
    color: Colors.darkBlue, // Önemli metinler için mavi renk
  },
  detailItemContainer: {
    gap: 3,
  },
});

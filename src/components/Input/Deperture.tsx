import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const Departure = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // API'den şehirleri çek
    fetch(
      'https://secure.geonames.org/searchJSON?country=TR&featureClass=P&maxRows=1000&username=zelalsu',
    )
      .then(response => response.json())
      .then(data => {
        // Şehir adlarını al
        console.log(data);
        const cityNames = data?.geonames?.map(city => city.name);
        setCities(cityNames);
      })
      .catch(error => console.error('Hata:', error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Departure;

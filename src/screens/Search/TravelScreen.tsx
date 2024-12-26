import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import TripListItem from '@components/List/TripListItem';

const TravelScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TripListItem />
        <TripListItem />
      </View>
    </ScrollView>
  );
};

export default TravelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

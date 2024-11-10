import {View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

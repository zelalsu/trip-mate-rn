import {View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const webClientId =
  '473993777236-d9cc81inm3cetd9focb1u0bdftpr3fs2.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: webClientId,
});

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

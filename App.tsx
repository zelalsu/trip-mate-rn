import {View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const webClientId =
  '473993777236-d9cc81inm3cetd9focb1u0bdftpr3fs2.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: webClientId,
});

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

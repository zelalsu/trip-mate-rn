import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from './types';
import {SearchScreen} from '@screens';
import TravelScreen from '@screens/Search/TravelScreen';

const Main = createNativeStackNavigator<MainStackParams>();

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="TravelScreen"
        component={TravelScreen}
        options={{headerShown: true, title: 'Travel'}}
      />
    </Main.Navigator>
  );
};
export default MainNavigator;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from './types';
import {SearchScreen} from '@screens';

const Main = createNativeStackNavigator<MainStackParams>();

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  );
};
export default MainNavigator;

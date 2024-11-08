/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';

import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons'; // İkon kütüphanesini import et

import RegisterScreen from '@screens/Login/RegisterScreen';
import SearchScreen from '@screens/Search/SearchScreen';
import PublishScreen from '@screens/Publish/PublishScreen';
import TravelsScreen from '@screens/Travel/TravelsScreen';
import MessageScreen from '@screens/Message/MessageScreen';
import {MainStackParams, RootStackParams, TabStackParams} from './types';

const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<TabStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Firebase auth state değişimini kontrol et
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true); // Kullanıcı giriş yaptı
      } else {
        setIsLoggedIn(false); // Kullanıcı giriş yapmadı
      }
    });

    // Unsubscribe from the auth state listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}} // TabNavigator için header'ı gizle
          />
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}} // LoginScreen için header'ı gizle
          />
        )}
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}} // RegisterScreen için header'ı gizle
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          tabBarLabel: 'Search',
          headerShown: false, // Home ekranı için header'ı gizle
          tabBarIcon: ({color, size}) => (
            <Icon name="opencart" size={size} color={color} /> // İkon ekle
          ),
        }}
      />
      <Tab.Screen
        name="PublishScreen"
        component={PublishScreen}
        options={{
          tabBarLabel: 'Publish',
          headerShown: false, // Home ekranı için header'ı gizle
          tabBarIcon: ({color, size}) => (
            <Icon name="plus-square-o" size={size} color={color} /> // İkon ekle
          ),
        }}
      />
      <Tab.Screen
        name="TravelsScreen"
        component={TravelsScreen}
        options={{
          tabBarLabel: 'Travels', // Tab için başlık
          headerShown: false, // Home ekranı için header'ı gizle
          tabBarIcon: ({color, size}) => (
            <IconM name="mode-of-travel" size={size} color={color} /> // İkon ekle
          ),
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Message', // Tab için başlık

          headerShown: false, // Home ekranı için header'ı gizle
          tabBarIcon: ({color, size}) => (
            <Icon name="send" size={size} color={color} /> // İkon ekle
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}} // MainNavigator için header'ı gizle
      />
    </Main.Navigator>
  );
};

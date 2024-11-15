import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabStackParams} from './types';
import {PublishScreen, TravelsScreen} from '@screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons'; // İkon kütüphanesini import et
import MainNavigator from './MainNavigator';
import MessageNavigator from './MessageNavigator';

const Tab = createBottomTabNavigator<TabStackParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          tabBarLabel: 'Search',
          headerShown: false, // Home ekranı için header'ı gizle
          tabBarIcon: getTabBarIcon('opencart'),
        }}
      />
      <Tab.Screen
        name="PublishScreen"
        component={PublishScreen}
        options={{
          tabBarLabel: 'Publish',
          headerShown: false,
          tabBarIcon: getTabBarIcon('plus-square-o'),
        }}
      />
      <Tab.Screen
        name="TravelsScreen"
        component={TravelsScreen}
        options={{
          tabBarLabel: 'Travels',
          headerShown: false,
          tabBarIcon: getTabBarIcon('mode-of-travel', 'Material'),
        }}
      />
      <Tab.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{
          tabBarLabel: 'Message',
          headerShown: false,
          tabBarIcon: getTabBarIcon('send'),
        }}
      />
    </Tab.Navigator>
  );
};

// tabBarIcon fonksiyonunu dışarıda tanımlıyoruz
const getTabBarIcon = (
  iconName: string,
  library: 'FontAwesome' | 'Material' = 'FontAwesome',
) => {
  return ({color, size}: {color: string; size: number}) => {
    if (library === 'Material') {
      return <IconM name={iconName} size={size} color={color} />;
    }
    return <Icon name={iconName} size={size} color={color} />;
  };
};

export default TabNavigator;

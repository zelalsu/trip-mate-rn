import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabStackParams} from './types';
import {PublishScreen, TravelsScreen} from '@screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import MainNavigator from './MainNavigator';
import MessageNavigator from './MessageNavigator';
import {Colors} from '@constants/colors';

const Tab = createBottomTabNavigator<TabStackParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,

          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2B7EFA',
        tabBarInactiveTintColor: '#A4A4A4',
      }}>
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          headerShown: false,
          tabBarIcon: getTabBarIcon('search'),
        }}
      />
      <Tab.Screen
        name="PublishScreen"
        component={PublishScreen}
        options={{
          headerShown: true,
          headerTitle: 'Publish a ride',
          tabBarIcon: getTabBarIcon('plus-square-o'),
        }}
      />
      <Tab.Screen
        name="TravelsScreen"
        component={TravelsScreen}
        options={{
          headerShown: false,
          tabBarIcon: getTabBarIcon('mode-of-travel', 'Material'),
        }}
      />
      <Tab.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{
          headerShown: false,
          tabBarIcon: getTabBarIcon('send'),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarIcon = (
  iconName: string,
  library: 'FontAwesome' | 'Material' = 'FontAwesome',
) => {
  return ({focused}: {focused: boolean}) => {
    const IconComponent = library === 'Material' ? IconM : Icon;

    return (
      <View style={styles.iconContainer}>
        <View style={styles.markerContainer}>
          <View style={[styles.circle, focused && styles.circleActive]}>
            <IconComponent
              name={iconName}
              size={24}
              color={focused ? 'white' : '#A4A4A4'}
            />
          </View>
          <View style={[focused && styles.triangleActive]} />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
  markerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: '#E8F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    backgroundColor: Colors.darkBlue,
  },

  triangleActive: {
    borderBottomColor: Colors.darkBlue,
    position: 'absolute',
    bottom: -10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: '#E8F3FF',
    transform: [{rotate: '180deg'}],
  },
});

export default TabNavigator;

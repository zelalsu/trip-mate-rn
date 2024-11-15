import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MessageStackParams} from './types';
import {MessageScreen} from '@screens';
import ChatScreen from '@screens/Message/ChatScreen';

const Message = createNativeStackNavigator<MessageStackParams>();

const MessageNavigator = () => {
  return (
    <Message.Navigator>
      <Message.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Message.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Message.Navigator>
  );
};
export default MessageNavigator;

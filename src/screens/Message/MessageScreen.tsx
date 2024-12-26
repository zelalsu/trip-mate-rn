import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UserListItem from '@components/List/UserListItem';

type User = {
  id: string;
  name: string;
};

type MessageScreenProps = {
  navigation: NativeStackNavigationProp<any, 'ChatScreen'>;
};

const MessageScreen: React.FC<MessageScreenProps> = ({navigation}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await firestore().collection('users').get();
        const usersArray: User[] = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as User[];
        setUsers(usersArray);
      } catch (error) {
        console.error('Error fetching users: ', error);
        Alert.alert('Error', 'Could not fetch users.');
      }
    };

    fetchUsers();

    // No need for a cleanup function here, so returning an empty function
    return () => {};
  }, []);
  const handleUserPress = (id: string, name: string) => {
    navigation.navigate('ChatScreen', {
      userId: id,
      userName: name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a User to Chat</Text>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <UserListItem
            id={item.id}
            name={item.name}
            onPress={handleUserPress}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 18,
  },
});

export default MessageScreen;

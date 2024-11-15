import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type UserListItemProps = {
  id: string;
  name: string;
  onPress: (id: string, name: string) => void;
};

const UserListItem: React.FC<UserListItemProps> = ({id, name, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id, name)}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          padding: 5,
          alignItems: 'center',
          gap: 20,
        }}>
        <View>
          <Image
            source={require('@assets/svg/Foto.png')}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
        </View>

        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 18,
  },
});

export default UserListItem;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';

// Tipler
interface Message {
  id: string;
  text: string;
  createdAt: any;
  userId: string;
}

interface ChatScreenProps {
  route: {
    params: {
      userId: string;
      userName: string;
    };
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({route}) => {
  const {userId, userName} = route.params;
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const isFocused = useIsFocused();

  // FlatList referansı
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser(userAuth);
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      const chatId = [user.uid, userId].sort().join('_');
      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => {
          const messagesArray: Message[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              text: data.text,
              createdAt: data.createdAt,
              userId: data.userId,
            };
          });
          setMessages(messagesArray);
          setIsLoading(false); // Yüklenmeyi tamamlıyoruz
        });

      return unsubscribe;
    }
  }, [user, userId]);

  useEffect(() => {
    if (isFocused && messages.length > 0 && !isLoading) {
      setTimeout(() => {
        // render sonrası kaydırma işlemi
        flatListRef.current?.scrollToEnd({animated: false});
      }, 100); // kısa bir süre bekleyerek kaydırma yapıyoruz
    }
  }, [isFocused, messages, isLoading]);

  const sendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Please enter a message.');
      return;
    }

    try {
      const chatId = [user.uid, userId].sort().join('_');
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: message,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: user.uid,
        });

      setMessage(''); // Mesajı sıfırlıyoruz
    } catch (error) {
      console.error('Error sending message: ', error);
      Alert.alert('Error', 'There was an issue sending your message.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {userName}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef} // FlatList referansı
          data={messages}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                item.userId === user.uid
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginTop: 5,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0, // Sent message alignment
  },
  receivedMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0, // Received message alignment
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ChatScreen;

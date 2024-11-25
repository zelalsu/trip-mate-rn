import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface LocationModalProps {
  visible: boolean;
  locations: any[];
  onClose: () => void;
  onSelect: (value: string) => void;
  getLocations: (query: string) => void; // API'den şehir verisi almak için fonksiyon
}

const LocationModal = ({
  visible,
  locations,
  onClose,
  onSelect,
  getLocations,
}: LocationModalProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    getLocations(text); // Kullanıcının yazdığı metni API'ye gönder
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Şehir Seç</Text>

        {/* TextInput ile arama */}
        <TextInput
          style={styles.input}
          placeholder="Şehir ara..."
          value={searchText}
          onChangeText={handleSearch} // Kullanıcının girdiği metni işler
        />

        {/* Şehir listesini göster */}
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item.value); // Şehir seçildiğinde bildir
                onClose(); // Modal'ı kapat
              }}>
              <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Şehir bulunamadı</Text>
          }
        />

        <Button title="Kapat" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LocationModal;

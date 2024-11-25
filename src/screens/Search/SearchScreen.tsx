import React, {useCallback, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, Button, Alert} from 'react-native';
import CustomInput from '@components/Input/CustomInput';
import CustomButton from '@components/Button/CustomButton';
import LocationModal from '@components/Modal/LocationModal';
import {getLocationsFromAPI} from '../../api/api';
import auth from '@react-native-firebase/auth';
import {enforceDateFormat, formatDateInTurkish} from '@utils/DateUtils'; // Updated to include formatDateInTurkish
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import CountUser from '@components/Modal/CountUser';
import window from '@constants/dimension';

const SearchScreen = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [user, setUser] = useState(1);
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [manualDate, setManualDate] = useState(formatDateInTurkish(new Date())); // İlk başta bugünü Türkçe formatta gösteriyoruz

  const [focusedInput, setFocusedInput] = useState('');
  const refRBSheet = useRef<any>(null);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('User signed out!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthDate;
    setShowPicker(false);
    setBirthDate(currentDate);
    setManualDate(formatDateInTurkish(currentDate)); // Using Turkish date format
  };

  const handleManualDateChange = (text: string) => {
    setManualDate(enforceDateFormat(text));
  };

  const searchTravel = () => {
    // Arama işlemi burada yapılacak
  };

  const getLocations = useCallback((query: string | number | boolean) => {
    setLocations([]);
    if (query) {
      getLocationsFromAPI(query)
        .then(data => {
          setLocations(data);
        })
        .catch(() => {
          // Handle error if needed
        });
    }
  }, []);

  const handleLocationSelect = (value: string) => {
    if (focusedInput === 'departure') {
      setDeparture(value);
    } else if (focusedInput === 'arrival') {
      setArrival(value);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('@assets/svg/foto.webp')} />
        <Text style={styles.title}>
          Düşük ücretler karşılığında yolculuk seçenekleri
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomInput
          icon={require('@assets/png/rec.png')}
          value={departure}
          onChangeText={setDeparture}
          editable={false}
          placeholder="Kalkış yeri"
          onFocus={() => {
            setFocusedInput('departure');
            setModalVisible(true);
            getLocations(departure);
          }}
        />

        <View style={styles.inputRow}>
          <CustomInput
            icon={require('@assets/png/rec.png')}
            value={arrival}
            editable={false}
            onChangeText={setArrival}
            placeholder="Varış yeri"
            onFocus={() => {
              setFocusedInput('arrival');
              setModalVisible(true);
              getLocations(arrival);
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <CustomInput
            icon={require('@assets/png/calendar.png')}
            placeholder="DD-MM-YYYY"
            value={manualDate}
            onFocus={() => setShowPicker(true)}
            onChangeText={handleManualDateChange}
          />
        </View>
        <View style={styles.inputRow}>
          <CustomInput
            icon={require('@assets/png/user.png')}
            value={user}
            onChangeText={text => setUser(Number(text))}
            onFocus={() => refRBSheet.current.open()}
            placeholder="Kişi sayısı"
          />
        </View>
        <CustomButton label="Ara" onPress={searchTravel} />

        {showPicker && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()} // Disable past dates
          />
        )}

        <LocationModal
          getLocations={getLocations}
          visible={modalVisible}
          locations={locations}
          onClose={() => setModalVisible(false)}
          onSelect={handleLocationSelect}
        />

        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          height={window.height / 5}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <CountUser value={user} setValue={setUser} />
        </RBSheet>
        <Button title="dkf" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: 0,
    fontSize: 25,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(17, 46, 89, 0.4)',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  inputContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '95%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchScreen;

import React, {useCallback, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CustomInput from '@components/Input/CustomInput';
import CustomButton from '@components/Button/CustomButton';
import LocationModal from '@components/Modal/LocationModal';
import {getLocationsFromAPI} from '../../api/api';
// import auth from '@react-native-firebase/auth';
import {formatDateInTurkish} from '@utils/DateUtils'; // Updated to include formatDateInTurkish
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import CountUser from '@components/Modal/CountUser';
import window from '@constants/dimension';
import {RowContainer} from '@components/RowContainer';
import {useDispatch, useSelector} from 'react-redux';

import {
  setDate,
  setEndLocation,
  setLocations,
  setStartLocation,
  setUser,
} from '../../redux/slice/search';

const SearchScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const {startLocation, endLocation, date, user, locations} = useSelector(
    (state: any) => state.search,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const refRBSheet = useRef<any>(null);

  // const signOut = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       Alert.alert('User signed out!');
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    console.log('aa', selectedDate);
    const currentDate = selectedDate || new Date();
    setShowPicker(false);
    dispatch(setDate(formatDateInTurkish(currentDate))); // Redux'taki date güncelleniyor
  };

  const searchTravel = () => {
    // Arama işlemi burada yapılacak
    navigation.navigate('TravelScreen');
  };

  const getLocations = useCallback(
    (query: string | number | boolean) => {
      setLocations([]);
      if (query) {
        getLocationsFromAPI(query)
          .then(data => {
            dispatch(setLocations(data));
          })
          .catch(() => {
            // Handle error if needed
          });
      }
    },
    [dispatch],
  );

  const handleLocationSelect = (value: string) => {
    if (focusedInput === 'departure') {
      dispatch(setStartLocation(value));
    } else if (focusedInput === 'arrival') {
      dispatch(setEndLocation(value));
    }
    setModalVisible(false);
  };

  const handleUserChange = (newCount: number) => {
    console.log(newCount);
    dispatch(setUser(newCount)); // Redux'dan gelen action'ı kullanarak state'i güncelliyoruz
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
          value={startLocation}
          onChangeText={value => dispatch(setStartLocation(value))}
          editable={false}
          placeholder="Kalkış yeri"
          onFocus={() => {
            setFocusedInput('departure');
            setModalVisible(true);
            getLocations(startLocation);
          }}
        />

        <CustomInput
          icon={require('@assets/png/rec.png')}
          value={endLocation}
          editable={false}
          onChangeText={value => dispatch(setEndLocation(value))}
          placeholder="Varış yeri"
          onFocus={() => {
            setFocusedInput('arrival');
            setModalVisible(true);
            getLocations(endLocation);
          }}
        />

        <RowContainer>
          <CustomInput
            style={{borderWidth: 0}}
            icon={require('@assets/png/calendar.png')}
            placeholder="Saat"
            value={date}
            row
            onChangeText={text => dispatch(setDate(text))}
            onFocus={() => setShowPicker(true)} // Date picker açılır
          />
          <CustomInput
            icon={require('@assets/png/user.png')}
            value={user}
            row
            onChangeText={text => setUser(Number(text))}
            onFocus={() => refRBSheet.current.open()}
            placeholder="Kişi sayısı"
          />
        </RowContainer>

        {showPicker && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={new Date(date)} // Redux'tan alınan date
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
          <CountUser
            value={user}
            onChange={handleUserChange} // Redux ile değeri güncelliyoruz
            title="Kaç yolcu alacaksınız?"
            minValue={1}
            maxValue={4}
          />
        </RBSheet>
        <CustomButton label="Ara" onPress={searchTravel} />

        {/* <Button title="dkf" onPress={signOut} /> */}
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
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: window.height / 2.5,
  },
  inputContainer: {
    position: 'absolute',
    top: '40%',
    height: window.height,
    alignSelf: 'center',
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: 'white',
  },
  inputRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchScreen;

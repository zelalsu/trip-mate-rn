import {View, StyleSheet, Text} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CustomInput from '@components/Input/CustomInput';
import {getLocationsFromAPI} from '../../api/api';
import LocationModal from '@components/Modal/LocationModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import window from '@constants/dimension';
import {RowContainer} from '@components/RowContainer';
import {formatDateInTurkish, formattedTime} from '@utils/DateUtils';
import {
  setStartLocation,
  setEndLocation,
  setUser,
  setTime,
  setLocations,
  setDate,
  setVehicle,
} from '../../redux/slice/publish';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CountUser from '@components/Modal/CountUser';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '@components/Button/CustomButton';

const PublishScreen = () => {
  const dispatch = useDispatch();
  const {startLocation, endLocation, date, user, time, locations, vehicle} =
    useSelector((state: any) => state.publish);
  console.log(startLocation);
  const [focusedInput, setFocusedInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [show, setShow] = useState(false);

  const refRBSheet = useRef<any>(null);

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

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowPicker(false);
    dispatch(setDate(formatDateInTurkish(currentDate))); // Redux'taki date güncelleniyor
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (selectedTime) {
      dispatch(setTime(formattedTime(selectedTime))); // Zamanı Redux'a kaydediyoruz
    }
    setShow(false);
  };
  const handleUserChange = (newCount: number) => {
    console.log(newCount);
    dispatch(setUser(newCount)); // Redux'dan gelen action'ı kullanarak state'i güncelliyoruz
  };

  const searchTravel = () => {
    // Arama işlemi burada yapılacak
  };
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <CustomInput
          icon={require('@assets/png/rec.png')}
          value={startLocation}
          onChangeText={value => dispatch(setStartLocation(value))}
          editable={false}
          placeholder="Pickup Address"
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
          placeholder="Destination address"
          onFocus={() => {
            setFocusedInput('arrival');
            setModalVisible(true);
            getLocations(endLocation);
          }}
        />
        <Text style={{textAlign: 'center', color: 'green'}}>+ Add stop</Text>
      </View>

      <View style={styles.locationContainer}>
        <CustomInput
          style={{borderWidth: 0}}
          label="SELECT DATE"
          icon={require('@assets/png/calendar.png')}
          placeholder="Saat"
          value={date}
          onChangeText={text => dispatch(setDate(text))}
          onFocus={() => setShowPicker(true)} // Date picker açılır
        />
      </View>

      <RowContainer marginTop>
        <CustomInput
          icon={require('@assets/png/time.png')}
          placeholder="time"
          value={time}
          label="TIME"
          row
          onChangeText={text => dispatch(setTime(text))}
          onFocus={() => setShow(true)}
        />
        <CustomInput
          icon={require('@assets/png/user.png')}
          value={user}
          label="AVAILABLE SEATS"
          row
          onChangeText={text => dispatch(setUser(Number(text)))}
          onFocus={() => refRBSheet.current.open()}
          placeholder="Kişi sayısı"
        />
      </RowContainer>

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
          title="How many seats are you offering??"
          minValue={1}
          maxValue={4}
        />
      </RBSheet>

      <View style={styles.locationContainer}>
        <CustomInput
          style={{borderWidth: 0}}
          label="VEHICLE"
          // icon={require('@assets/png/calendar.png')}
          placeholder="Aracınızı modeliyle birlikte girin"
          value={vehicle}
          onChangeText={text => dispatch(setVehicle(text))}
        />
      </View>

      {showPicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date(date)} // Redux'tan alınan date
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()} // Geçmiş tarihleri devre dışı bırakıyoruz
        />
      )}

      {show && (
        <RNDateTimePicker
          value={new Date(time)} // Time string olabilir
          mode="time" // Saat seçici modu
          is24Hour={true} // 24 saat formatı
          display="default" // Ekran tipi
          onChange={handleTimeChange}
        />
      )}
      <CustomButton label="Continue" onPress={searchTravel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  locationContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
  },
});

export default PublishScreen;

// publishSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {formatDateInTurkish, formattedTime} from '@utils/DateUtils';

const initialState = {
  startLocation: '',
  endLocation: '',
  date: formatDateInTurkish(new Date()),
  user: 1,
  time: formattedTime(new Date()),
  locations: [],
  vehicle: '',
};

const publishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    setStartLocation(state, action) {
      state.startLocation = action.payload;
    },
    setEndLocation(state, action) {
      state.endLocation = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setLocations(state, action) {
      state.locations = action.payload;
    },
    setVehicle(state, action) {
      state.vehicle = action.payload;
    },
  },
});

export const {
  setStartLocation,
  setEndLocation,
  setDate,
  setUser,
  setTime,
  setLocations,
  setVehicle,
} = publishSlice.actions;

export default publishSlice.reducer;

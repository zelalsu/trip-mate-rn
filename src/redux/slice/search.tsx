// searchSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {formatDateInTurkish} from '@utils/DateUtils';

const initialState = {
  startLocation: '',
  endLocation: '',
  date: formatDateInTurkish(new Date()),
  user: 1,
  locations: [],
};

const searchSlice = createSlice({
  name: 'search',
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
    setLocations(state, action) {
      state.locations = action.payload;
    },
  },
});

export const {
  setStartLocation,
  setEndLocation,
  setDate,
  setUser,

  setLocations,
} = searchSlice.actions;

export default searchSlice.reducer;

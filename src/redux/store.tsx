// store.js
import {configureStore} from '@reduxjs/toolkit';
import publishReducer from './slice/publish';
import searchReducer from './slice/search';

export const store = configureStore({
  reducer: {
    publish: publishReducer,
    search: searchReducer,
  },
});

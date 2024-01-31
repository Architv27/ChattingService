// store.js
import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './Slicers/roomSlicer.js';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});

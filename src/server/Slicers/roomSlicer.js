import { createSlice } from '@reduxjs/toolkit';

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: {}, // Object with room IDs as keys and counts as values
  },
  reducers: {
    addRoom: (state, action) => {
      const { roomId } = action.payload;
      state.rooms[roomId] = (state.rooms[roomId] || 0) + 1;
    },
    removeRoom: (state, action) => {
      const { roomId } = action.payload;
      if (state.rooms[roomId] > 0) {
        state.rooms[roomId]--;
      }
    },
  },
});

export const { addRoom, removeRoom } = roomsSlice.actions;

// Selector to get all rooms and their counts
export const selectAllRooms = (state) => state.rooms.rooms;

export default roomsSlice.reducer;

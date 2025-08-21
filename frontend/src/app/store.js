import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/eventSlice';

export const store = configureStore({
  reducer: {
    // This tells Redux that the 'events' piece of our application's state
    // will be managed by the logic from our eventSlice.
    events: eventReducer,
  },
});

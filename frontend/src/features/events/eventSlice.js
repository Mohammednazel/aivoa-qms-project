import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

// --- Async Thunks ---

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(`${API_URL}/events/`);
  return response.data;
});

// The createEvent thunk now only focuses on its main job: posting the data.
export const createEvent = createAsyncThunk('events/createEvent', async (eventData) => {
  const response = await axios.post(`${API_URL}/events/`, eventData);
  // It returns the newly created event from the server (which now includes an ID)
  return response.data;
});


// --- Slice Definition ---

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  // 'extraReducers' is the key to the fix.
  extraReducers: (builder) => {
    builder
      // Reducers for the fetchEvents lifecycle
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // This will now always have the full, correct list
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // --- DEFINITIVE FIX ---
      // This reducer listens for when createEvent is successfully completed.
      .addCase(createEvent.fulfilled, (state, action) => {
        // Instead of re-fetching, we directly add the new event to our list.
        // The action.payload contains the event returned from the server.
        state.items.push(action.payload);
        // We can also set the status to 'succeeded' to be consistent.
        state.status = 'succeeded';
      });
  },
});

export default eventSlice.reducer;

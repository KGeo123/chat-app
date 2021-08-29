import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: { messages: [], loading: false },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

const messagesReducer = messageSlice.reducer;
export const messagesActions = messageSlice.actions;

export default messagesReducer;

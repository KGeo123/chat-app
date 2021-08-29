import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages';

const messagesStore = configureStore({ reducer: messagesReducer });
export default messagesStore;

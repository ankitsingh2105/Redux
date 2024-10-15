// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Slices/counterSlice';
import todoReducer from '../Slices/todoSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todoList: todoReducer,
  },
});

export default store;

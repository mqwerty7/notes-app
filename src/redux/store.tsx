import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './noteSlice'
import { LocalStorageService } from '../localStorageService';

const store = configureStore({
  reducer: noteReducer
})

store.subscribe(() => LocalStorageService.setStore(store.getState()));

export default store;

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/counterSlice'

//combine reducers for multiple reducers
export const store = configureStore({
  reducer: {
    //counter from name of the export const counterSlice = createSlice({
    //name: 'counter',
    counter: counterReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
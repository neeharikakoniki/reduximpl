import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    //actions
    increment: (state) => {
     
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },


    reset: (state) => {
      state.value = 0
    },
    
    // actions with payload 
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})


export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions
//exported all the actions to use them 

export default counterSlice.reducer


// once we create a slice , also need to register it.
//so that wheneevr store recevies any acvtion it would check with the reducers that are registerted with it.
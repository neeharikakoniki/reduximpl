
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice'; // thunk version
 import productSagaReducer from './sagas/productSaga'; // saga version
 import { watchProductsSaga } from './sagas/productSaga';
import { productApi } from './api/productApi';
import cartReducer from './slices/cartSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
     //products: productReducer,
    productsSaga: productSagaReducer,
      cart: cartReducer,
     [productApi.reducerPath]: productApi.reducer, // RTK Query reducer
  },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
      .concat(sagaMiddleware)
//       .concat(productApi.middleware),       // attach RTK query middleware        
});

 sagaMiddleware.run(watchProductsSaga); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

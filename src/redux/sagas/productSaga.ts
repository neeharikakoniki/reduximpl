import { call, put, takeEvery } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';

// Slice for Saga (no Thunk now)
const productSagaSlice = createSlice({
  name: 'productSaga',
  initialState: {
    products: [] as any[],
    loading: false,
    error: '',
  },
  reducers: {
    fetchProductsRequest: state => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSagaSlice.actions;

export default productSagaSlice.reducer;

// worker
function* fetchProductsSaga(): any {
  try {
    const response: Response = yield call(fetch, 'https://dummyjson.com/products');
    const data = yield call([response, 'json']);
    yield put(fetchProductsSuccess(data.products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

// Watcher
export function* watchProductsSaga() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
}


import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalPrice = createSelector(
  [selectCartItems],
  items => items.reduce((sum, item) => sum + item.price, 0)
);

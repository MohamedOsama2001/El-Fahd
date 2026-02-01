import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Memoized selector to check if a product is in favourites
export const selectIsInFavourites = (productId: string) =>
  createSelector(
    [(state: RootState) => state.favourites.favourites],
    (favourites) => favourites.some((item) => item._id === productId)
  );

// Memoized selector for favourites count
export const selectFavouritesCount = createSelector(
  [(state: RootState) => state.favourites.favourites],
  (favourites) => favourites.length
);

// Memoized selector for all favourites
export const selectFavourites = (state: RootState) => state.favourites.favourites;

// Memoized selector for auth state
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthanticated;

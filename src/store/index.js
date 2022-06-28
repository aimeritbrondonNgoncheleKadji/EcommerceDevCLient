import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';

import articleReducer from './articles/article.slice';
import alertReducer from './ui/alert.slice';
import loadingReducer from './ui/loading.slice';

export function initStore({ preloadedState = {} } = {}) {
  return configureStore({
    reducer: {
      articleState: articleReducer,
      alertState: alertReducer,
      loadingState: loadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([reduxLogger]),
    preloadedState,
  });
}

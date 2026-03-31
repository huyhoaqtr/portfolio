import {
  combineReducers,
  configureStore,
  type Reducer,
  type ReducersMapObject,
  type UnknownAction,
} from '@reduxjs/toolkit';
import themeReducer from '@/redux/app/themeSlice';
import layoutReducer from '@/redux/app/layoutSlice';
import settingsReducer from '@/redux/app/settingsSlice';

const staticReducers = {
  theme: themeReducer,
  layout: layoutReducer,
  settings: settingsReducer,
};

const createRootReducer = (asyncReducers: ReducersMapObject = {}) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

type RootReducer = ReturnType<typeof createRootReducer>;
export type RootState = ReturnType<RootReducer>;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

type ExtendedStore = ReturnType<typeof configureStore> & {
  asyncReducers: ReducersMapObject;
  injectReducer: (key: string, reducer: Reducer<unknown, UnknownAction>) => void;
};

export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: createRootReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState as RootState | undefined,
  }) as ExtendedStore;

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    if (!key || store.asyncReducers[key]) {
      return;
    }

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers) as Reducer);
  };

  return store;
}

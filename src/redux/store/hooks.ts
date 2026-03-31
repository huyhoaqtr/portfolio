import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from '@/redux/store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore() as AppStore;

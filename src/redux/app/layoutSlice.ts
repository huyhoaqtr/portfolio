import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type LayoutState = {
  isSidebarOpen: boolean;
  isHeaderCollapsed: boolean;
  isScrollTopVisible: boolean;
};

const initialState: LayoutState = {
  isSidebarOpen: false,
  isHeaderCollapsed: false,
  isScrollTopVisible: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setHeaderCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isHeaderCollapsed = action.payload;
    },
    setScrollTopVisible: (state, action: PayloadAction<boolean>) => {
      state.isScrollTopVisible = action.payload;
    },
  },
});

export const { setSidebarOpen, toggleSidebar, setHeaderCollapsed, setScrollTopVisible } =
  layoutSlice.actions;
export default layoutSlice.reducer;

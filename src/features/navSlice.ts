import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Navigation, navItems } from ".";

interface InitialState {
  lastRoute: string;
  navItems: Navigation[];
  isOpen: boolean;
  logoutHover: boolean;
}

const initialState: InitialState = {
  lastRoute: "/",
  navItems,
  isOpen: false,
  logoutHover: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setLastRoute: (state, action: PayloadAction<string>) => {
      state.lastRoute = action.payload;
    },
    setIsHoveringNavItem: (
      state,
      action: PayloadAction<{ name: string; isHovering: boolean }>,
    ) => {
      const { name, isHovering } = action.payload;
      const navItem = state.navItems.find((item) => item.name === name);
      if (navItem) {
        navItem.isHovering = isHovering;
      }
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setLogoutHover: (state, action: PayloadAction<boolean>) => {
      state.logoutHover = action.payload;
    },
    setNavItems: (state, action: PayloadAction<Navigation[]>) => {
      state.navItems = action.payload;
    },
    resetNavState: () => initialState,
  },
});

export const {
  setLastRoute,
  setIsHoveringNavItem,
  setIsOpen,
  setNavItems,
  setLogoutHover,
  resetNavState,
} = navSlice.actions;
export default navSlice.reducer;

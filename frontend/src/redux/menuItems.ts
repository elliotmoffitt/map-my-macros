import { IMenuItem } from "../../types/menuItems";
import { csrfFetch } from "./csrf";
import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const GET_MENU_ITEMS = "menuItems/GET_MENU_ITEMS";
const UPDATE_MENU_ITEM = "menuItem/UPDATE_MENU_ITEMS";

const getMenuItems = (menuItems: IMenuItem[]) => ({
  type: GET_MENU_ITEMS,
  payload: menuItems,
});

const updateMenuItem = (menuItem: IMenuItem) => ({
  type: UPDATE_MENU_ITEM,
  payload: menuItem,
});

export const getMenuItemsThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/menuItems");
    if (res.ok) {
      const data = await res.json();
      dispatch(getMenuItems(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getMenuItemsTodayThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/menuItems/today");
    if (res.ok) {
      const data = await res.json();
      dispatch(getMenuItems(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateMenuItemThunk =
  (menuItem: IMenuItem): any =>
  async (dispatch: any) => {
    try {
      const { id, restaurantName, name, calories, protein, carbs, fat } =
        menuItem;
      const res = await csrfFetch(`/api/menuItems/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantName,
          name,
          calories,
          protein,
          carbs,
          fat,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateMenuItem(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

const initialState: any = { byId: {}, allMenuItems: [] };

const menuItemsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_MENU_ITEMS:
      const allMenuItems = action.payload;
      const byId: Record<number, any> = {};
      for (const menuItem of allMenuItems) {
        byId[menuItem.id] = menuItem;
      }
      return { ...state, allMenuItems, byId };
    case UPDATE_MENU_ITEM: {
      const updatedMenuItem = action.payload;
      const newAllMenuItems = state.menuItems?.map((menuItem: IMenuItem) =>
        menuItem.id === updatedMenuItem.id ? updatedMenuItem : menuItem
      );
      return {
        ...state,
        menuItems: newAllMenuItems,
        byId: {
          ...state.byId,
          [updatedMenuItem.id]: updatedMenuItem,
        },
      };
    }
    default:
      return state;
  }
};

export default menuItemsReducer;

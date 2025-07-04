import { IMenuItem } from "../../types/menuItems";
import { csrfFetch } from "./csrf";
import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const GET_MENU_ITEMS = "menuItems/GET_MENU_ITEMS";
const CREATE_MENU_ITEM = "menuItem/CREATE_MENU_ITEMS";
const UPDATE_MENU_ITEM = "menuItem/UPDATE_MENU_ITEMS";
const DELETE_MENU_ITEM = "menuItem/DELETE_MENU_ITEMS";

const getMenuItems = (menuItems: IMenuItem[]) => ({
  type: GET_MENU_ITEMS,
  payload: menuItems,
});

const createMenuItem = (menuItem: IMenuItem) => ({
  type: CREATE_MENU_ITEM,
  payload: menuItem,
});

const updateMenuItem = (menuItem: IMenuItem) => ({
  type: UPDATE_MENU_ITEM,
  payload: menuItem,
});

const deleteMenuItem = (menuItemId: number) => ({
  type: DELETE_MENU_ITEM,
  payload: menuItemId,
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

export const createMenuItemThunk =
  (menuItem: IMenuItem): any =>
  async (dispatch: any) => {
    try {
      const { restaurantName, name, imageUrl, calories, protein, carbs, fat } =
        menuItem;
      const res = await csrfFetch(`/api/menuItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantName,
          name,
          imageUrl,
          calories,
          protein,
          carbs,
          fat,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(createMenuItem(data));
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

export const deleteMenuItemThunk =
  (menuItemId: number): any =>
  async (dispatch: any) => {
    try {
      const res = await csrfFetch(`/api/menuItems/${menuItemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        dispatch(deleteMenuItem(menuItemId));
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
    case CREATE_MENU_ITEM:
      return {
        ...state,
        allMenuItems: [...state.allMenuItems, action.payload],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
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
    case DELETE_MENU_ITEM: {
      const idToDelete = action.payload;
      const newById = { ...state.byId };
      delete newById[idToDelete];
      return {
        ...state,
        allMenuItems: state.allMenuItems.filter(
          (menuItem: IMenuItem) => menuItem.id !== idToDelete
        ),
        byId: newById,
      };
    }
    default:
      return state;
  }
};

export default menuItemsReducer;

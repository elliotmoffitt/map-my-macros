import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const GET_MENU_ITEMS = "getMenuItems/GET_MENU_ITEMS";

const getMenuItems = (menuItems: any) => ({
  type: GET_MENU_ITEMS,
  payload: menuItems,
});

export const getMenuItemsThunk = () => async (dispatch: any) => {
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

export const getMenuItemsTodayThunk = () => async (dispatch: any) => {
  console.log("BLEAGHHHHHH");
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
    default:
      return state;
  }
};

export default menuItemsReducer;

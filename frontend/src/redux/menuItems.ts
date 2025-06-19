import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const GET_MENU_ITEMS = "getMenuItems/GET_MENU_ITEMS";

const getMenuItems = (menuItems: any) => ({
  type: GET_MENU_ITEMS,
  payload: menuItems,
});

const getMenuItemsThunk = () => async (dispatch: any) => {
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

const getMenuItemsTodayThunk = () => async (dispatch: any) => {
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
      const allMenuItems = action.payloaoad;
      const byId: Record<number, any> = {};
      for (const menuItem of allMenuItems) {
        byId[menuItem] = menuItem;
      }
    default:
      return state;
  }
};

export default menuItemsReducer;

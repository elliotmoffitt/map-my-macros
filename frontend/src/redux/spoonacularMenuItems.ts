import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const SPOONACULAR_URL = `https://api.spoonacular.com/food/menuItems/`;
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const GET_SPOONACULAR_MENU_ITEMS = "menuItems/GET_MENU_ITEMS";

const getMenuItems = (menuItems: any) => ({
  type: GET_SPOONACULAR_MENU_ITEMS,
  payload: menuItems,
});

const getSpoonacularMenuItemThunk = async (menuItems: any) => {
  const menuItemsNutrition = [];
  for (const menuItem of menuItems) {
    const url = new URL(`${SPOONACULAR_URL}${menuItem.id}`);
    url.searchParams.append("apiKey", SPOONACULAR_API_KEY);
    const res = await fetch(url.toString());
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        throw res;
      }
      menuItemsNutrition.push(data);
    }
  }
  return menuItemsNutrition;
};

export const getSpoonacularMenuItemsThunk =
  (search: ISearch): any =>
  async (dispatch: any) => {
    const {
      food,
      minCalories,
      maxCalories,
      minProtein,
      maxProtein,
      minCarbs,
      maxCarbs,
      minFat,
      maxFat,
    } = search;
    try {
      const nutritionParams: INutritionParams = {
        apiKey: SPOONACULAR_API_KEY,
        query: food,
        number: "1",
        minCalories: minCalories,
        maxCalories: maxCalories,
        minProtein: minProtein,
        maxProtein: maxProtein,
        minCarbs: minCarbs,
        maxCarbs: maxCarbs,
        minFat: minFat,
        maxFat: maxFat,
      };
      const url = new URL(`${SPOONACULAR_URL}search`);
      for (const [key, value] of Object.entries(nutritionParams)) {
        if (value.length) {
          url.searchParams.append(key, value);
        }
      }
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        if (data.errors) {
          throw res;
        }
        const dataWithNutrition = await getSpoonacularMenuItemThunk(
          data.menuItems
        );
        dispatch(getMenuItems(dataWithNutrition));
        return dataWithNutrition;
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

const initialState = { menuItems: [] };

const spoonacularMenuItemsReducer = (
  state = initialState,
  action: IActionCreator
) => {
  switch (action.type) {
    case GET_SPOONACULAR_MENU_ITEMS:
      return { ...state, menuItems: action.payload };
    default:
      return state;
  }
};

export default spoonacularMenuItemsReducer;

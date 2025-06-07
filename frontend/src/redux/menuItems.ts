import { url } from "inspector";
import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from './types/search';

const SPOONACULAR_URL = `https://api.spoonacular.com/food/menuItems/`;
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

const GET_MENU_ITEMS = 'menuItems/GET_MENU_ITEMS';
const GET_MENU_ITEM = 'menuItems/GET_MENU_ITEM';


const getMenuItems = (menuItems: any) => ({
    type: GET_MENU_ITEMS,
    payload: menuItems
})

const getMenuItem = async (menuItems) => {
    const menuItemsNutrition = []
    for (const menuItem of menuItems) {
        const url = new URL(`${SPOONACULAR_URL}${menuItem.id}`);
        url.searchParams.append('apiKey', SPOONACULAR_API_KEY)
        const res = await fetch(url.toString());
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            menuItemsNutrition.push(data)
        }
    }

}

export const getMenuItemsThunk = (search: ISearch): any => async (dispatch: any) => {
    const {food, minCalories, maxCalories, minProtein, maxProtein,
           minCarbs, maxCarbs, minFat, maxFat} = search
    try {
        const nutritionParams: INutritionParams = {
            apiKey: SPOONACULAR_API_KEY,
            query: food,
            number: '10',
            minCalories: minCalories,
            maxCalories: maxCalories,
            minProtein: minProtein,
            maxProtein: maxProtein,
            minCarbs: minCarbs,
            maxCarbs: maxCarbs,
            minFat: minFat,
            maxFat: maxFat,
        }
        const url = new URL(`${SPOONACULAR_URL}search`);
        for (const [key, value] of Object.entries(nutritionParams)) {
            url.searchParams.append(key, value)
        }
        const res = await fetch(url.toString())
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getMenuItems(data));
            getMenuItem(data.menuItems);
            // console.log(data.menuItems)
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}

const initialState = {allMenuItems: []};

const menuItemsReducer = (state = initialState, action: IActionCreator) => {
    let newState = {...state};

    switch(action.type) {
        case GET_MENU_ITEMS:
            return {...state, menuItems: action.payload}
    default:
        return state;
    }
}


export default menuItemsReducer;

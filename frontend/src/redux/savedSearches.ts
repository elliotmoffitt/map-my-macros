import { url } from "inspector";
import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";

const GET_SAVED_SEARCHES = "savedSearches/GET_SAVED_SEARCHES";
const SAVE_SEARCH = "savedSearches/SAVE_SEARCH";
const UPDATE_SAVED_SEARCH = "savedSearches/UPDATE_SEARCH";
const DELETE_SAVED_SEARCH = "savedSearches/UPDATE_SEARCH";

const getSavedSearches = (savedSearches: any) => ({
  type: GET_SAVED_SEARCHES,
  payload: savedSearches,
});

const saveSearch = (search: any) => ({
  type: SAVE_SEARCH,
  payload: search,
});

const updateSavedSearch = (savedSearch: any) => ({
  type: UPDATE_SAVED_SEARCH,
  payload: DELETE_SAVED_SEARCH,
});

const deleteSavedSearch = (savedSearchId: number) => ({
  type: DELETE_SAVED_SEARCH,
  payload: savedSearchId,
});

export const getSavedSearchesThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/savedSearches");
    if (res.ok) {
      const data = await res.json();
      dispatch(getSavedSearches(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveSearchThunk = async () => {};

const initialState = { savedSearches: [] };

const savedSearchesReducer = (state = initialState, action: IActionCreator) => {
  switch (action.type) {
    case GET_SAVED_SEARCHES:
      return { ...state, savedSearches: action.payload };
    default:
      return state;
  }
};

export default savedSearchesReducer;

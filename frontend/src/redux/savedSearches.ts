import { url } from "inspector";
import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams } from "./types/search";
import { csrfFetch } from "./csrf";

const GET_SAVED_SEARCHES = "savedSearches/GET_SAVED_SEARCHES";
const SAVE_SEARCH = "savedSearches/SAVE_SEARCH";
const UPDATE_SAVED_SEARCH = "savedSearches/UPDATE_SEARCH";
const DELETE_SAVED_SEARCH = "savedSearches/DELETE_SEARCH";

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
  payload: savedSearch,
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

export const saveSearchThunk = (savedSearch: any) => async (dispatch: any) => {
  try {
    const [
      name,
      food,
      minCalories,
      maxCalories,
      minProtein,
      maxProtein,
      minCarbs,
      maxCarbs,
      minFat,
      maxFat,
    ] = savedSearch;
    const res = await csrfFetch("/api/savedSearches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      await dispatch(saveSearch(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateSavedSearchThunk =
  (savedSearch: any) => async (dispatch: any) => {
    try {
      const {
        id,
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      } = savedSearch;
      const res = await csrfFetch(`/api/savedSearches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          food,
          minCalories,
          maxCalories,
          minProtein,
          maxProtein,
          minCarbs,
          maxCarbs,
          minFat,
          maxFat,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        await dispatch(updateSavedSearch(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const deleteSavedSearchThunk =
  (savedSearchId: number) => async (dispatch: any) => {
    try {
      const res = await csrfFetch(`/api/savedSearches/${savedSearchId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        await dispatch(deleteSavedSearch(savedSearchId));
      }
    } catch (e) {
      console.log(e);
    }
  };

const initialState = { savedSearches: [] };

const savedSearchesReducer = (state = initialState, action: IActionCreator) => {
  let newState;
  switch (action.type) {
    case GET_SAVED_SEARCHES:
      return { ...state, savedSearches: action.payload };
    case SAVE_SEARCH:
      return {
        ...state,
        savedSearches: [...state.savedSearches, action.payload],
      };
    case UPDATE_SAVED_SEARCH:
      return {
        ...state,
        savedSearches: state.savedSearches.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case DELETE_SAVED_SEARCH:
      newState = { ...state };
      newState.savedSearches = state.savedSearches.filter(
        (savedSearch) => savedSearch.id !== action.payload
      );
      newState.byId = { ...state.byId };
      delete newState.byId[action.payload];
      return newState;
    default:
      return state;
  }
};

export default savedSearchesReducer;

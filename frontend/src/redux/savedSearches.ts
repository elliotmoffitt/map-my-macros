import { IActionCreator } from "./types/redux";
import { ISearch, INutritionParams, ISearchState } from "./types/search";
import { csrfFetch } from "./csrf";
import { isErrored } from "stream";

const GET_SAVED_SEARCHES = "savedSearches/GET_SAVED_SEARCHES";
const SAVE_SEARCH = "savedSearches/SAVE_SEARCH";
const UPDATE_SAVED_SEARCH = "savedSearches/UPDATE_SEARCH";
const DELETE_SAVED_SEARCH = "savedSearches/DELETE_SEARCH";

const getSavedSearches = (savedSearches: any) => ({
  type: GET_SAVED_SEARCHES,
  payload: savedSearches,
});

const saveSearch = (search: ISearch) => ({
  type: SAVE_SEARCH,
  payload: search,
});

const updateSavedSearch = (savedSearch: ISearch) => ({
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

export const saveSearchThunk = (savedSearch: ISearch): any => async (dispatch: any) => {
  try {
    const {
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
  (savedSearch: ISearch): any => async (dispatch: any) => {
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
  (savedSearchId: number): any => async (dispatch: any) => {
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

const initialState: ISearchState = { byId: {}, allSavedSearches: [] };

const savedSearchesReducer = (state = initialState, action: IActionCreator) => {
  switch (action.type) {
    case GET_SAVED_SEARCHES:
      const allSavedSearches = action.payload;
      const byId: Record<number, ISearch> = {};
      for (const search of allSavedSearches) {
        byId[search.id] = search;
      }
      return {
        ...state, allSavedSearches, byId
      }
    case SAVE_SEARCH:
      return {
        ...state,
        allSavedSearches: [...state.allSavedSearches, action.payload],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_SAVED_SEARCH: {
      const updatedSearch = action.payload;
      const newAllSavedSearches = state.allSavedSearches.map(s =>
        s.id === updatedSearch.id ? updatedSearch : s
      );
      return {
        ...state,
        allSavedSearches: newAllSavedSearches,
        byId: {
          ...state.byId,
          [updatedSearch.id]: updatedSearch,
        },
      };
    }
    case DELETE_SAVED_SEARCH: {
      const idToDelete = action.payload;
      const newById = { ...state.byId };
      delete newById[idToDelete];
      return {
        ...state,
        allSavedSearches: state.allSavedSearches.filter(
          (search) => search.id !== idToDelete
        ),
        byId: newById,
      };
    }
    default:
      return state;
  }
};

export default savedSearchesReducer;

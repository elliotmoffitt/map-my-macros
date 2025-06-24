import { IFoodHistory } from "../../types/foodHistory";
import { csrfFetch } from "./csrf";

const GET_FOOD_HISTORY = "foodHistory/GET_FOOD_HISTORY";
const CREATE_FOOD_HISTORY = "foodHistory/CREATE_FOOD_HISTORY";
const UPDATE_FOOD_HISTORY = "foodHistory/UPDATE_FOOD_HISTORY";
const DELETE_FOOD_HISTORY = "foodHistory/DELETE_FOOD_HISTORY";

const getFoodHistory = (foodHistory: IFoodHistory[]) => ({
  type: GET_FOOD_HISTORY,
  payload: foodHistory,
});

const createFoodHistory = (foodHistory: IFoodHistory) => ({
  type: CREATE_FOOD_HISTORY,
  payload: foodHistory,
});

const updateFoodHistory = (foodHistory: IFoodHistory) => ({
  type: UPDATE_FOOD_HISTORY,
  payload: foodHistory,
});

const deleteFoodHistory = (foodHistoryId: number) => ({
  type: DELETE_FOOD_HISTORY,
  payload: foodHistoryId,
});

export const getFoodHistoryThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/foodHistory");
    if (res.ok) {
      const data = await res.json();
      dispatch(getFoodHistory(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const createFoodHistoryThunk =
  (foodHistory: IFoodHistory): any =>
  async (dispatch: any) => {
    try {
      const { calories, protein, carbs, fat, food } = foodHistory;
      const res = await csrfFetch(`/api/foodHistory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calories,
          protein,
          carbs,
          fat,
          food,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(createFoodHistory(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const updateFoodHistoryThunk =
  (foodHistory: IFoodHistory): any =>
  async (dispatch: any) => {
    console.log("YUP");
    try {
      const { id, calories, protein, carbs, fat, food } = foodHistory;
      const res = await csrfFetch(`/api/foodHistory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calories,
          protein,
          carbs,
          fat,
          food,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateFoodHistory(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const deleteFoodHistoryThunk =
  (foodHistoryId: number): any =>
  async (dispatch: any) => {
    try {
      const res = await csrfFetch(`/api/foodHistory/${foodHistoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        dispatch(deleteFoodHistory(foodHistoryId));
      }
    } catch (e) {
      console.log(e);
    }
  };

const initialState: any = { byId: {}, allFoodHistory: [] };

const foodHistoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_FOOD_HISTORY:
      const allFoodHistory = action.payload;
      const byId: Record<number, any> = {};
      for (const foodHistory of allFoodHistory) {
        byId[foodHistory.id] = foodHistory;
      }
      return { ...state, allFoodHistory, byId };
    case CREATE_FOOD_HISTORY:
      return {
        ...state,
        allFoodHistory: [...state.allFoodHistory, action.payload],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_FOOD_HISTORY: {
      const updatedFoodHistory = action.payload;
      const newAllFoodHistory = state.foodHistory?.map(
        (foodHistory: IFoodHistory) =>
          foodHistory.id === updatedFoodHistory.id
            ? updatedFoodHistory
            : foodHistory
      );
      return {
        ...state,
        foodHistory: newAllFoodHistory,
        byId: {
          ...state.byId,
          [updatedFoodHistory.id]: updatedFoodHistory,
        },
      };
    }
    case DELETE_FOOD_HISTORY: {
      const idToDelete = action.payload;
      const newById = { ...state.byId };
      delete newById[idToDelete];
      return {
        ...state,
        allFoodHistory: state.allFoodHistory.filter(
          (foodHistory: IFoodHistory) => foodHistory.id !== idToDelete
        ),
        byId: newById,
      };
    }
    default:
      return state;
  }
};

export default foodHistoryReducer;

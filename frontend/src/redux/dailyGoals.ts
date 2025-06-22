import { IDailyGoal } from "../../types/dailyGoals";
import { csrfFetch } from "./csrf";

const GET_DAILY_GOALS = "dailyGoals/GET_DAILY_GOALS";
const CREATE_DAILY_GOALS = "dailyGoal/CREATE_DAILY_GOALS";
const UPDATE_DAILY_GOALS = "dailyGoal/UPDATE_DAILY_GOALS";
const DELETE_DAILY_GOALS = "dailyGoal/DELETE_DAILY_GOALS";

const getDailyGoals = (dailyGoals: IDailyGoal[]) => ({
  type: GET_DAILY_GOALS,
  payload: dailyGoals,
});

const createDailyGoal = (dailyGoal: IDailyGoal) => ({
  type: CREATE_DAILY_GOALS,
  payload: dailyGoal,
});

const updateDailyGoal = (dailyGoal: IDailyGoal) => ({
  type: UPDATE_DAILY_GOALS,
  payload: dailyGoal,
});

const deleteDailyGoal = (dailyGoalId: number) => ({
  type: DELETE_DAILY_GOALS,
  payload: dailyGoalId,
});

export const getDailyGoalsThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/dailyGoals");
    if (res.ok) {
      const data = await res.json();
      dispatch(getDailyGoals(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getDailyGoalsTodayThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/dailyGoals/today");
    if (res.ok) {
      const data = await res.json();
      dispatch(getDailyGoals(data));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const createDailyGoalThunk =
  (dailyGoal: IDailyGoal): any =>
  async (dispatch: any) => {
    try {
      const {
        caloriesDaily,
        proteinDaily,
        carbsDaily,
        fatDaily,
        caloriesToday,
        proteinToday,
        carbsToday,
        fatToday,
      } = dailyGoal;
      const res = await csrfFetch(`/api/dailyGoals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caloriesDaily,
          proteinDaily,
          carbsDaily,
          fatDaily,
          caloriesToday,
          proteinToday,
          carbsToday,
          fatToday,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(createDailyGoal(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const updateDailyGoalThunk =
  (dailyGoal: IDailyGoal): any =>
  async (dispatch: any) => {
    try {
      const { id, caloriesDaily, proteinDaily, carbsDaily, fatDaily } =
        dailyGoal;
      const res = await csrfFetch(`/api/dailyGoals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caloriesDaily,
          proteinDaily,
          carbsDaily,
          fatDaily,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateDailyGoal(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const updateTodaysProgressThunk =
  (dailyGoal: IDailyGoal): any =>
  async (dispatch: any) => {
    try {
      const { id, caloriesToday, proteinToday, carbsToday, fatToday } =
        dailyGoal;
      console.log(dailyGoal);
      const res = await csrfFetch(`/api/dailyGoals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caloriesToday,
          proteinToday,
          carbsToday,
          fatToday,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateDailyGoal(data));
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const deleteDailyGoalThunk =
  (dailyGoalId: number): any =>
  async (dispatch: any) => {
    try {
      const res = await csrfFetch(`/api/dailyGoals/${dailyGoalId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        dispatch(deleteDailyGoal(dailyGoalId));
      }
    } catch (e) {
      console.log(e);
    }
  };

const initialState: any = { byId: {}, allDailyGoals: [] };

const dailyGoalsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DAILY_GOALS:
      const allDailyGoals = action.payload;
      const byId: Record<number, any> = {};
      for (const dailyGoal of allDailyGoals) {
        byId[dailyGoal.id] = dailyGoal;
      }
      return { ...state, allDailyGoals, byId };
    case CREATE_DAILY_GOALS:
      return {
        ...state,
        allDailyGoals: [...state.allDailyGoals, action.payload],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_DAILY_GOALS: {
      const updatedDailyGoal = action.payload;
      const newAllDailyGoals = state.dailyGoals?.map((dailyGoal: IDailyGoal) =>
        dailyGoal.id === updatedDailyGoal.id ? updatedDailyGoal : dailyGoal
      );
      return {
        ...state,
        dailyGoals: newAllDailyGoals,
        byId: {
          ...state.byId,
          [updatedDailyGoal.id]: updatedDailyGoal,
        },
      };
    }
    case DELETE_DAILY_GOALS: {
      const idToDelete = action.payload;
      const newById = { ...state.byId };
      delete newById[idToDelete];
      return {
        ...state,
        allDailyGoals: state.allDailyGoals.filter(
          (dailyGoal: IDailyGoal) => dailyGoal.id !== idToDelete
        ),
        byId: newById,
      };
    }
    default:
      return state;
  }
};

export default dailyGoalsReducer;
